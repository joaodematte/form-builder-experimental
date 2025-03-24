import { Layout, LayoutItem } from '@/atoms/layout';

interface DroppableItem {
  id: string;
  x: number;
  y: number;
}

const GRID_COLUMNS = 4;

export type Search = 'asc' | 'desc';
export type Direction = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

const batchedUpdates: Map<string, Partial<Pick<LayoutItem, 'x' | 'y'>>> = new Map();

export function getRows(layout: Layout) {
  if (!layout || layout.length === 0) return 0;

  const maxRow = Math.max(...layout.map((item) => item.y + item.h - 1));

  return maxRow + 1;
}

export function getDroppableItems(cols: number, rows: number, gridId: string): DroppableItem[] {
  const items: DroppableItem[] = new Array(cols * rows);

  for (let id = 0; id < cols * rows; id++) {
    items[id] = {
      id: `droppable-item-${gridId}-${id}`,
      x: id % cols,
      y: Math.floor(id / cols)
    };
  }

  return items;
}

export function findItemById(layout: Layout, id: string): LayoutItem | undefined {
  for (let i = 0; i < layout.length; i++) {
    if (layout[i].id === id) return layout[i];
  }

  return undefined;
}

export function findItemIndexById(layout: Layout, id: string): number {
  for (let i = 0; i < layout.length; i++) {
    if (layout[i].id === id) return i;
  }
  return -1;
}

export function findDifferentLayoutItem(previousLayout: Layout, newLayout: Layout): LayoutItem | null {
  if (previousLayout.length !== newLayout.length) {
    if (previousLayout.length < newLayout.length) {
      const previousIds = new Set(previousLayout.map((item) => item.id));

      for (const item of newLayout) {
        if (!previousIds.has(item.id)) {
          const previousItem = findItemById(previousLayout, item.id);
          if (!previousItem) return null;
          return item;
        }
      }
    }
    return null;
  }

  for (let i = 0; i < newLayout.length; i++) {
    const newItem = newLayout[i];
    const previousItem = findItemById(previousLayout, newItem.id);

    if (!previousItem) continue;

    if (
      (previousItem.x ^ newItem.x) !== 0 ||
      (previousItem.y ^ newItem.y) !== 0 ||
      (previousItem.w ^ newItem.w) !== 0 ||
      (previousItem.h ^ newItem.h) !== 0
    ) {
      return newItem;
    }
  }

  return null;
}

export function findOverlappingItems(layout: Layout): LayoutItem[] {
  const overlappingItems = new Set<LayoutItem>();
  const itemsCount = layout.length;

  for (let i = 0; i < itemsCount; i++) {
    const item1 = layout[i];

    for (let j = i + 1; j < itemsCount; j++) {
      const item2 = layout[j];

      if (isOverlapping(item1, item2)) {
        overlappingItems.add(item1);
        overlappingItems.add(item2);
      }
    }
  }

  return Array.from(overlappingItems);
}

export function findOverlappingItemsInRow(layout: Layout, y: number): LayoutItem[] {
  const itemsInRow: LayoutItem[] = [];

  for (let i = 0; i < layout.length; i++) {
    const item = layout[i];
    if (y >= item.y && y < item.y + item.h) {
      itemsInRow.push(item);
    }
  }

  const overlappingItems = new Set<LayoutItem>();
  const rowItemCount = itemsInRow.length;

  for (let i = 0; i < rowItemCount; i++) {
    const item1 = itemsInRow[i];
    const item1Right = item1.x + item1.w;

    for (let j = i + 1; j < rowItemCount; j++) {
      const item2 = itemsInRow[j];
      const item2Right = item2.x + item2.w;

      if (!(item1Right <= item2.x || item1.x >= item2Right)) {
        overlappingItems.add(item1);
        overlappingItems.add(item2);
      }
    }
  }

  return Array.from(overlappingItems);
}

export function getAvailablePositionOnRow(
  item: LayoutItem,
  layout: Layout,
  row: number,
  search: Search
): { x: number; y: number } | null {
  if (item.w > GRID_COLUMNS) {
    return null;
  }

  const itemsInRow: LayoutItem[] = [];

  for (let i = 0; i < layout.length; i++) {
    const existingItem = layout[i];

    if (existingItem.id !== item.id && row >= existingItem.y && row < existingItem.y + existingItem.h) {
      itemsInRow.push(existingItem);
    }
  }

  const occupiedSpaces = new Array(GRID_COLUMNS).fill(false);

  for (let i = 0; i < itemsInRow.length; i++) {
    const existingItem = itemsInRow[i];

    for (let x = existingItem.x; x < Math.min(GRID_COLUMNS, existingItem.x + existingItem.w); x++) {
      occupiedSpaces[x] = true;
    }
  }

  if (search === 'asc') {
    for (let x = 0; x <= GRID_COLUMNS - item.w; x++) {
      let canFit = true;

      for (let w = 0; w < item.w; w++) {
        if (occupiedSpaces[x + w]) {
          canFit = false;
          break;
        }
      }

      if (canFit) {
        return { x, y: row };
      }
    }
  } else {
    for (let x = GRID_COLUMNS - item.w; x >= 0; x--) {
      let canFit = true;

      for (let w = 0; w < item.w; w++) {
        if (occupiedSpaces[x + w]) {
          canFit = false;
          break;
        }
      }

      if (canFit) {
        return { x, y: row };
      }
    }
  }

  return null;
}

export function isOverlapping(item1: LayoutItem, item2: LayoutItem): boolean {
  const item1Right = item1.x + item1.w;
  const item1Bottom = item1.y + item1.h;
  const item2Right = item2.x + item2.w;
  const item2Bottom = item2.y + item2.h;

  return !(item1Right <= item2.x || item1.x >= item2Right || item1Bottom <= item2.y || item1.y >= item2Bottom);
}

export function hasOverlap(item: LayoutItem, items: LayoutItem[]): boolean {
  for (let i = 0; i < items.length; i++) {
    if (isOverlapping(item, items[i])) {
      return true;
    }
  }
  return false;
}

export function getMovementDirection(item: LayoutItem, previousLayout: Layout): Direction {
  const previousItem = findItemById(previousLayout, item.id);

  if (!previousItem) return 'NORTH';

  if (item.x > previousItem.x) return 'EAST';
  if (item.x < previousItem.x) return 'WEST';
  if (item.y > previousItem.y) return 'SOUTH';

  return 'NORTH';
}

export function resolveSouthCollision(overlappingItems: LayoutItem[], layout: Layout) {
  for (const overlappingItem of overlappingItems) {
    let hasSpaceAbove = false;

    const itemIndex = findItemIndexById(layout, overlappingItem.id);

    if (itemIndex !== -1) {
      let testY = overlappingItem.y - 1;

      const testItem = {
        ...overlappingItem,
        y: testY
      };

      let testLayout = layout.map((item) => (item.id === overlappingItem.id ? testItem : item));

      hasSpaceAbove = findOverlappingItemsInRow(testLayout, testY).length === 0;

      if (hasSpaceAbove) {
        batchedUpdates.set(overlappingItem.id, { y: testY });

        continue;
      }

      testY = overlappingItem.y + 1;
      testItem.y = testY;
      testLayout = layout.map((item) => (item.id === overlappingItem.id ? testItem : item));

      const overlappingItemsOnRowBelow = findOverlappingItemsInRow(testLayout, testY).filter(
        (item) => item.id !== overlappingItem.id
      );

      batchedUpdates.set(overlappingItem.id, { y: overlappingItem.y + 1 });

      if (overlappingItemsOnRowBelow.length > 0) {
        resolveSouthCollision(overlappingItemsOnRowBelow, layout);
      }
    }
  }
}

export function resolveNorthCollision(overlappingItems: LayoutItem[], layout: Layout) {
  for (const overlappingItem of overlappingItems) {
    const itemIndex = findItemIndexById(layout, overlappingItem.id);

    if (itemIndex !== -1) {
      const testY = overlappingItem.y + 1;
      const testItem = { ...overlappingItem, y: testY };

      const testLayout = layout.map((item) => (item.id === overlappingItem.id ? testItem : item));

      const overlappingItemsOnRowBelow = findOverlappingItemsInRow(testLayout, testY).filter(
        (item) => item.id !== overlappingItem.id
      );

      batchedUpdates.set(overlappingItem.id, { y: overlappingItem.y + 1 });

      if (overlappingItemsOnRowBelow.length > 0) {
        resolveNorthCollision(overlappingItemsOnRowBelow, layout);
      }
    }
  }
}

export function resolveHorizontalCollision(overlappingItems: LayoutItem[], layout: Layout, search: Search) {
  for (const overlappingItem of overlappingItems) {
    const availablePositionOnRow = getAvailablePositionOnRow(overlappingItem, layout, overlappingItem.y, search);

    if (availablePositionOnRow) {
      batchedUpdates.set(overlappingItem.id, { x: availablePositionOnRow.x });

      continue;
    }

    const testY = overlappingItem.y + 1;
    const testItem = { ...overlappingItem, y: testY };

    const testLayout = layout.map((item) => (item.id === overlappingItem.id ? testItem : item));

    const overlappingItemsOnRowBelow = findOverlappingItemsInRow(testLayout, testY).filter(
      (item) => item.id !== overlappingItem.id
    );

    batchedUpdates.set(overlappingItem.id, { y: overlappingItem.y + 1 });

    if (overlappingItemsOnRowBelow.length > 0) {
      resolveNorthCollision(overlappingItemsOnRowBelow, layout);
    }
  }
}

export function calculateNewOverlappingItemsPosition(
  overlappingItems: LayoutItem[],
  layout: Layout,
  direction: Direction
) {
  if (direction === 'SOUTH') resolveSouthCollision(overlappingItems, layout);
  if (direction === 'NORTH') resolveNorthCollision(overlappingItems, layout);
  if (direction === 'WEST') resolveHorizontalCollision(overlappingItems, layout, 'asc');
  if (direction === 'EAST') resolveHorizontalCollision(overlappingItems, layout, 'desc');
}

export function resolveLayout(previousLayout: Layout, newLayout: Layout): Layout {
  const differentItem = findDifferentLayoutItem(previousLayout, newLayout);

  if (!differentItem) return newLayout;

  const clonedNewLayout = [...newLayout];

  const overlappingItems = findOverlappingItems(clonedNewLayout).filter((item) => item.id !== differentItem.id);

  const direction = getMovementDirection(differentItem, previousLayout);

  calculateNewOverlappingItemsPosition(overlappingItems, clonedNewLayout, direction);

  for (const [key, value] of batchedUpdates) {
    const itemIndex = findItemIndexById(clonedNewLayout, key);

    if (itemIndex !== -1) {
      const item = clonedNewLayout[itemIndex];

      clonedNewLayout[itemIndex] = { ...item, ...value };
    }
  }

  batchedUpdates.clear();

  return clonedNewLayout;
}

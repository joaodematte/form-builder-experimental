import { cn } from '../lib/cn';

export type ButtonGroupProps = React.ComponentProps<'div'>;

export function ButtonGroup({ className, ...props }: ButtonGroupProps) {
  return <div className={cn('*:rounded-none *:first:rounded-l-md *:last:rounded-r-md', className)} {...props} />;
}

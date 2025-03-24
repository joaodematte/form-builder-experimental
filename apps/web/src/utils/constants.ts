export const MIN_WIDTH: Record<string, number> = {
  'lsss': 2,
  'lssn': 2,
  'lnsn': 2,
  'lnss': 1,
  'rich-text-editor': 2,
  'autocomplete': 1,
  'boolean': 1,
  'date': 1,
  'decimal': 1,
  'file': 1,
  'integer': 1,
  'select': 1,
  'text': 1,
  'textarea': 1,
  'time': 1
};

export const SIDEBAR_DATA = [
  {
    id: 'eform_lsss',
    w: 4,
    h: 1,
    config: {
      label: 'Campo LSSS',
      kind: 'lsss',
      editable: false,
      required: false,
      added: false
    }
  },
  {
    id: 'campo_inteiro',
    w: 4,
    h: 1,
    config: {
      label: 'Campo Inteiro',
      kind: 'integer',
      editable: false,
      required: false,
      added: false
    }
  },
  {
    id: 'campo_decimal',
    w: 4,
    h: 1,
    config: {
      label: 'Campo Decimal',
      kind: 'decimal',
      editable: false,
      required: false,
      added: false
    }
  },
  {
    id: 'campo_texto',
    w: 4,
    h: 1,
    config: {
      label: 'Campo Texto',
      kind: 'text',
      editable: false,
      required: false,
      added: false
    }
  },
  {
    id: 'campo_data',
    w: 4,
    h: 1,
    config: {
      label: 'Campo Data',
      kind: 'date',
      editable: false,
      required: false,
      added: false
    }
  },
  {
    id: 'campo_hora',
    w: 4,
    h: 1,
    config: {
      label: 'Campo Hora',
      kind: 'time',
      editable: false,
      required: false,
      added: false
    }
  },
  {
    id: 'campo_booleano',
    w: 4,
    h: 1,
    config: {
      label: 'Campo Booleano',
      kind: 'boolean',
      editable: false,
      required: false,
      added: false
    }
  },
  {
    id: 'campo_list_de_opcoes',
    w: 4,
    h: 1,
    config: {
      label: 'Campo Lista de Opções',
      kind: 'select',
      editable: false,
      required: false,
      added: false
    }
  },
  {
    id: 'campo_usuario',
    w: 4,
    h: 1,
    config: {
      label: 'Campo Usuário',
      kind: 'autocomplete',
      editable: false,
      required: false,
      added: false
    }
  },
  {
    id: 'eform_lnss',
    w: 4,
    h: 1,
    config: {
      label: 'E-Form LNSS',
      kind: 'lnss',
      editable: false,
      required: false,
      added: false
    }
  },
  {
    id: 'eform_lssn',
    w: 4,
    h: 1,
    config: {
      label: 'Campo LSSN',
      kind: 'lssn',
      editable: false,
      required: false,
      added: false
    }
  }
];

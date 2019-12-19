export const isEmail = (value: string) =>
  !value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Esse campo deve ser do tipo e-mail' : undefined;

export const isNumber = (value: any) => (
  !value || !isNaN(+value)
    ? undefined
    : 'Esse campo deve ser do tipo número'
);

export const isRequired = (value?: any) => (
  value || typeof value === 'number'
    ? undefined
    : 'Esse campo é obrigatorio'
);

export const isEmail = (value: string) => (
  !value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'This field must be of type email'
    : undefined
)

export const isNumber = (value: any) => (
  !value || !isNaN(+value)
    ? undefined
    : 'This field must be of type number'
);

export const isRequired = (value?: any) => (
  value || typeof value === 'number'
    ? undefined
    : 'This field is mandatory'
);

export const isEmail = value =>
    !value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Esse campo deve ser do tipo e-mail' : undefined;

export const isNumber = value => (
    !value || !isNaN(+value)
        ? undefined
        : 'Esse campo deve ser do tipo número'
);

export const required = value => (
    value || typeof value === 'number'
        ? undefined
        : 'Esse campo é obrigatorio'
);

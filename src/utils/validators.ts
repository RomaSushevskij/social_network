export const requiredField = (value: string): string | null => {
    return !value.length ? 'This field is required' : null
}
export const maxLength = (maxLength: number) => (value: string) => {
    return value.length > maxLength ? `Max length is ${maxLength} characters!` : null
}
export const composeValidators = (...validators: Function[]) => (value: string) =>
    validators.reduce((error, validator) => error || validator(value), undefined);

export const validateURL = (values: any, errors: any, prop: string) => {
    if (values[prop]) {
        if (!/[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi.test(values[prop])) {
            errors[prop] = 'Invalid URL address';
        }
    }
}
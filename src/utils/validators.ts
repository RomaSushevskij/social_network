export const requiredField = (value:string):string | null => {
    return !value.length ? 'This field is required' : null
}
export const maxLength = (maxLength:number) => (value:string) => {
    return value.length > maxLength ? `Max length is ${maxLength} characters!` : null
}
export const composeValidators = (...validators:Function[]) => (value:string) =>
    validators.reduce((error, validator) => error || validator(value), undefined);
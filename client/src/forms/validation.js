const required = (value) => value ? undefined : "Required"

const maxLength = max => value => value && value.length > max ? `Maximum ${max} characters` : undefined;

const maxValue = (maxValue) => (value) => value && value > maxValue ? `Maximum ${maxValue}` : undefined

const minValue = (minValue) => (value) => value && value < minValue ? `Minimum ${minValue}` : undefined

const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

const string = value => value && !/[a-zA-Z]/.test(value) ? 'Must be a string with latin characters' : undefined


export { required, maxLength, maxValue, minValue, number, string }
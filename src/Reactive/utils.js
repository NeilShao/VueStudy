export function def(data, key, value, enumerable) {
    Object.defineProperty(data, key, {
        value: value,
        enumerable: enumerable
    })
}
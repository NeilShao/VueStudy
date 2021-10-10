import { def } from "./utils";

const arrayPrototype = Array.prototype;
const methodsNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];

export const arrayMethods = Object.create(arrayPrototype)

methodsNeedChange.forEach(methodName => {
    const original = arrayPrototype[methodName]

    def(arrayMethods, methodName, function () {
        console.log(methodName)
        const result = original.apply(this, arguments)
        const args = [...arguments]

        let inserted = null
        switch (methodName) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2);
                break;
        }

        if (inserted) {
            this.__ob__.observeArray(inserted);
        }

        this.__ob__.dep.notify()

        return result
    }, false)
})

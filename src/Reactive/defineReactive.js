import Dep from "./Dep"
import observe from "./observe"

export default function defineReactive(obj, key, value) {
    const dep = new Dep()
    if (arguments.length == 2) {
        value = obj[key]
    }

    let childOb = observe(value)
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,

        get() {
            console.log("访问属性: ", key)

            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                }
            }
            return value
        },

        set(newValue) {
            console.log("设置属性: ", key)
            if (value == newValue) {
                return
            }

            value = newValue
            observe(value)

            dep.notify()
        }
    })
}
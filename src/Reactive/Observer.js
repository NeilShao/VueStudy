import defineReactive from "./defineReactive"
import observe from "./observe"
import { def } from "./utils"
import { arrayMethods } from "./array"
import Dep from "./Dep"

export default class Observer {
    constructor(value) {
        this.dep = new Dep()
        def(value, "__ob__", this, false)

        if (Array.isArray(value)) {
            Object.setPrototypeOf(value, arrayMethods)
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    walk(value) {
        for (let k in value) {
            defineReactive(value, k)
        }
    }

    observeArray(arrayValue) {
        arrayValue.forEach(value => {
            observe(value)
        });
    }
}
import Observer from "./Observer";

export default function observe(obj) {
    if (typeof obj !== 'object') return

    let ob = null
    if (typeof obj.__ob__ !== 'undefined') {
        return obj.__ob__
    } else {
        ob = new Observer(obj)
    }

    return ob
}
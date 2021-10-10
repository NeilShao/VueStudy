var uid = 0
export default class Dep {
    constructor() {
        this.id = uid++

        console.log("DEP", this.id)

        // Wather instance
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    depend() {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }

    notify() {
        console.log("执行了Notify")
        this.subs.forEach(sub => {
            sub.update();
        })
    }
}
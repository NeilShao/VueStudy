import observe from "./observe";
import Watcher from "./Watcher";

let a = {
    b: 5,
    c: {
        d: {
            e: 7
        }
    },
    e: [1, 2, 3]
}

observe(a)
new Watcher(a, 'c.d.e', (newValue, oldValue)=> {
    console.log("wachter hit: ", newValue, oldValue)
})

a.c.d.e = 8

console.log(a)
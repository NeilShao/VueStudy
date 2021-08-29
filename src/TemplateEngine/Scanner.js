/*
 Scanner Class
*/
export default class Scanner {
    constructor(templateStr) {
        this.pos = 0
        this.tail = templateStr
        this.templateStr = templateStr
    }

    scan(tag) {
        while(!this.eos() && this.tail.indexOf(tag) == 0) {
            this.pos += tag.length
            this.tail = this.templateStr.substring(this.pos)
        }
    }

    // scan string, util stop Tag, return scanned string
    scanUtil(stopTag) {
        const pos_start = this.pos
        while(!this.eos() && this.tail.indexOf(stopTag) !== 0) {
            this.pos++
            this.tail = this.templateStr.substring(this.pos)
        }

        return this.templateStr.substring(pos_start, this.pos)
    }

    eos() {
        return this.pos >= this.templateStr.length
    }
}
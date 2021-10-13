import parseAttr from "./parseAttr"

export default function(templteStr) {
    const stack = [{ children: []}]
    let index = 0
    let restStr

    const tagStartReg = /^<(\w+[1-6]?)([^>]+)?>/
    const tagEndReg = /^<\/(\w+[1-6]?)>/
    const contentReg = /^([^<]+)</
    const emptyReg = /^(\s+)</

    while (index < templteStr.length) {
        restStr = templteStr.substring(index)
        
        if (emptyReg.test(restStr)) {
            const empty = restStr.match(emptyReg)[1]
            index += empty.length
        } else if (tagStartReg.test(restStr)) {
            const tag = restStr.match(tagStartReg)[1]
            const attrStr = restStr.match(tagStartReg)[2]
            console.log(`开始: ${tag}, Attr: ${attrStr}`)

            const attrLength = attrStr == undefined ? 0:attrStr.length
            index += tag.length + 2 + attrLength

            stack.push({tag: tag, children: [], attr: parseAttr(attrStr)})
        } else if (tagEndReg.test(restStr)) {
            const tag = restStr.match(tagEndReg)[1]
            console.log(`结束: ${tag}`)
            index += tag.length + 3

            const lastNode = stack.pop()
            if (lastNode.tag != tag) {
                throw("Error Input")
            }
            stack[stack.length - 1].children.push(lastNode)
        } else if (contentReg.test(restStr)) {
            const word = restStr.match(contentReg)[1]
            console.log(`内容: ${word}`)
            index += word.length
            stack[stack.length - 1].children.push({'text': word.trim(), 'type': 3 })
        } else {
            console.log("========")
            index++
        }
    }

    return stack[0].children[0]
}
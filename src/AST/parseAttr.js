export default function(attrString) {
    if (attrString == undefined) return {}

    let inYinhao = false
    let index = 0
    let lastSpe = 0

    const results = []

    while (index < attrString.length) {
        if (attrString[index] == '"') {
            inYinhao = !inYinhao
        } else if (attrString[index] == ' ' && !inYinhao && lastSpe !== index) {
            results.push(attrString.substring(lastSpe, index).trim())
            lastSpe = index
        }
        index++   
    }

    if (lastSpe !== index - 1) {
        results.push(attrString.substring(lastSpe, index).trim())
    }

    return results.map(result => {
        const items = result.match(/^(.+)="(.+)"$/)
        return {
            name: items[1],
            value: items[2],
        }
    })
}
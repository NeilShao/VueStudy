import Scanner from './Scanner'
import nestTokens from './nestTokens'

function removeSpace(word) {
    let _word = ""
    let isInTag = false
    Array.from(word).forEach(char => {
        if (char == "<") {
            isInTag = true
        } else if (char == ">") {
            isInTag = false
        }

        if (!(/\s/.test(char)) || (char === " " && isInTag)) {
            _word += char
        }
    });

    return _word
}

export default function parseTemplateToToken(templateStr) {
    const scanner = new Scanner(templateStr)
    const tokens = []
    let res
    while (!scanner.eos()) {
        res = scanner.scanUtil("{{")
        scanner.scan("{{")
        tokens.push(["text", removeSpace(res)])
        
        res = scanner.scanUtil("}}")
        scanner.scan("}}")

        if (res) {
            if (res[0] == "#") {
                tokens.push(["#", res.substring(1)])
            } else if (res[0] == "/") {
                tokens.push(["/", res.substring(1)])
            } else {
                tokens.push(["name", res])
            }
        }
    }

    return nestTokens(tokens)
}
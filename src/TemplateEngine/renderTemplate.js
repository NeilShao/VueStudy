
function lookUp(dataObj, keys) {
    if (keys == '.') {
        return dataObj[keys]
    }

    const keyItems = keys.split(".")
    keyItems.unshift(dataObj)
    return keyItems.reduce((pv, cv) => {
        return pv[cv]
    })
}

export default function renderTemplate(tokens, data) {
    let renderStr = ""
    tokens.forEach(token => {
        if (token[0] === "text") { 
            renderStr += token[1]
        } else if (token[0] === "name") {
            renderStr += lookUp(data, token[1])
        } else {
            // Array
            if (typeof data[token[1]] === "object") {
                data[token[1]].forEach(element => {
                    renderStr += renderTemplate(token[2], {
                        ...element,
                        '.': element
                    })
                })
            }
        }
    });

    return renderStr
}
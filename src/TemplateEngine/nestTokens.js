export default function nestTokens(tokens) {
    const nestedTokens = []
    const sessions = []
    let collector = nestedTokens

    tokens.forEach(token => {
        switch (token[0]) {
            case '#': {
                collector.push(token)
                sessions.push(token)
                collector = token[2] = []
                break
            }
            case '/': {
                sessions.pop()
                collector = sessions.length > 0 ? sessions[sessions.length - 1][2] : nestedTokens
                break
            }
            default:
                collector.push(token)
        }
    });

    return nestedTokens
}

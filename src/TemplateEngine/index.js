import parseTemplateToTokens from './parseTemplateToTokens'
import renderTemplate from './renderTemplate'

window.Template = {
    render: (templateStr, data) => {
        console.log(templateStr)

        const tokens = parseTemplateToTokens(templateStr)
        console.log(tokens)


        const renderStr = renderTemplate(tokens, data)
        console.log(renderStr)

        return renderStr
    }
}
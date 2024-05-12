const { Marked } = require('marked')
const govukMarkdown = require('../index')

const markedWithXlHeadings = new Marked(govukMarkdown({
  headingsStartWith: 'xl'
}))

markedWithXlHeadings.h = 'xl'

const markedWithLHeadings = new Marked(govukMarkdown({
  headingsStartWith: 'l'
}))

markedWithLHeadings.h = 'l'

module.exports = {
  markdownRenderer: function(markdown, metadata) {
    const renderer = metadata.attributes.headingsStartWith === 'xl' ? markedWithXlHeadings : markedWithLHeadings
    return renderer.parse(markdown)
  }
}

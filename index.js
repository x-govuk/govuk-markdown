const highlightJs = require('highlight.js')

/**
 * Add GOV.UK typography classes to blockquotes, headings, paragraphs, links,
 * lists, section breaks and tables.
 * @param {object} [options] Options for the extension
 * @returns {object} A MarkedExtension to be passed to `marked.use()`
 */
module.exports = function (options = {}) {
  return {
    renderer: {
      // Block quotes
      blockquote({ tokens }) {
        const body = this.parser.parse(tokens)

        return `<blockquote class="govuk-inset-text govuk-!-margin-left-0">${body}</blockquote>\n`
      },

      // Headings
      heading({ tokens, depth, raw }) {
        const text = this.parser.parseInline(tokens)
        const id = raw
          .toLowerCase()
          .replace(/[^\w\s]+/g, '') // Replace all but words and spaces
          .trim()
          .replace(/\s/g, '-') // Replace spaces with hyphens

        // Make modifiers relative to the starting heading depth
        const modifiers = ['xl', 'l', 'm', 's']
        const headingsStartWith = modifiers.includes(options.headingsStartWith)
          ? options.headingsStartWith
          : 'l'
        const modifierStartIndex = modifiers.indexOf(headingsStartWith)

        const modifier = modifiers[modifierStartIndex + depth - 1] || 's'

        return `<h${depth} class="govuk-heading-${modifier}" id="${id}">${text}</h${depth}>`
      },

      // Paragraphs
      paragraph({ tokens }) {
        const text = this.parser.parseInline(tokens)

        // Don’t place figure (or figure within an anchor) within paragraph
        const FIGURE_RE = /(<a([^>]+)>)?<figure/
        if (FIGURE_RE.test(text)) {
          return text
        } else {
          return `<p class="govuk-body">${text}</p>\n`
        }
      },

      // Links
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens)

        if (title) {
          return `<a class="govuk-link" href="${href}" title="${title}">${text}</a>`
        } else {
          return `<a class="govuk-link" href="${href}">${text}</a>`
        }
      },

      // Lists
      list({ ordered, start, items }) {
        let body = ''
        for (const item in items) {
          body += this.listitem(items[item])
        }

        const element = ordered ? 'ol' : 'ul'
        const modifier = ordered ? 'number' : 'bullet'
        const startAttr = ordered && start !== 1 ? ` start="${start}"` : ''

        return `<${element}${startAttr} class="govuk-list govuk-list--${modifier}">${body}</${element}>\n`
      },

      // Checkbox
      checkbox({ checked }) {
        return `<span class="x-govuk-checkbox"><input class="x-govuk-checkbox__input" type="checkbox"${
          checked ? ' checked' : ''
        } disabled><span class="x-govuk-checkbox__pseudo"></span></span>`
      },

      // Section break
      hr() {
        return '<hr class="govuk-section-break govuk-section-break--xl govuk-section-break--visible">\n'
      },

      // Tables
      table({ header, rows }) {
        // Table head
        let head = ''
        let text = ''
        for (const cell in header) {
          text += this.tablecell(header[cell])
        }
        head += this.tablerow({ text })

        // Table body
        let body = ''
        for (let row in rows) {
          row = rows[row]
          text = ''
          for (const cell in row) {
            text += this.tablecell(row[cell])
          }
          body += this.tablerow({ text })
        }

        if (body) {
          body = `<tbody class="govuk-table__body">${body}</tbody>\n`
        }

        return `<table class="govuk-table">\n<thead class="govuk-table__head">\n${head}</thead>\n${body}</table>\n`
      },

      tablerow({ text }) {
        return `<tr class="govuk-table__row">\n${text}</tr>\n`
      },

      tablecell({ tokens, header, align }) {
        const text = this.parser.parseInline(tokens)
        const element = header ? 'th' : 'td'
        const className = header ? 'govuk-table__header' : 'govuk-table__cell'
        const alignClass = align ? ` govuk-!-text-align-${align}` : ''

        return `<${element} class="${className}${alignClass}">${text}</${element}>\n`
      },

      // Block code
      // By not using marked’s `highlight` option, we can add a class to the container
      code({ text, lang: language }) {
        highlightJs.configure({ classPrefix: 'x-govuk-code__' })

        if (language) {
          // Code language has been set, or can be determined
          let code
          if (highlightJs.getLanguage(language)) {
            code = highlightJs.highlight(text, { language }).value
          } else {
            code = highlightJs.highlightAuto(text).value
          }
          return `<pre class="x-govuk-code x-govuk-code--block x-govuk-code__language--${language}" tabindex="0"><code>${code}</code></pre>\n`
        } else {
          // No language found, so render as plain text
          return `<pre class="x-govuk-code x-govuk-code--block" tabindex="0">${text}</pre>\n`
        }
      },

      // Inline code
      codespan({ text }) {
        return `<code class="x-govuk-code x-govuk-code--inline">${text}</code>`
      }
    }
  }
}

import test from 'ava'
import { marked } from 'marked'
import GovukHTMLRenderer from '../index.js'

marked.setOptions({
  renderer: new GovukHTMLRenderer()
})

test('Renders blockquote', t => {
  const result = marked('> Blockquote')
  t.is(result, '<blockquote class="govuk-inset-text govuk-!-margin-left-0"><p class="govuk-body">Blockquote</p></blockquote>')
})

test('Renders heading', t => {
  const result = marked('# Heading')
  t.is(result, '<h1 class="govuk-heading-l" id="heading">Heading</h1>')
})

test('Renders headings using `s` size for lower heading levels', t => {
  const result = marked('# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4')
  t.is(result, '<h1 class="govuk-heading-l" id="heading-1">Heading 1</h1><h2 class="govuk-heading-m" id="heading-2">Heading 2</h2><h3 class="govuk-heading-s" id="heading-3">Heading 3</h3><h4 class="govuk-heading-s" id="heading-4">Heading 4</h4>')
})

test('Renders heading, starting with `xl` size', t => {
  marked.setOptions({
    headingsStartWith: 'xl'
  })
  const result = marked('# Heading')
  t.is(result, '<h1 class="govuk-heading-xl" id="heading">Heading</h1>')
})

test('Renders paragraph', t => {
  const result = marked('Paragraph')
  t.is(result, '<p class="govuk-body">Paragraph</p>')
})

test('Doesn’t render paragraph around `figure` element', t => {
  const figure = marked('<figure>Figure</figure>')
  const linkedFigure = marked('<a href="#"><figure>Figure</figure></a>')
  t.is(figure, '<figure>Figure</figure>')
  t.is(linkedFigure, '<a href="#"><figure>Figure</figure></a>')
})

test('Renders link', t => {
  const result = marked('[Link](#)')
  t.is(result, '<p class="govuk-body"><a class="govuk-link" href="#">Link</a></p>')
})

test('Renders link with title', t => {
  const result = marked('[Link](# "Link title")')
  t.is(result, '<p class="govuk-body"><a class="govuk-link" href="#" title="Link title">Link</a></p>')
})

test('Renders ordered list', t => {
  const result = marked('1. Item A\n2. Item B')
  t.is(result, '<ol class="govuk-list govuk-list--number"><li>Item A</li>\n<li>Item B</li>\n</ol>')
})

test('Renders unordered list', t => {
  const result = marked('* Item\n* Item')
  t.is(result, '<ul class="govuk-list govuk-list--bullet"><li>Item</li>\n<li>Item</li>\n</ul>')
})

test('Renders task list', t => {
  const result = marked('* [ ] Item\n* [x] Item')
  t.is(result, '<ul class="govuk-list govuk-list--bullet"><li><span class="x-govuk-checkbox"><input class="x-govuk-checkbox__input" type="checkbox" disabled><span class="x-govuk-checkbox__pseudo"></span></span>Item</li>\n<li><span class="x-govuk-checkbox"><input class="x-govuk-checkbox__input" type="checkbox" checked disabled><span class="x-govuk-checkbox__pseudo"></span></span>Item</li>\n</ul>')
})

test('Renders section break', t => {
  const result = marked('***')
  t.is(result, '<hr class="govuk-section-break govuk-section-break--xl govuk-section-break--visible">')
})

test('Renders table', t => {
  const result = marked('| Header |\n|-|\n| Cell |`')
  t.regex(result, /<table class="govuk-table">/)
  t.regex(result, /<thead class="govuk-table__head"><tr class="govuk-table__row"><th class="govuk-table__header">Header<\/th><\/tr><\/thead>/)
  t.regex(result, /<tbody class="govuk-table__body"><tr class="govuk-table__row"><td class="govuk-table__cell">Cell<\/td><\/tr><\/tbody>/)
})

test('Renders table cells with left alignment', t => {
  const result = marked('| Header |\n|:-|\n| Cell |`')
  t.regex(result, /<thead class="govuk-table__head"><tr class="govuk-table__row"><th class="govuk-table__header govuk-!-text-align-left">Header<\/th><\/tr><\/thead>/)
  t.regex(result, /<tbody class="govuk-table__body"><tr class="govuk-table__row"><td class="govuk-table__cell govuk-!-text-align-left">Cell<\/td><\/tr><\/tbody>/)
})

test('Renders table cells with right alignment', t => {
  const result = marked('| Header |\n|-:|\n| Cell |`')
  t.regex(result, /<thead class="govuk-table__head"><tr class="govuk-table__row"><th class="govuk-table__header govuk-!-text-align-right">Header<\/th><\/tr><\/thead>/)
  t.regex(result, /<tbody class="govuk-table__body"><tr class="govuk-table__row"><td class="govuk-table__cell govuk-!-text-align-right">Cell<\/td><\/tr><\/tbody>/)
})

test('Renders code block with preformatted text', t => {
  const result = marked('```\nPreformatted text\n```')
  t.is(result, '<pre class="x-govuk-code x-govuk-code--block" tabindex="0">Preformatted text</pre>')
})

test('Renders code block with highlighted syntax', t => {
  const result = marked('```js\nconsole.log(\'Hello, World!\')\n```')
  t.is(result, '<pre class="x-govuk-code x-govuk-code--block" tabindex="0"><code class="x-govuk-code__language--js"><span class="x-govuk-code__variable language_">console</span>.<span class="x-govuk-code__title function_">log</span>(<span class="x-govuk-code__string">&#x27;Hello, World!&#x27;</span>)</code></pre>')
})

test('Renders code block with unknown syntax', t => {
  const result = marked('```foo\n^^^Hello, World^^^\n```')
  t.is(result, '<pre class="x-govuk-code x-govuk-code--block" tabindex="0"><code class="x-govuk-code__language--foo">^^^Hello, World^^^</code></pre>')
})

test('Renders code span', t => {
  const result = marked('`code`')
  t.is(result, '<p class="govuk-body"><code class="x-govuk-code x-govuk-code--inline">code</code></p>')
})

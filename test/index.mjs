import { strict as assert } from 'node:assert'
import test from 'node:test'
import { marked } from 'marked'
import GovukHTMLRenderer from '../index.js'

marked.setOptions({
  renderer: new GovukHTMLRenderer()
})

test('Renders blockquote', () => {
  const result = marked('> Blockquote')

  assert.equal(result, '<blockquote class="govuk-inset-text govuk-!-margin-left-0"><p class="govuk-body">Blockquote</p>\n</blockquote>\n')
})

test('Renders headings', () => {
  const result = marked('# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4')

  assert.equal(result, '<h1 class="govuk-heading-l" id="heading-1">Heading 1</h1><h2 class="govuk-heading-m" id="heading-2">Heading 2</h2><h3 class="govuk-heading-s" id="heading-3">Heading 3</h3><h4 class="govuk-heading-s" id="heading-4">Heading 4</h4>')
})

test('Renders heading with id', () => {
  const result = marked('# Heading with *emphasis*')

  assert.equal(result, '<h1 class="govuk-heading-l" id="heading-with-emphasis">Heading with <em>emphasis</em></h1>')
})

test('Renders headings, using classes relative to given starting level', () => {
  marked.setOptions({ headingsStartWith: 'xl' })

  const result = marked('# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4')

  assert.equal(result, '<h1 class="govuk-heading-xl" id="heading-1">Heading 1</h1><h2 class="govuk-heading-l" id="heading-2">Heading 2</h2><h3 class="govuk-heading-m" id="heading-3">Heading 3</h3><h4 class="govuk-heading-s" id="heading-4">Heading 4</h4>')
})

test('Renders paragraph', () => {
  const result = marked('Paragraph')
  assert.equal(result, '<p class="govuk-body">Paragraph</p>\n')
})

test('Doesn’t render paragraph around `figure` element', () => {
  const figure = marked('<figure>Figure</figure>')
  const linkedFigure = marked('<a href="#"><figure>Figure</figure></a>')

  assert.equal(figure, '<figure>Figure</figure>')
  assert.equal(linkedFigure, '<a href="#"><figure>Figure</figure></a>')
})

test('Renders link', () => {
  const result = marked('[Link](#)')

  assert.equal(result, '<p class="govuk-body"><a class="govuk-link" href="#">Link</a></p>\n')
})

test('Renders link with title', () => {
  const result = marked('[Link](# "Link title")')

  assert.equal(result, '<p class="govuk-body"><a class="govuk-link" href="#" title="Link title">Link</a></p>\n')
})

test('Renders ordered list', () => {
  const result = marked('1. Item A\n2. Item B')

  assert.equal(result, '<ol class="govuk-list govuk-list--number"><li>Item A</li>\n<li>Item B</li>\n</ol>\n')
})

test('Renders unordered list', () => {
  const result = marked('* Item\n* Item')

  assert.equal(result, '<ul class="govuk-list govuk-list--bullet"><li>Item</li>\n<li>Item</li>\n</ul>\n')
})

test('Renders task list', () => {
  const result = marked('* [ ] Item\n* [x] Item')

  assert.equal(result, '<ul class="govuk-list govuk-list--bullet"><li><span class="x-govuk-checkbox"><input class="x-govuk-checkbox__input" type="checkbox" disabled><span class="x-govuk-checkbox__pseudo"></span></span> Item</li>\n<li><span class="x-govuk-checkbox"><input class="x-govuk-checkbox__input" type="checkbox" checked disabled><span class="x-govuk-checkbox__pseudo"></span></span> Item</li>\n</ul>\n')
})

test('Renders section break', () => {
  const result = marked('***')

  assert.equal(result, '<hr class="govuk-section-break govuk-section-break--xl govuk-section-break--visible">\n')
})

test('Renders table', () => {
  const result = marked('| Header |\n|-|\n| Cell |`')

  assert.match(result, /<table class="govuk-table">/)
  assert.match(result, /<thead class="govuk-table__head">/)
  assert.match(result, /<tr class="govuk-table__row">/)
  assert.match(result, /<th class="govuk-table__header">/)
  assert.match(result, /<tbody class="govuk-table__body">/)
  assert.match(result, /<td class="govuk-table__cell">/)
})

test('Renders table cells with left alignment', () => {
  const result = marked('| Header |\n|:-|\n| Cell |`')

  assert.match(result, /<th class="govuk-table__header govuk-!-text-align-left">/)
  assert.match(result, /<td class="govuk-table__cell govuk-!-text-align-left">/)
})

test('Renders table cells with right alignment', () => {
  const result = marked('| Header |\n|-:|\n| Cell |`')

  assert.match(result, /<th class="govuk-table__header govuk-!-text-align-right">/)
  assert.match(result, /<td class="govuk-table__cell govuk-!-text-align-right">/)
})

test('Renders code block with preformatted text', () => {
  const result = marked('```\nPreformatted text\n```')

  assert.equal(result, '<pre class="x-govuk-code x-govuk-code--block" tabindex="0">Preformatted text</pre>\n')
})

test('Renders code block with highlighted syntax', () => {
  const result = marked('```js\nconsole.log(\'Hello, World!\')\n```')

  assert.equal(result, '<pre class="x-govuk-code x-govuk-code--block x-govuk-code__language--js" tabindex="0"><code><span class="x-govuk-code__variable language_">console</span>.<span class="x-govuk-code__title function_">log</span>(<span class="x-govuk-code__string">&#x27;Hello, World!&#x27;</span>)</code></pre>\n')
})

test('Renders code block with unknown syntax', () => {
  const result = marked('```foo\n^^^Hello, World^^^\n```')

  assert.equal(result, '<pre class="x-govuk-code x-govuk-code--block x-govuk-code__language--foo" tabindex="0"><code>^^^Hello, World^^^</code></pre>\n')
})

test('Renders code span', () => {
  const result = marked('`code`')

  assert.equal(result, '<p class="govuk-body"><code class="x-govuk-code x-govuk-code--inline">code</code></p>\n')
})

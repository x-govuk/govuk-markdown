# GOV.UK Markdown · [![test](https://github.com/x-govuk/govuk-markdown/actions/workflows/test.yml/badge.svg)](https://github.com/x-govuk/govuk-markdown/actions/workflows/test.yml)

Convert Markdown into [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend)-compliant HTML. It’s an extension to the [marked](https://marked.js.org) renderer and is inspired by its Ruby equivalent gem [`govuk_markdown`](https://github.com/DFE-Digital/govuk_markdown).

Don’t confuse this package with [govspeak](https://github.com/alphagov/govspeak), which is a Markdown dialect specifically built for the GOV.UK publishing system.

## Requirements

Node.js v18 or later.

## Installation

`npm install govuk-markdown --save`

## Usage

Import `GovukHTMLRenderer` and set it as the `renderer` in marked’s options:

```js
const { marked } = require('marked');
const GovukHTMLRenderer = require('govuk-markdown')

marked.setOptions({
  renderer: new GovukHTMLRenderer()
})
```

If you are using [ES modules](https://nodejs.org/api/esm.html#introduction), import as follows:

```js
import { marked } from 'marked'
import GovukHTMLRenderer from 'govuk-markdown'

marked.setOptions({
  renderer: new GovukHTMLRenderer()
})
```

When you call `marked`, the generated HTML will include the classes from GOV.UK Frontend. For example:

```js
marked('[A link](/foo)')
```

Will output:

```html
<p class="govuk-body">
  <a class="govuk-link" href="/foo">A link</a>
</p>
```

### Code highlighting

Block code is highlighted using [highlight.js](https://highlightjs.org). For example:

```js
marked('```js\nconsole.log(\'Hello, World!\')\n```')
```

Will output:

```html
<pre class="x-govuk-code x-govuk-code--block" tabindex="0">
  <code class="x-govuk-code__language--js">
    <span class="x-govuk-code__variable">console</span>.<span class="x-govuk-code__title">log</span>(<span class="x-govuk-code__string">'Hello, World!'</span>)
  </code>
</pre>
```

### Additional styles

To enable the styling for inline code, block code and checkboxes in task lists, add the following to your Sass file:

```scss
@import "govuk-markdown/x-govuk/all";
```

## Options

In addition to [marked’s options](https://marked.js.org/using_advanced#options), this extension accepts additional values:

| Name | Type | Description |
| - | - | - |
| `headingsStartWith` | `string` | Heading size to use for the top-level heading (`xl` or `l`). Default is `l`. |

For example:

```js
marked.setOptions({
  renderer: new GovukHTMLRenderer(),
  headingsStartWith: 'xl'
})

marked('# Extra large heading')
```

Will output:

```html
<h1 class="govuk-heading-xl" id="extra-large-heading">Extra large heading</h1>
```

## Testing

`npm test`

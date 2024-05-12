---
nunjucksLayout: layouts/main.njk
nunjucksMainBlock: content
useRenderer: "govuk-markdown:govuk-markdown"
processOutputAs: njk
---

# GOV.UK content page

This is a paragraph [with a link](http://example.com).

You can add more paragraphs with **bold**, *italic* etc.

## You can include subheadings

### And deeper subheadings

You can include:

 - bullet points
 - **bold text** inside bullet points
 - *italic text* inside bullet points

You can also include:

1. numbered lists
2. Nunjucks variables like your service name: "{{serviceName}}"


| Sometimes tables |      Are      | Necessary |
|------------------|:-------------:|----------:|
| col 3 is         | right-aligned |     $1600 |
| col 2 is         | centered      |       $12 |
| Col 1 is         | left-aligned  |        $1 |

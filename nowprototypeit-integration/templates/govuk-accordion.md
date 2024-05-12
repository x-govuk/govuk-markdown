---
nunjucksLayout: layouts/main.njk
nunjucksMainBlock: content
useRenderer: "govuk-markdown:govuk-markdown"
processOutputAs: njk
---

# GOV.UK accordion example

This example uses [the accordion component from GOV.UK Frontend](https://design-system.service.gov.uk/components/accordion/).

The example uses a mix of Nunjucks and Markdown in order to use the component (which is in Nunnjucks) and to provide the content for the accordion items (which is in Markdown).

{% set firstItem %}

### This is the first item

You can use any markdown you want in this section like **bold**, *italic*, [links](https://example.com) etc.

{% endset %}

{% set secondItem %}

### This is the second item

Enter your content here.

{% endset %}

{% set thirdItem %}

### This is the third item

Enter your content here.

{% endset %}

{{ govukAccordion({
  id: "accordion-default",
  items: [
    {
      heading: {
        text: "First item"
      },
      content: {
        html: firstItem
      }
    },
    {
      heading: {
        text: "Second item"
      },
      content: {
        html: secondItem
      }
    },
    {
      heading: {
        text: "Third item"
      },
      content: {
        html: thirdItem
      }
    }
  ]
}) }}

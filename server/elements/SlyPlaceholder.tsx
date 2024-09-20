export default function SlyPlaceholder({ isEmptyCondition }: { isEmptyCondition: string }) {
  const attrs = {
    'data-sly-use.template': 'core/wcm/components/commons/v1/templates.html',
    'data-sly-call': `\${template.placeholder @ isEmpty=${isEmptyCondition}}`,
    'data-sly-unwrap': 'true',
  }

  return <div {...attrs}></div>
}
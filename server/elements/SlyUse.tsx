type SlyResourceProps = {
  name: string,
  resource: string
}

export function SlyUse({ name, resource }: SlyResourceProps) {
  const attrs = {
    [`data-sly-use.${name}`]: resource,
  }
  return <div data-sly-unwrap="true" {...attrs} />;
}

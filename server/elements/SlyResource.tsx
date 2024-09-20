type SlyResourceProps = {
  name: string,
  resourceType: string
}

export function SlyResource({ name, resourceType }: SlyResourceProps) {
  const resource = `\$\{'${name}' @ resourceType='${resourceType}\'\}`;
  return (
    <div data-sly-resource={resource} />
  );
}
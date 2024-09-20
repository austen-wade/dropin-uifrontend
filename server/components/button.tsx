import { GlobalHTL, useSlingProperty } from "../utils/useSlingProperty.ts";
import SlyPlaceholder from "../elements/SlyPlaceholder.tsx";

const definition = {
  'jcr:title': 'Button',
  componentGroup: 'My Site - Content',
};

const component = () => {
  const link = useSlingProperty('link', GlobalHTL.properties);
  const label = useSlingProperty('label', GlobalHTL.properties);

  return (
    <>
      <SlyPlaceholder isEmptyCondition="true" />
      <a href={link} className="btn btn-primary">{label}</a>
    </>
  );
}

export default {
  definition,
  dialog: require('./buttonDialog.tsx').default,
  component,
}
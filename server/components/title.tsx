import { SlyElement } from "../elements/SlyElement";
import SlyPlaceholder from "../elements/SlyPlaceholder";
import SlyTest from "../elements/SlyTest";
import { GlobalHTL, useSlingProperty } from "../utils/useSlingProperty";
import dialog, { TitleProps } from "./titleDialog";

const definition = {
  'jcr:title': 'Title',
  componentGroup: 'My Site - Content',
};

const component = () => {
  return (
    <>
      <SlyElement element={`${GlobalHTL.properties}.${TitleProps.heading}`}>{useSlingProperty(TitleProps.text, GlobalHTL.properties)}</SlyElement>
      <SlyElement unwrap={'true'} test={`!${GlobalHTL.properties}.${TitleProps.text}`}>
        <SlyElement element={`${GlobalHTL.properties}.${TitleProps.heading}`}>{useSlingProperty('jcr:title', GlobalHTL.pageProperties)}</SlyElement>
      </SlyElement>
      <SlyPlaceholder isEmptyCondition={`!${GlobalHTL.properties}.${TitleProps.text}`} />
    </>
  );
}

export default {
  dialog,
  definition,
  component,
};
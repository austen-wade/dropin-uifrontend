import { SlyResource } from "../elements/SlyResource";
import { Container, DialogTabs, JcrRoot, PathField, Tab, TextField } from 'aem-dialogs';
import { SlyContainer } from "../elements/SlyContainer";
import { useSlingProperty } from "../utils/useSlingProperty.ts";
import SlyPlaceholder from "../elements/SlyPlaceholder.tsx";
import { SlyUse } from "../elements/SlyUse.tsx";

const definition = {
  'jcr:title': 'Hello World',
  componentGroup: 'My Site - Content',
};

const labelField = new TextField('label', { fieldLabel: 'Button Label' });
const linkField = new PathField('link', {
  fieldLabel: "Button Link",
  nodeTypes: "cq:Page",
  rootPath: '/content/mysite',
});
const PropertiesTab = new Tab('properties').items([
  new Container('column').items([labelField, linkField]),
]);
PropertiesTab.addProp('jcr:title', 'Properties');
const dialog = new JcrRoot().child(new Container('content').items([
  new DialogTabs('tabs').items([PropertiesTab]),
]));

const component = () => {
  const link = useSlingProperty('link', 'model');
  const label = useSlingProperty('label', 'model');

  return (
    <>
      <SlyPlaceholder isEmptyCondition="true" />
      <SlyUse name="model" resource="com.mysite.core.models.HelloWorld" />
      <SlyResource name="helloworld-title" resourceType="mysite/components/title" />
      <SlyContainer name="helloworld-container" />

      <a href={link} className="btn btn-primary">{label}</a>
    </>
  );
}

export default {
  definition,
  dialog,
  component,
}
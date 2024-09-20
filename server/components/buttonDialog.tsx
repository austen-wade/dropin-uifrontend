import { TextField, PathField } from "aem-dialogs";
import { makeTab, makeTabs } from "../utils/dialog";

const labelField = new TextField('label', { fieldLabel: 'Button Label' });
const linkField = new PathField('link', {
  fieldLabel: "Button Link",
  nodeTypes: "cq:Page",
  rootPath: '/content/mysite',
});
const PropertiesTab = makeTab('Properties', [labelField, linkField]);
export default makeTabs([PropertiesTab]);
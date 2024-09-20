import { AemNode, Select, TextField } from "aem-dialogs";
import { makeTab, makeTabs } from "../utils/dialog";

export enum TitleProps {
  text = 'text',
  heading = 'heading',
}

const labelField = new TextField(TitleProps.text, { fieldLabel: 'Text' });
const headingOptions = [
  convertToAemNode('h1', { text: 'H1', value: 'h1' }),
  convertToAemNode('h2', { text: 'H2', value: 'h2' }),
  convertToAemNode('h3', { text: 'H3', value: 'h3' }),
  convertToAemNode('h4', { text: 'H4', value: 'h4' }),
  convertToAemNode('h5', { text: 'H5', value: 'h5' }),
  convertToAemNode('h6', { text: 'H6', value: 'h6' }),
];
const headingField = new Select(TitleProps.heading).items(headingOptions);

const PropertiesTab = makeTab('Properties', [labelField, headingField]);
export default makeTabs([PropertiesTab]);

function convertToAemNode(name: string, { text, value }: { text: string, value: string }) {
  const node = new AemNode(name);
  node.addProp('text', text);
  node.addProp('value', value);
  return node;
}
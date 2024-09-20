import { JcrRoot, Container, DialogTabs, AemNode, Tab } from "aem-dialogs";

export function makeTabs(tabs: AemNode[]) {
  return new JcrRoot().child(new Container('content').items([
    new DialogTabs('tabs').items([...tabs]),
  ]));
}

export function makeTab(name: string, fields: AemNode[]) {
  const tab = new Tab(name).items([
    new Container('column').items(fields),
  ]);
  tab.addProp('jcr:title', name);
  return tab;
}
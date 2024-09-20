type SlyElementProps = {
    attributes?: Record<string, string>;
    call?: string;
    children?: React.ReactNode;
    element?: string;
    include?: string;
    list?: string[];
    name?: string;
    repeat?: string;
    resource?: string;
    resourceType?: string;
    set?: string;
    template?: string;
    test?: string;
    text?: string;
    unwrap?: string;
    use?: string;
}

export function SlyElement(props: SlyElementProps) {
    const attrs: Record<string, string> = {};
    if (props.attributes) {
        Object.assign(attrs, props.attributes);
    }
    if (props.call) {
        attrs[`data-sly-call`] = props.call;
    }
    if (props.element) {
        attrs[`data-sly-element`] = props.element;
    }
    if (props.include) {
        attrs[`data-sly-include`] = props.include;
    }
    if (props.list) {
        attrs[`data-sly-list`] = props.list.join(',');
    }
    if (props.name) {
        attrs[`data-sly-name`] = props.name;
    }
    if (props.repeat) {
        attrs[`data-sly-repeat`] = props.repeat;
    }
    if (props.resource) {
        attrs[`data-sly-resource`] = props.resource;
    }
    if (props.resourceType) {
        attrs[`data-sly-resourceType`] = props.resourceType;
    }
    if (props.set) {
        attrs[`data-sly-set`] = props.set;
    }
    if (props.template) {
        attrs[`data-sly-template`] = props.template;
    }
    if (props.test) {
        attrs[`data-sly-test`] = `${props.texst}`;
    }
    if (props.text) {
        attrs[`data-sly-text`] = props.text;
    }
    if (props.unwrap) {
        attrs[`data-sly-unwrap`] = `${props.unwrap}`;
    }
    if (props.use) {
        attrs[`data-sly-use`] = props.use;
    }
    return <div {...attrs}>{props.children}</div>;
}
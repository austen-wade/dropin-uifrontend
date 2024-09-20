export enum GlobalHTL {
  properties = 'properties',
  pageProperties = 'pageProperties',
  inheritedPageProperties = 'inheritedPageProperties',
  component = 'component',
  componentContext = 'componentContext',
  currentContentPolicy = 'currentContentPolicy',
  currentContentPolicyProperties = 'currentContentPolicyProperties',
  currentDesign = 'currentDesign',
  currentNode = 'currentNode',
  currentPage = 'currentPage',
  currentSession = 'currentSession',
  currentStyle = 'currentStyle',
  designer = 'designer',
  editContext = 'editContext',
  log = 'log',
  out = 'out',
  pageManager = 'pageManager',
  reader = 'reader',
  request = 'request',
  resolver = 'resolver',
  resource = 'resource',
  resourceDesign = 'resourceDesign',
  resourcePage = 'resourcePage',
  response = 'response',
  sling = 'sling',
  slyWcmHelper
  = 'slyWcmHelper',
  wcmmode = 'wcmmode',
  xssAPI = 'xssAPI',
}

/**
 * Use Sling Property
 * @param name - name of the property
 * @param source - source of the property
 * @returns HTL string
 * @example
 * ```tsx
 * <h1>{useSlingProperty(TitleProps.text, GlobalHTL.properties)}</h1>
 * ```
 * @example
 * Renders into HTL: ${source['name']}
 * 
 * use GlobalHTL enum for sources not defined
**/
export function useSlingProperty(name: string, source?: string | GlobalHTL): string {
  return `\$\{${source ? source : GlobalHTL.properties}['${name}']\}`;
}

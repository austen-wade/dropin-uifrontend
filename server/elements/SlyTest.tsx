export default function SlyTest({ test, children }: { test: string, children: React.ReactNode[] | React.ReactNode }) {
  const attrs = {
    'data-sly-unwrap': true,
    'data-sly-test': `\${${test}}`,
  };
  return <div {...attrs}>{children}</div>;
}
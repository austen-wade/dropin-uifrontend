import { Block } from './Block';
import { type BlockRowProps } from './BlockRow';

export function ActiveRow({ value }: BlockRowProps) {
  return (
    <div className="block-row">
      {Array.from({ length: 5 }).map((_, i) => (
        <Block key={i} active={i === value.length} letter={i < value.length ? value[i] : ''} />
      ))}
    </div>
  );
}

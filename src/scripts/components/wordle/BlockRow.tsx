import { Block } from './Block';
import type { GameColor } from './util';

export type BlockRowProps = {
  value: string;
  colors?: GameColor[];
};

export function BlockRow({ value, colors }: BlockRowProps) {
  return (
    <div className="block-row">
      {Array(5).fill(value).map((_, i) => (
        <Block
          key={i}
          letter={value[i]}
          color={colors && colors[i]} />
      ))}
    </div>
  );
}
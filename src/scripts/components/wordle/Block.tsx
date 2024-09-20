import { type GameColor } from './util';

export type BlockProps = {
  active?: boolean;
  letter: string;
  color?: GameColor;
}

export function Block({ active, letter, color }: BlockProps) {
  const classes = `${active ? 'active' : ''} ${color ? color : ''}`;

  return (
    <div className={`block ${classes}`}>{letter}</div >
  );
}

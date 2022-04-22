const DEFAULT = '_';

type _Tag<T extends { _tag: string }> = T['_tag'];

type MatchableState = {
  value?: unknown;
  _tag: string;
};

type MatchCase<T extends MatchableState, R> = {
  [K in _Tag<T>]: (x: Extract<T, { _tag: K }>) => R;
};

type DefaultMatchCase<R> = {
  [DEFAULT]: () => R;
};

type Pattern<T extends MatchableState, R = unknown> =
  | MatchCase<T, R>
  | DefaultMatchCase<R>;

export const match = <T extends MatchableState, R = unknown>(
  state: T,
  pattern: Pattern<T, R>
): R => {
  return ((pattern as any)[state._tag] || (pattern as any)[DEFAULT])(state);
};

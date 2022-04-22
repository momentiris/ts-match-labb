type MatchCase<
  _Tag extends keyof State,
  State extends { [X in _Tag]: string | number },
  R
> = {
  [X in State[_Tag]]: (p: Extract<State, { [_tag in _Tag]: X }>) => R;
};

type DefaultCase<R> = { _: () => R };

type Pattern<
  _Tag extends keyof State,
  State extends { [X in _Tag]: string | number },
  R
> = MatchCase<_Tag, State, R> | DefaultCase<R>;

export const matchWith = <
  _Tag extends string,
  State extends { [X in _Tag]: string | number },
  ReturnType = unknown
>(
  _tag: _Tag,
  state: State,
  pattern: Pattern<_Tag, State, ReturnType>
) =>
  (pattern as any)[state[_tag]]
    ? (pattern as any)[state[_tag]](state)
    : (pattern as any)['_'](state);

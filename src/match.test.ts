import { describe, expect, it } from 'vitest';

import { match } from './match';

describe('match', () => {
  type Foo = { _tag: 'foo' };
  type Bar<T> = { _tag: 'bar'; value: T };
  type Baz<T> = { _tag: 'baz'; value: T };
  type State = Foo | Bar<string> | Baz<string>;

  const foo: State = { _tag: 'foo' };
  const bar: State = { _tag: 'bar', value: 'this is bar' };
  const baz: State = { _tag: 'baz', value: 'this is baz' };

  it('returns correct case based on state', () => {
    const result = [foo, bar, baz].map((x) =>
      match<State, string>(x, {
        foo: () => 'foo',
        bar: ({ value }) => value,
        baz: ({ value }) => value,
      })
    );

    expect(result).toEqual(['foo', 'this is bar', 'this is baz']);
  });

  it('returns default case if match case is unavailable', () => {
    const result = match<State, string>(foo, {
      _: () => 'default',
    });

    expect(result).toEqual('default');
  });
});

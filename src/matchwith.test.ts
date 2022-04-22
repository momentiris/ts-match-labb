import { describe, expect, it } from 'vitest';

import { matchWith } from './matchwith';

describe('matchw', () => {
  type Foo<T> = { code: 0; value: T };
  type Bar<T> = { code: 1; value: T };
  type Baz<T> = { code: 2; value: T };

  type State = Foo<string> | Bar<string> | Baz<string>;

  const foo: State = { code: 0, value: '0' };
  const bar: State = { code: 1, value: '1' };
  const baz: State = { code: 2, value: '2' };

  it('returns correct case based on state', () => {
    const result = [foo, bar, baz].map((x) =>
      matchWith<'code', State, string>('code', x, {
        0: ({ value }) => value,
        1: ({ value }) => value,
        2: ({ value }) => value,
      })
    );

    expect(result).toEqual(['0', '1', '2']);
  });

  it('returns default case if match case is unavailable', () => {
    const result = [foo, bar, baz].map((x) =>
      matchWith<'code', State, string>('code', x, {
        0: ({ value }) => value,
        1: ({ value }) => value,
        _: () => 'default',
      })
    );

    expect(result).toEqual(['0', '1', 'default']);
  });
});

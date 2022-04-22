import { useState } from 'react';

import { match } from './match';

type Happy<T> = { _tag: 'happy'; value: T };
type Angry<T> = { _tag: 'angry'; value: T };
type Neutral<T> = { _tag: 'neutral'; value: T };

type AppState = Happy<string> | Angry<string> | Neutral<string>;

const Mood = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg bg-gray-200 px-8 py-4 text-8xl shadow-xl">
    {children}
  </div>
);

const happy: AppState = { _tag: 'happy', value: '😍' };
const angry: AppState = { _tag: 'angry', value: '😡' };
const neutral: AppState = { _tag: 'neutral', value: '😐' };

const states = [happy, angry, neutral];

function App() {
  const [state, set] = useState<AppState>(happy);

  const handleClick = () =>
    set(
      (current) =>
        states[states.findIndex((x) => x._tag === current._tag) + 1] ??
        states[0]
    );

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div>
        {match<AppState, JSX.Element>(state, {
          happy: ({ value }) => <Mood>{value}</Mood>,
          angry: ({ value }) => <Mood>{value}</Mood>,
          neutral: ({ value }) => <Mood>{value}</Mood>,
        })}
      </div>
      <div className="mt-12">
        <button
          className="rounded-lg border-2 border-black p-2"
          onClick={handleClick}
        >
          Change mood
        </button>
      </div>
    </div>
  );
}

export default App;

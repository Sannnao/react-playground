import { useState, useEffect, useLayoutEffect, useRef, Profiler, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
// eslint-disable-line

import { WithCallback, WithoutCallback } from './callback-test';

const arr = new Array(100);
arr.fill(null);

function App() {
  const headerRef = useRef();
  // useEffect(() => {
  //   for (let i = 0; i < 1e5; i++) {
  //     console.log(i);
  //   }
  //   headerRef.current.style.backgroundColor = 'black';
  // });
  const [count, setCount] = useState(0);

  const onRender = useCallback((
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) => {
      console.log(id, 'id  ') // the "id" prop of the Profiler tree that has just committed
      console.log(phase, 'phase  ') // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
      console.log(actualDuration, 'actualDuration  ') // time spent rendering the committed update
      console.log(baseDuration, 'baseDuration  ') // estimated time to render the entire subtree without memoization
      console.log(startTime, 'startTime  ') // when React began rendering this update
      console.log(commitTime, 'commitTime') // when React committed this update
      console.log(interactions, 'interactions') // the Set of interactions belonging to this update
  }, []);

  return (
    <Profiler id="app" onRender={onRender}>
    <div className="App">
      <header className="App-header" ref={headerRef}>
        <button onClick={() => setCount(count => count + 1)}>{count}</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Profiler id="with-callback" onRender={onRender}>
        {arr.map((_, i) => <WithCallback  key={i} onRender={onRender}/>)}
        </Profiler>
        <Profiler id="without-callback" onRender={onRender}>
        {arr.map((_, i) => <WithoutCallback  key={i} onRender={onRender}/>)}
        </Profiler>
      </header>
    </div>
    </Profiler>
  );
}

export default App;

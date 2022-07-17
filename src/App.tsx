import * as React from 'react';
import TimeBar from './components/TimeBar';

import './style.scss';

const App = () => {
  return (
    <div id='App'>
      <TimeBar duration={8} />
    </div>
  );
};

export default App;

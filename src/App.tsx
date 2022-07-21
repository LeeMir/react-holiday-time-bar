import React from 'react';
import TimeBar from './components/TimeBar/index';
import { GlobalStyles } from './GlobalStyles';

import './style.scss';

const App = () => {
  return (
    <div id='App'>
      <GlobalStyles />
      <TimeBar duration={4} />
    </div>
  );
};

export default App;

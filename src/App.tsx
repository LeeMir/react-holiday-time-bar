import React from 'react';
import HolidayTimeBar from './components/HolidayTimeBar/index';
import { GlobalStyles } from './GlobalStyles';

import './style.scss';

const App = () => {
  return (
    <div id='App'>
      <GlobalStyles />
      <HolidayTimeBar duration={2} />
    </div>
  );
};

export default App;

import React from 'react';
import HolidayTimeBar from './lib/HolidayTimeBar';
import { GlobalStyles } from './GlobalStyles';

import './style.scss';

const App = () => {
  return (
    <div id='App'>
      <GlobalStyles />
      <HolidayTimeBar duration={2} viewText={true} />
    </div>
  );
};

export default App;

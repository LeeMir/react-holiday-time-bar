# Holiday Time Bar

React + TypeScript + Parcel로 만든 휴가 시간 선택 바 컴포넌트

![image](https://user-images.githubusercontent.com/42960217/180602981-e30cc35a-f9c3-4b56-8cb4-093ff9e9f568.png)

## Usage

```React
import React from 'react';
import { HolidayTimeBar } from 'react-holiday-time-bar';

const App = () => {
  return (
    <div id='App'>
      <GlobalStyles />
      <HolidayTimeBar duration={2} />
    </div>
  );
};

export default App;
```

## Customize

### useState

```React
import React, { useState } from 'react';
import { HolidayTimeBar } from 'react-holiday-time-bar';

const App = () => {
  const [times, setTimes] = useState<any>({}); // { startWorkTime, endWorkTime, startHoliTime, endHoliTime }
  console.log(times.startWorkTime); // { hour: 9, minute: 15 }
  return (
    <div id='App'>
      <GlobalStyles />
      <HolidayTimeBar
        duration={2}
        times={times}
        setTimes={setTimes}
      />
    </div>
  );
};

export default App;
```

### viewText

```React
import React from 'react';
import { HolidayTimeBar } from 'react-holiday-time-bar';

const App = () => {
  const [times, setTimes] = useState<any>({}); // { startWorkTime, endWorkTime, startHoliTime, endHoliTime }
  return (
    <div id='App'>
      <GlobalStyles />
      <HolidayTimeBar
        duration={2}
        times={times}
        setTimes={setTimes}
        viewText={true}
      />
    </div>
  );
};

export default App;
```

### Color

```React
import React from 'react';
import { HolidayTimeBar } from 'react-holiday-time-bar';

const App = () => {
  return (
    <div id='App'>
      <GlobalStyles />
      <HolidayTimeBar
        duration={2}
        holiColor='#FDB0B3'
        holiHoverColor='#F15B6D'
        workColor='#C0FCF8'
        workHoverColor='#5ABAB6'
        lunchColor='#E7FBBE'
      />
    </div>
  );
};

export default App;
```

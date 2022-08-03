# react-holiday-time-bar 🏖️

<div>
  <a href="#" target="_blank"><img src="https://img.shields.io/badge/ESNext-F7DF1E?style=social&logo=javascript&logoColor=F7DF1E"/></a>
  <a href="#" target="_blank"><img src="https://img.shields.io/badge/v4.7.4-3178C6?style=social&logo=typescript&logoColor=3178C6"/></a>
  <a href="#" target="_blank"><img src="https://img.shields.io/badge/v18.2.0-61DAFB?style=social&logo=react&logoColor=61DAFB"/></a>
  <a href="#" target="_blank"><img src="https://img.shields.io/badge/v5.3.5-DB7093?style=social&logo=styled-components&logoColor=DB7093"/></a>
  <a href="#" target="_blank"><img src="https://img.shields.io/badge/v2.6.2-FBBE24?label=Parcel&style=social&logo=hackthebox&logoColor=FBBE24"/></a>
</div>

<div>  
  <a href="https://www.npmjs.com/package/react-holiday-time-bar" target="_blank"><img src="https://img.shields.io/npm/dy/react-holiday-time-bar?style=social&logo=npm"/></a>
  <a href="#" target="_blank"><img src="https://img.shields.io/github/stars/leemir/react-holiday-time-bar?style=social"/></a>
</div>

![image](https://user-images.githubusercontent.com/42960217/180602981-e30cc35a-f9c3-4b56-8cb4-093ff9e9f568.png)

<div align='center'>
  <a href="#" target="_blank"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FLeeMir%2Freact-holiday-time-bar&count_bg=%23574142&title_bg=%23F15B6D&icon=googlekeep.svg&icon_color=%23E7E7E7&title=hits&edge_flat=false"/></a>
</div>

## Introduction

Hello! This is react holiday time bar component. 📅 ⏰

In Korea, we can take annual leave / half-day leave / half-half day leave.

It can help to select your leave and work time.

## Get Started

```bash
npm i react-holiday-time-bar
```

or

```bash
yarn add react-holiday-time-bar
```

## Type

This component use next type.

```typescript
interface TimeValue {
  hour: number;
  minute: number;
}

type TimeCellMode = 'none' | 'lunch' | 'holi' | 'work';

interface TimeCellValue {
  mode: TimeCellMode;
  hoverMode: TimeCellMode;
}
```

## Usage

- **Cursor**'s position is always **Leave(Off) Start Time**.
- You can preview the results through the hover effect.
- If you click the cell, you can see the cell's background painted.
- `duration`: 2(half-half day) | 4(half-day) | 8(a day)

```React
import React from 'react';
import { HolidayTimeBar } from 'react-holiday-time-bar';

const App = () => {
  return (
    <div id='App'>
      <HolidayTimeBar duration={2} />
    </div>
  );
};

export default App;
```

## Constant

- Have to work: 9 hours (include lunch)
- Lunch time: 11:30 ~ 13:00
- Time to min: 07:00
- Time to max: 19:00

## Customize

### useState

- `times`, `setTimes` properties are operated when onClick.
  - `times = { startWorkTime, endWorkTime, startHoliTime, endHoliTime }`
  - *It must be useState*

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

- `viewText={true}` shows time you chose.
  - Refer to the below image.

```React
import React from 'react';
import { HolidayTimeBar } from 'react-holiday-time-bar';

const App = () => {
  return (
    <div id='App'>
      <HolidayTimeBar
        duration={2}
        viewText={true}
      />
    </div>
  );
};

export default App;
```

![image](https://i.imgur.com/ic6hMHg.png)

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

### className

- If you want to customize css, use `className`.
  - `cellClassName`: cell's `className`

```React
import React from 'react';
import { HolidayTimeBar } from 'react-holiday-time-bar';

const App = () => {
  return (
    <div id='App'>
      <GlobalStyles />
      <HolidayTimeBar
        duration={2}
        className='custom-class'
        cellClassName='custom-cell-class'
      />
    </div>
  );
};

export default App;
```

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

안녕하세요! 휴가(반차, 반반차) 시간 선택 바 리액트 컴포넌트입니다. 📅 ⏰

## Get Started

```bash
npm i react-holiday-time-bar
```

or

```bash
yarn add react-holiday-time-bar
```

## Type

여기서는 다음과 같은 형식을 사용합니다.

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

- **커서 위치**는 항상 휴가 시작 시간을 가리킵니다.
- 마우스를 올려놨을 때 테두리 변화로 휴가 시간과 근무 시간을 미리볼 수 있습니다.
- 클릭하면 배경이 칠해지며, 출퇴근 시간 및 휴가 시작/종료 시간이 담긴 상태를 반환합니다.
- `duration`: 2(반반차) | 4(반차) | 8

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

## Customize

### useState

- `times`, `setTimes`를 props로 넘겨주면 마우스 클릭 시마다 `times`에 아래 형태의 데이터가 저장됩니다.
  - `{ startWorkTime, endWorkTime, startHoliTime, endHoliTime }`

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

- `viewText={true}`는 내가 선택한 시간을 보여줍니다.
- 상태를 넘겨주지 않으면 자체 내장된 상태로 진행합니다.

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

- 색깔 props로 수정 가능

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

- 그 밖에 커스텀 css를 입히고 싶다면, `className`을 부여할 수 있습니다.
  - `cellClassName`: 셀 한 개에 들어갈 `className`입니다.

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

# Holiday Time Bar

React로 만든 휴가 시간 선택 바 컴포넌트 🏖️

![image](https://user-images.githubusercontent.com/42960217/180602981-e30cc35a-f9c3-4b56-8cb4-093ff9e9f568.png)

<div align='center'>
  <a href="#" target="_blank"><img src="https://img.shields.io/badge/ESNext-F7DF1E?style=social&logo=javascript&logoColor=F7DF1E"/></a>
  <a href="#" target="_blank"><img src="https://img.shields.io/badge/v4.7.4-3178C6?style=social&logo=typescript&logoColor=3178C6"/></a>
  <a href="#" target="_blank"><img src="https://img.shields.io/badge/v18.2.0-61DAFB?style=social&logo=react&logoColor=61DAFB"/></a>
  <a href="#" target="_blank"><img src="https://img.shields.io/badge/v5.3.5-DB7093?style=social&logo=styled-components&logoColor=DB7093"/></a>
  <a href="#" target="_blank"><img src="https://img.shields.io/badge/v2.6.2-FBBE24?label=Parcel&style=social&logo=hackthebox&logoColor=FBBE24"/></a>
</div>

<div align='center'>  
  <a href="#" target="_blank"><img src="https://img.shields.io/npm/dy/react-holiday-time-bar?style=social&logo=npm"/></a>
  <a href="#" target="_blank"><img src="https://img.shields.io/github/stars/leemir/react-holiday-time-bar?style=social"/></a>
</div>

## Usage

- 커서 위치는 항상 휴가 시작 시간
- 마우스를 올려놨을 때 테두리 변화로 미리보기 가능, 클릭 시 배경이 칠해짐
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

- `times`, `setTimes`를 props로 넘겨주면 `times`에 네가지 정보 저장
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

- `viewText={true}`로 선택한 시간 출력

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

- 그 밖에 커스텀 css를 입히고 싶다면, `className`으로 해결
  - `cellClassName`: 셀 한 개에 들어갈 `className`

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

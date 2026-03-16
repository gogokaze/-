# Mission Entity (LOCK SPEC v0.1)

Mission 도메인의 단일 진실 원천(SSOT)과 6-step 워크플로우 전이를 위한 기본 구조입니다.

## Files

- `constants.js`: 워크플로우 상태/이벤트 상수
- `model.js`: mission 초기 모델 생성기
- `guards.js`: 상태 전이 가드/검증 조건
- `reducer.js`: event -> next state 리듀서
- `selectors.js`: Dashboard / Planner 조회용 선택자

## Usage sketch

```js
import { missionReducer } from './reducer.js';
import { MISSION_EVENTS } from './constants.js';

const next = missionReducer(currentMission, {
  type: MISSION_EVENTS.DEFINE_PATH,
  payload: { path: { waypoints: [...] } },
});
```

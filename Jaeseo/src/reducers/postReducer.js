// evaluate any actions commited
import {FETCH_POSTS,NEW_POST} from '../actions/types';

// 최초 변화를 일으키기 전 가지고 있어야할 초기 상태 정의
const initialState = {
  items: [],
  item: {}
}

// 리듀서 - state와 action을 파라미터로 갖는다.
// state가 없으면 initial state를 넣는다
export default function (state = initialState, action) {
  // action에 따른 상태변화를 일으킨다.
  switch(action.type){
    
    case FETCH_POSTS:
      // state를 수정하면 안되고 기존 state값에 원하는 값을 덮어쓴 상태 객체를 만들어야 한다.
      return {
        ... state,
        items: action.payload
      }
    case NEW_POST:
      return {
        ...state,
        item: action.payload
      }
    default:
      return state;
  }
}
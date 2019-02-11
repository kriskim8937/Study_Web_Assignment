import { combineReducers} from 'redux';
import postReducer from './postReducer';

// 객체를 전달하는데, 이때 객체 구조에 따라 합친 리듀서 상태 구조를 정의한다.
export default combineReducers({
  posts: postReducer
});
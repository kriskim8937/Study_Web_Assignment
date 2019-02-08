import {FETCH_POSTS, NEW_POST} from './types'
// 액션 생성 함수 
// dispatch -> action 전달
export const fetchPosts = () => dispatch => {
  console.log("fetch")
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => dispatch({
      type: FETCH_POSTS,
      payload: posts,
    }));
};

export const createPosts = (postData) => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts',{
    method: 'POST',
    headers: {
      'content-type':'application/json'
    },
    body: JSON.stringify(postData)
  })
  .then(res => res.json())
  .then(post => dispatch({
    type: NEW_POST,
    payload: post
  }));

};
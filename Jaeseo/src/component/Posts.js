import React, { Component } from 'react';
import PropTypes from 'prop-types';
// connect component to store
import { connect } from 'react-redux';
//props에 연결할 액션 생성 함수를 가져온다.
import { fetchPosts } from '../actions/postActions';

class Posts extends Component {
  
  componentWillMount(){
    console.log(this.props)
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.newPost){
      this.props.posts.unshift(nextProps.newPost)
    }
  }

  render() {
    const postItems = this.props.posts.map(post =>(
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <div>
        <h1>Post</h1>
        {postItems}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};
// store안의 state값을 props로 연결한다.
const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
})

//connect함수에는 파라미터 3개가 들어간다.
//1) mapStateTopProps : store.getState() 결과 값인 state를 파라미터로 받아 컴포넌트의 props로 사용할 객체를 반환한다.
//2) mapDispatchToProps: dispatch를 파라미터로 받아 액션을 디스패치하는 함수들을 객체 안에 넣어서 반환한다.
//3) mergeProps: state와 dispatch가 동시에 필요한 함수를 props로 전달해야 할 때 사용한다. 일반적으로 사용하지 않는다.
// connect함수를 호출하고 난 후 또 다른 함수를 반환한다. 반환하는 함수의 파라미터로 리덕스에 연결시킬 컴포넌트를 넣으면
// mapStateToProps와 mapDispatchToProps에서 정의한 값들을 props로 받아오는 새 컴포넌트를 만든다.
export default connect (mapStateToProps,{ fetchPosts })(Posts)
import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, ButtonGroup, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class ContentsController extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: {
        title: '',
        category: [],
        description: '',
      }
    }

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  //title, description 값들 입력
  onChange(e) {
    const { value, name } = e.target;
    this.setState(prevState => ({
      inputValue: {
        ...prevState.inputValue,
        [name]: value,
      }
    }));
  }

  //카테고리별 버튼 클릭 시 해당 카테고리가 배열에 들어감
  onClick(e) {
    const { value } = e.target;
    this.setState(prevState => ({
      inputValue: {
        ...prevState.inputValue,
        'category': [
          ...prevState.inputValue['category'],
          value,
        ]
      }
    }));
  }
  
  //확인 버튼 클릭 시 axios 요청
  onSubmit(e) {
    e.preventDefault();
    const { title, category, description } = this.state.inputValue;

    //input type이 coverimg인 dom 가져옴.
    const coverImg = document.getElementById('coverImg').files[0];
    
    //파일(이미지) 보낼 때 파일 의외에 데이터도 보내야 한다면 formdata로 하나로 묶어 보내야 함.
    const dataInObject = {
      title,
      category,
      description,
      coverImg,
    };
    const formData = new FormData();

    //입력 받은 데이터들을 formData에 append 메소드를 이용하여 넣어준다.
    Object.keys(dataInObject).map((key) => {
      return formData.append(key, dataInObject[key]);
    });

    //axios 요청으로 하나로 묶어버린 formData 하나만 전달한다.
    axios.post('http://localhost:8080/api/contents/create', formData)
    .then((result) => {
      return <Redirect to='/' />
    })
    .catch((err) => { console.log(err) });
  }

  render() {
    return(
      <div className = "row">
        <div className = "col-md-4 col-md-offset-4">
          <h1 className = "FormHeader">스터디 작성 페이지</h1>
          <form>
            <FormGroup>
              <ControlLabel>제목</ControlLabel>
              <FormControl
                type = "text"
                name="title"
                onChange={this.onChange}
              >
              </FormControl>
            </FormGroup>

            <FormGroup>
              <ControlLabel>분류 선택</ControlLabel><br />
              <ButtonGroup>
                <Button onClick={this.onClick} name="category" value="영어 회화">영어 회화</Button>
                <Button onClick={this.onClick} name="category" value="자소서">자소서</Button>
                <Button onClick={this.onClick} name="category" value="면접">면접</Button>
                <Button onClick={this.onClick} name="category" value="알고리즘">알고리즘</Button>
                <Button onClick={this.onClick} name="category" value="프로젝트">프로젝트</Button>
              </ButtonGroup>
            </FormGroup>

            <FormGroup controlId="formControlsSelect">
              <ControlLabel>주소 선택</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <option value="select">서울특별시 중구</option>
                <option value="other">...</option>
              </FormControl>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>스터디 설명</ControlLabel>
              <FormControl 
                name="description" 
                componentClass="textarea"
                onChange={this.onChange} 
                placeholder="스터디 설명/모임 시간 등을 적어주세요." />
              </FormGroup>

              <FormGroup>
                <ControlLabel>커버 이미지</ControlLabel>
                <input type="file" id="coverImg" />
              </FormGroup>

            <Button bsStyle="primary" block type = "submit" onClick={this.onSubmit}>
              확인
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default ContentsController;
import React, { useState } from "react";
import Login from "./Login.js";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Signup = () => {
  const uri=process.env.REACT_APP_URI
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");

  const [idMessage, setIdMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");

  const [isId, setIsId] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const navigate = useNavigate();

  // 회원가입 정보를 서버로 전송하는 함수
  const submitForm = async () => {
    console.log("id",id)
    try {
      const response = await fetch(`${uri}/api/user/add`, {//서버로 회원가입 정보를 보낸다.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          name,
          pwd:password,
          email
          
        })
      });
      
      // 서버 응답을 확인하고 적절한 조치를 취함
      if (response.ok) {
        // 회원가입이 성공적으로 이루어지면, 로그인 페이지로 이동한다
        navigate('/Login');
      } else {
        // 서버로부터 에러 응답을 받은 경우
        console.error('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // 유효성 검사 로직 추가 (예: 모든 필드가 유효한지 확인)

    // 모든 필드가 유효하다면 서버로 데이터 전송
    if (isId && isName && isPassword && isPasswordConfirm && isEmail ) {
      submitForm();//필드가 유효한지 클라이언트에서 확인하지만 서버에서도 확인을 해야한다.
    }
  };
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length < 2 || currentName.length > 5) {
      setNameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요!");
      setIsName(false);
    } else {
      setNameMessage("사용가능한 닉네임 입니다.");
      setIsName(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    // if (!passwordRegExp.test(currentPassword)) {
    if(false) { setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };

  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("떼잉~ 비밀번호가 똑같지 않아요!");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
      setIsPasswordConfirm(true);
    }
  };

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
      //숫자영문_+@+숫자영문+.+영문(3)
    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다!");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
      setIsEmail(true);
    }
  };
  const onChangeId = (e) => {
    
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;
console.log(id)
    if (!idRegExp.test(currentId)) {
      setIdMessage("4-12사이 대소문자 또는 숫자만 입력해 주세요!");
      setIsId(false);
    } else {
      setIdMessage("사용가능한 아이디 입니다.");
      setIsId(true);
    }
  };
  const onChangePhone = (getNumber) => {
    const currentPhone = getNumber;
    setPhone(currentPhone);
    const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMessage("올바른 형식이 아닙니다!");
      setIsPhone(false);
    } else {
      setPhoneMessage("사용 가능한 번호입니다:-)");
      setIsPhone(true);
    }
  };

  const addHyphen = (e) => {
    const currentNumber = e.target.value;
    setPhone(currentNumber);
    if (currentNumber.length == 3 || currentNumber.length == 8) {
      setPhone(currentNumber + "-");
      onChangePhone(currentNumber + "-");
    } else {
      onChangePhone(currentNumber);
    }
  };

  const onChangeBirth = (e) => {
    const currentBirth = e.target.value;
    setBirth(currentBirth);
  };

  return (
    <div className="container mx-auto lg:w-1/2 xl:w-1/3 h-screen p-0 m-0">
      <h3 className="text-2xl font-semibold pt-5 mb-4">회원가입</h3>
      <div className="form">
        <form onSubmit={onSubmit} className="h-10">
          <div className="form-el">
            <label htmlFor="id">아이디</label> 
            <input className="m-0" id="id" name="id" value={id} onInput={onChangeId} style={{margin:0}} />
            <p className="message"> {idMessage} </p>
          </div>

          <div className="form-el">
            <label htmlFor="name">닉네임</label> 
            <input id="name" name="name" value={name} onInput={onChangeName} style={{margin:0}} />
            <p className="message">{nameMessage}</p>
          </div>
        <div className="form-el">
          <label htmlFor="password">비밀번호</label> 
          <input
            id="password" style={{margin:0}}
            name="password"
            value={password}
            onInput={onChangePassword}
            type="password"
          />
          <p className="message">{passwordMessage}</p>
        </div>
        <div className="form-el">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input style={{margin:0}}
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            type="password"
            onInput={onChangePasswordConfirm}
          />
          <p className="message">{passwordConfirmMessage}</p>
        </div>
        <div className="form-el">
          <label htmlFor="email">이메일</label>
          <input style={{margin:0}}
            id="email"
            name="name"
            value={email}
            onInput={onChangeEmail}
          />
          <p className="message">{emailMessage}</p>
        </div>
        
       
        
        <br />
        <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            확인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
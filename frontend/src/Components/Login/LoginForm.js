import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputBox from "../../Reusables/InputBox/InputBox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Redux/actions/userActions";
import Loader from "../../Reusables/Loader";

const Wrapper = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputWrapper = styled.div`
  height: 50px;
  width: 250px;
  margin: 25px 0;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
`;

const LoginButton = styled.div`
  height: fit-content;
  width: fit-content;
  padding: 20px 40px;
  margin: 20px 0;
  border: 2px solid #9b84ee;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #9b84ee;
  transition: all 0.2s ease-in;
  p {
    font-family: "Josefin Sans", sans-serif;
    font-size: 1.2em;
    font-weight: 400;
  }
  &:hover {
    background: rgb(60, 60, 60);
    color: rgb(180, 180, 180);
  }
`;
const LoaderWrapper = styled.div`
  width: 250px;
  display: flex;
  justify-content: center;
`;

const LoginForm = ({ signupshowHandler }) => {
  const { loading, user } = useSelector((state) => state.loggedUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = () => {
    dispatch(loginUser(email, password));
  };
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      navigate("/home");
    }
  }, [loading, navigate, user]);
  return (
    <Wrapper>
      <h1>Welcome Back ! </h1>
      <h3 style={{ margin: "20px 0" }}>Login with your credentials</h3>
      <InputWrapper>
        <InputBox placeholder="Email" state={email} changeHandler={setEmail} />
      </InputWrapper>
      <InputWrapper>
        <InputBox
          placeholder="Password"
          state={password}
          changeHandler={setPassword}
        />
      </InputWrapper>
      <ButtonsWrapper>
        {loading ? (
          <LoaderWrapper>
            <Loader></Loader>
          </LoaderWrapper>
        ) : (
          <LoginButton onClick={submitHandler}>
            <p>Proceed</p>
          </LoginButton>
        )}
        <h2>Or</h2>
        <LoginButton onClick={signupshowHandler}>
          <p>New User ?</p>
        </LoginButton>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default LoginForm;

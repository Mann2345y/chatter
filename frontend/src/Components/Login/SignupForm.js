import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InputBox from "../../Reusables/InputBox/InputBox";
import Loader from "../../Reusables/Loader";
import { signupUser } from "../../Redux/actions/userActions";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
  height: 85%;
  width: 82%;
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

const SignupForm = ({ loginshowHandler }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user } = useSelector((state) => state.loggedUser);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const SubmitHandler = () => {
    dispatch(signupUser(username, email, password));
  };
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      navigate("/home");
    }
  }, [loading, navigate, user]);
  return (
    <Wrapper>
      <h1>Sign Up and Begin Chatting ! </h1>
      <h3 style={{ margin: "20px 0" }}>Create A Fresh Account</h3>
      <InputWrapper>
        <InputBox
          placeholder="User Name"
          state={username}
          changeHandler={setUsername}
        />
      </InputWrapper>
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
      <InputWrapper>
        <InputBox
          placeholder="Confirm Password"
          state={confPassword}
          changeHandler={setConfPassword}
        />
      </InputWrapper>
      <ButtonsWrapper>
        {loading ? (
          <Loader></Loader>
        ) : (
          <LoginButton onClick={SubmitHandler}>
            <p>Proceed</p>
          </LoginButton>
        )}
        <h2>Or</h2>
        <LoginButton onClick={loginshowHandler}>
          <p>Existing User ?</p>
        </LoginButton>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default SignupForm;

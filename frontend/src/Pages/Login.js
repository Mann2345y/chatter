import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../Reusables/Container";
import styled from "styled-components";
import LoginForm from "../Components/Login/LoginForm";
import SignupForm from "../Components/Login/SignupForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
const Motion = styled(motion.div)`
  position: absolute;
  left: 5%;
  height: 100%;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;
const LeftBlock = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const RightBlock = styled.div`
  height: 100%;
  width: 50%;
  position: relative;
`;

const Logoimage = styled.img`
  width: 500px;
`;
const FormWrapper = styled.div`
  height: fit-content;
  width: 100%;
  text-align: center;
`;
const ButtonsWrapper = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;
const Button = styled.div`
  height: 50px;
  width: fit-content;
  padding: 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #9b84ee;
  border-radius: 25px;
  margin: 25px 0;
  cursor: pointer;
  p {
    font-family: "Josefin Sans", sans-serif;
    font-size: 1.2em;
    font-weight: 400;
  }
`;

const Login = () => {
  const [formshow, setFormshow] = useState(true);
  const [loginshow, setLoginshow] = useState(false);
  const [signupshow, setSignupshow] = useState(false);
  const { user } = useSelector((state) => state.loggedUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      navigate("/home");
    }
  }, [user, navigate]);

  const loginshowHandler = () => {
    setFormshow(false);
    setLoginshow(true);
    setSignupshow(false);
  };
  const signupshowHandler = () => {
    setFormshow(false);
    setLoginshow(false);
    setSignupshow(true);
  };
  return (
    <motion.div
      key="loginpage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container>
        <Wrapper>
          <LeftBlock>
            <Logoimage src="/images/logo.png" alt="#" />
            <h1 style={{ marginTop: "25px" }}>A Faster way to Chat ...</h1>
          </LeftBlock>
          <RightBlock>
            <AnimatePresence>
              {formshow && (
                <Motion
                  key="formshow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FormWrapper>
                    <h1>Get Started</h1>
                    <ButtonsWrapper>
                      <Button onClick={loginshowHandler}>
                        <p>Existing User ? Login</p>
                      </Button>
                      <Button onClick={signupshowHandler}>
                        <p>New User ? Create Account</p>
                      </Button>
                    </ButtonsWrapper>
                  </FormWrapper>
                </Motion>
              )}
              {loginshow && (
                <Motion
                  key="loginshow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <LoginForm signupshowHandler={signupshowHandler} />
                </Motion>
              )}
              {signupshow && (
                <Motion
                  key="signupshow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SignupForm loginshowHandler={loginshowHandler} />
                </Motion>
              )}
            </AnimatePresence>
          </RightBlock>
        </Wrapper>
      </Container>
    </motion.div>
  );
};

export default Login;

import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { BiDotsVerticalRounded as Menu } from "react-icons/bi";
import { logoutUser } from "../../Redux/actions/userActions";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: rgb(35, 35, 35);
  position: relative;
`;
const Top = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid rgb(80, 80, 80);
`;
const Logo = styled.img`
  height: 30px;
`;
const ManageFriendsButton = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1.2px;
  border-bottom: 1px solid rgb(80, 80, 80);
  cursor: pointer;
`;
// const InputBar = styled.input`
//   height: 30px;
//   width: 100%;
//   background: transparent;
//   border: none;
//   border-radius: 10px;
//   font-size: 1em;
//   font-family: Josefin Sans, sans-serif;
//   background: rgb(55, 55, 55);
//   padding: 0 20px;
//   color: #d3d3d3;
//   &:focus {
//     outline: none;
//   }
//   &::placeholder {
//     color: #d3d3d3;
//   }
// `;

const OptionsWrapper = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover div {
    transform: scaleY(1);
  }
  z-index: 2;
`;
const MenuOptions = styled.div`
  height: 100px;
  width: 150px;
  background: #9b84ee;
  position: absolute;
  top: 45px;
  right: 0px;
  transform-origin: top;
  transform: scaleY(0);
  transition: all 0.2s ease-in;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  h5 {
    z-index: 1;
    color: black;
    transition: all 0.2s ease-in;
    &:hover {
      color: #d3d3d3;
    }
  }
  div {
    height: 95%;
    width: 100%;
    margin-top: 5%;
    background: white;
  }
`;
const Header = ({ setOpenSlider }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Top>
        <Logo src="/images/logo2.png" />
        <OptionsWrapper>
          <Menu size={28} style={{ cursor: "pointer" }} color="#9b84ee" />
          <MenuOptions>
            <h5
              onClick={() => {
                setOpenSlider(true);
              }}
            >
              Profile
            </h5>
            <h5
              onClick={() => {
                dispatch(logoutUser());
                navigate("/");
              }}
            >
              Log Out
            </h5>
            <h5>Change Theme</h5>
          </MenuOptions>
        </OptionsWrapper>
      </Top>
    </Wrapper>
  );
};

export default Header;

import React from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import CreateGC from "./CreateGC";
import EditGC from "./EditGC";

const Motion = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const ChoiceButtons = styled.div`
  height: 120px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ChoiceButton = styled.div`
  height: 50px;
  width: 100%;
  border: 1px solid #9b84ee;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transition: all 0.2s ease-in;
  cursor: pointer;
  &:hover {
    background: #9b84ee;
    color: black;
  }
`;

const ManageGC = ({ friendsArray }) => {
  const [showChoice, setShowChoice] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <Wrapper>
      <AnimatePresence>
        {showChoice ? (
          <Motion
            key="showchoices"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ChoiceButtons>
              <ChoiceButton
                onClick={() => {
                  setShowChoice(false);
                  setShowCreate(true);
                }}
              >
                <p>Create New Group</p>
              </ChoiceButton>
              <ChoiceButton
                onClick={() => {
                  setShowChoice(false);
                  setShowCreate(false);
                }}
              >
                <p>Manage Groups</p>
              </ChoiceButton>
            </ChoiceButtons>
          </Motion>
        ) : (
          <Motion
            key="notshowchoices"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {showCreate ? (
              <CreateGC
                friendsArray={friendsArray}
                setShowChoice={setShowChoice}
                setShowCreate={setShowCreate}
              ></CreateGC>
            ) : (
              <EditGC></EditGC>
            )}
          </Motion>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default ManageGC;

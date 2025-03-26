import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DialogueBox = ({ narrative, isTyping, onAdvance }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showContinue, setShowContinue] = useState(false);
  
  // Typing effect
  useEffect(() => {
    if (isTyping) {
      setDisplayedText('');
      setShowContinue(false);
      
      let index = 0;
      const text = narrative.text;
      
      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(prev => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(typingInterval);
          setShowContinue(true);
        }
      }, 30); // Speed of typing
      
      return () => clearInterval(typingInterval);
    } else {
      // If not typing, show full text immediately
      setDisplayedText(narrative.text);
      setShowContinue(true);
    }
  }, [narrative, isTyping]);
  
  const handleClick = () => {
    console.log("DialogueBox clicked, showContinue:", showContinue);
    if (showContinue && onAdvance) {
      onAdvance();
    }
  };

  // Added utility function to force advance
  const forceAdvance = () => {
    console.log("Force advancing to next scene");
    if (onAdvance) {
      onAdvance();
    }
  };
  
  return (
    <DialogueBoxContainer onClick={handleClick}>
      {narrative.speaker && (
        <SpeakerName>{narrative.speaker}</SpeakerName>
      )}
      
      <DialogueText>
        {displayedText}
        {isTyping && <Cursor>|</Cursor>}
      </DialogueText>
      
      {showContinue && (
        <>
          <ContinuePrompt>
            Click anywhere in this box to continue →
          </ContinuePrompt>
          <NextButton onClick={forceAdvance}>
            NEXT →
          </NextButton>
        </>
      )}
    </DialogueBoxContainer>
  );
};

const DialogueBoxContainer = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 2rem;
  margin: 1rem;
  max-width: 900px;
  width: calc(100% - 2rem);
  margin: 0 auto;
  align-self: flex-end;
  margin-bottom: 2.5rem;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 10px rgba(229, 9, 20, 0.3);
  }
`;

const SpeakerName = styled.div`
  position: absolute;
  top: -1.2rem;
  left: 1.5rem;
  background-color: #e50914;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 1.2rem;
`;

const DialogueText = styled.p`
  font-size: 1.3rem;
  line-height: 1.7;
  margin: 0;
  min-height: 100px;
`;

const Cursor = styled.span`
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const ContinuePrompt = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
  font-size: 0.9rem;
  color: #e50914;
  font-weight: bold;
  animation: pulse 1.5s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
`;

const NextButton = styled.button`
  position: absolute;
  bottom: -50px;
  right: 1rem;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 20px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: #f40612;
    transform: scale(1.05);
  }
`;

export default DialogueBox; 
import React from 'react';
import styled from 'styled-components';

const EndScreen = ({ onRestart }) => {
  return (
    <EndScreenContainer>
      <EndScreenContent>
        <Title>Coming Soon</Title>
        <Message>
          You've reached the end of the current story content.
          <br /><br />
          More exciting chapters are in development...
          <br /><br />
          Stay tuned for updates!
        </Message>
        <RestartButton onClick={onRestart}>
          Play Again
        </RestartButton>
      </EndScreenContent>
    </EndScreenContainer>
  );
};

const EndScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const EndScreenContent = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 40px;
  border-radius: 8px;
  text-align: center;
  max-width: 600px;
  margin: 20px;
`;

const Title = styled.h1`
  color: #e50914;
  font-size: 48px;
  margin-bottom: 30px;
`;

const Message = styled.p`
  color: #fff;
  font-size: 24px;
  line-height: 1.6;
  margin-bottom: 40px;
`;

const RestartButton = styled.button`
  background: #e50914;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f40612;
    transform: scale(1.05);
  }
`;

export default EndScreen; 
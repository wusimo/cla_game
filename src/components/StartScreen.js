import React from 'react';
import styled from 'styled-components';

const StartScreen = ({ onStart }) => {
  return (
    <StartScreenContainer className="fade-in">
      <TitleContainer>
        <Title>CRAZY, LOST, ASIANS</Title>
        <Subtitle>An Interactive Journey Through Silicon Valley</Subtitle>
      </TitleContainer>
      
      <Description>
        Choose your character and navigate the cutthroat world of tech startups.
        Your decisions will shape relationships, business outcomes, and personal destinies.
      </Description>
      
      <StartButton onClick={onStart}>
        START GAME
      </StartButton>
      
      <Footer>
        Episode 1: Silicon Dreams
      </Footer>
    </StartScreenContainer>
  );
};

const StartScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
    url('/assets/silicon-valley-aerial.jpg') no-repeat center center;
  background-size: cover;
  padding: 2rem;
`;

const TitleContainer = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  letter-spacing: 3px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  color: #ccc;
`;

const Description = styled.p`
  max-width: 600px;
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f40612;
    transform: scale(1.05);
  }
`;

const Footer = styled.div`
  margin-top: 3rem;
  font-size: 1.2rem;
  color: #ccc;
  font-style: italic;
`;

export default StartScreen; 
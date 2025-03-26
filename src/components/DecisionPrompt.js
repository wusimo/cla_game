import React, { useState } from 'react';
import styled from 'styled-components';

const DecisionPrompt = ({ decisions, onSelect, character }) => {
  const [hoveredOption, setHoveredOption] = useState(null);
  
  return (
    <DecisionContainer className="fade-in">
      <DecisionTitle>
        What will {character.name} do?
      </DecisionTitle>
      
      <DecisionOptions>
        {decisions.options.map((option, index) => (
          <DecisionOption 
            key={index}
            onClick={() => onSelect(option)}
            onMouseEnter={() => setHoveredOption(option)}
            onMouseLeave={() => setHoveredOption(null)}
            highlighted={hoveredOption === option}
          >
            <OptionText>{option.text}</OptionText>
            
            {hoveredOption === option && option.preview && (
              <OptionPreview>
                {option.preview}
              </OptionPreview>
            )}
          </DecisionOption>
        ))}
      </DecisionOptions>
      
      <DecisionQuote>
        {decisions.quote}
      </DecisionQuote>
      
      <DecisionTimer>
        <TimerBar />
      </DecisionTimer>
    </DecisionContainer>
  );
};

const DecisionContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 0 auto 2rem;
  max-width: 800px;
  width: calc(100% - 2rem);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DecisionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #e50914;
`;

const DecisionOptions = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const DecisionOption = styled.div`
  padding: 1rem;
  background-color: ${props => props.highlighted ? 'rgba(229, 9, 20, 0.2)' : 'rgba(50, 50, 50, 0.5)'};
  border: 1px solid ${props => props.highlighted ? '#e50914' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background-color: rgba(229, 9, 20, 0.2);
    border-color: #e50914;
    transform: translateY(-2px);
  }
`;

const OptionText = styled.p`
  margin: 0;
  font-size: 1.1rem;
`;

const OptionPreview = styled.div`
  position: absolute;
  top: -80px;
  left: 0;
  right: 0;
  background-color: rgba(20, 20, 20, 0.9);
  padding: 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #ccc;
  border: 1px solid #333;
  z-index: 10;
`;

const DecisionQuote = styled.p`
  font-style: italic;
  color: #999;
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
`;

const DecisionTimer = styled.div`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-top: 1.5rem;
  border-radius: 2px;
  overflow: hidden;
`;

const TimerBar = styled.div`
  height: 100%;
  background-color: #e50914;
  width: 100%;
  animation: timerAnimation 15s linear forwards;
  
  @keyframes timerAnimation {
    0% { width: 100%; }
    100% { width: 0%; }
  }
`;

export default DecisionPrompt; 
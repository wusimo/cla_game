import React from 'react';
import styled from 'styled-components';

const SoundToggle = ({ muted, onToggle }) => {
  return (
    <ToggleButton onClick={onToggle}>
      {muted ? (
        <span role="img" aria-label="Sound Off">🔇</span>
      ) : (
        <span role="img" aria-label="Sound On">🔊</span>
      )}
    </ToggleButton>
  );
};

const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 20px;
  z-index: 100;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.5);
  }
`;

export default SoundToggle; 
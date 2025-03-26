import React, { useState } from 'react';
import styled from 'styled-components';

const CharacterSelect = ({ characters, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCharacter = characters[selectedIndex];

  const handlePrevious = () => {
    setSelectedIndex((prevIndex) => 
      prevIndex === 0 ? characters.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => 
      prevIndex === characters.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSelect = () => {
    onSelect(selectedCharacter);
  };

  return (
    <CharacterSelectContainer className="fade-in">
      <Title>Choose Your Character</Title>
      <Subtitle>Each character offers a unique perspective and storyline</Subtitle>
      
      <CharacterCarousel>
        <ArrowButton onClick={handlePrevious}>&#10094;</ArrowButton>
        
        <CharacterCard>
          <CharacterImage src={selectedCharacter?.image || '/assets/placeholder-character.jpg'} />
          <CharacterName>{selectedCharacter?.name}</CharacterName>
          <CharacterTitle>{selectedCharacter?.title}</CharacterTitle>
          <CharacterDescription>{selectedCharacter?.description}</CharacterDescription>
          
          <CharacterTraits>
            {selectedCharacter?.traits?.map((trait, index) => (
              <CharacterTrait key={index}>{trait}</CharacterTrait>
            ))}
          </CharacterTraits>
          
          <SelectButton onClick={handleSelect}>
            Play as {selectedCharacter?.name}
          </SelectButton>
        </CharacterCard>
        
        <ArrowButton onClick={handleNext}>&#10095;</ArrowButton>
      </CharacterCarousel>
      
      <CharacterIndicators>
        {characters.map((_, index) => (
          <CharacterIndicator 
            key={index} 
            $active={index === selectedIndex}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </CharacterIndicators>
    </CharacterSelectContainer>
  );
};

const CharacterSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 2rem;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)),
    url('/assets/office-background.jpg') no-repeat center center;
  background-size: cover;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 300;
  color: #ccc;
  margin-bottom: 3rem;
`;

const CharacterCarousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 900px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  padding: 0 1rem;
  
  &:hover {
    color: #e50914;
  }
`;

const CharacterCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  background-color: rgba(20, 20, 20, 0.8);
  border-radius: 8px;
  padding: 2rem;
  margin: 0 1rem;
`;

const CharacterImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border: 3px solid #e50914;
`;

const CharacterName = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const CharacterTitle = styled.h4`
  font-size: 1.2rem;
  color: #e50914;
  margin-bottom: 1rem;
`;

const CharacterDescription = styled.p`
  text-align: center;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const CharacterTraits = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
`;

const CharacterTrait = styled.span`
  background-color: rgba(229, 9, 20, 0.2);
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const SelectButton = styled.button`
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
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

const CharacterIndicators = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const CharacterIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$active ? '#e50914' : '#555'};
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$active ? '#e50914' : '#777'};
  }
`;

export default CharacterSelect; 
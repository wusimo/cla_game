import React from 'react';
import { mapEmotion } from '../utils/emotionMapper';

const CharacterPortrait = ({ character, emotion, position = 'left' }) => {
  // Map the emotion to a core emotion
  const mappedEmotion = mapEmotion(emotion);
  
  // Get the base image path
  const basePath = `/assets/characters/${character.toLowerCase()}`;
  
  // Construct the full image path with the mapped emotion
  const imagePath = `${basePath}-${mappedEmotion}.png`;
  
  return (
    <div className={`character-portrait ${position}`}>
      <img 
        src={imagePath} 
        alt={`${character} ${mappedEmotion}`}
        onError={(e) => {
          console.error(`Failed to load character image: ${imagePath}`);
          e.target.src = `${basePath}-neutral.png`; // Fallback to neutral
        }}
      />
    </div>
  );
};

export default CharacterPortrait; 
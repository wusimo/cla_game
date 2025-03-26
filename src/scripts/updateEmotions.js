const fs = require('fs');
const path = require('path');
const { mapEmotion } = require('../utils/emotionMapper');

// Read the scenes file
const scenesPath = path.join(__dirname, '../data/scenes.js');
let scenesContent = fs.readFileSync(scenesPath, 'utf8');

// Find all emotion references and replace them
const emotionRegex = /emotion:\s*"([^"]+)"/g;
let match;
let updatedContent = scenesContent;

while ((match = emotionRegex.exec(scenesContent)) !== null) {
  const originalEmotion = match[1];
  const mappedEmotion = mapEmotion(originalEmotion);
  
  if (originalEmotion !== mappedEmotion) {
    console.log(`Mapping "${originalEmotion}" to "${mappedEmotion}"`);
    updatedContent = updatedContent.replace(
      `emotion: "${originalEmotion}"`,
      `emotion: "${mappedEmotion}"`
    );
  }
}

// Write the updated content back to the file
fs.writeFileSync(scenesPath, updatedContent);
console.log('Emotions updated successfully!'); 
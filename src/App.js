import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StartScreen from './components/StartScreen';
import CharacterSelect from './components/CharacterSelect';
import GameScreen from './components/GameScreen';
import StoryDebugScreen from './components/StoryDebugScreen';
import EndScreen from './components/EndScreen';
import { characters } from './data/characters';
import { scenes } from './data/scenes';

// Game states
const SCREENS = {
  START: 'start',
  CHARACTER_SELECT: 'character_select',
  GAME: 'game',
  END: 'end'
};

// Group scenes by episode for reference
const episodeData = {
  ep1: {
    title: "Silicon Dreams",
    description: "The Nexus AI team faces a critical juncture as they prepare for a potential acquisition.",
    defaultBackground: "/assets/backgrounds/silicon-valley-aerial.jpg"
  }
};

function App() {
  const [gameState, setGameState] = useState({
    screen: SCREENS.START,
    selectedCharacter: null,
    currentSceneId: "ep1_intro", // Now using sceneId instead of indices
    gameHistory: [],
    relationships: {},
    decisions: {}
  });
  
  const [showDebugTools, setShowDebugTools] = useState(false);
  
  // Add keyboard shortcut to toggle debug mode (Ctrl+Shift+D)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'D' && e.ctrlKey && e.shiftKey) {
        setShowDebugTools(prev => !prev);
        console.log("Debug tools:", !showDebugTools);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDebugTools]);

  const startGame = () => {
    setGameState({
      ...gameState,
      screen: SCREENS.CHARACTER_SELECT
    });
  };

  const selectCharacter = (character) => {
    // Initialize relationships based on the character
    const initialRelationships = {};
    characters.forEach(char => {
      if (char.id !== character.id) {
        initialRelationships[char.id] = char.initialRelationship || 50;
      }
    });

    setGameState({
      ...gameState,
      screen: SCREENS.GAME,
      selectedCharacter: character,
      relationships: initialRelationships,
      currentSceneId: "ep1_intro" // Start at the first scene
    });
  };

  const makeDecision = (sceneId, option) => {
    const currentScene = scenes[sceneId];
    console.log("Making decision in scene:", sceneId, "with option:", option);
    
    // Check if this is the Coming Soon scene
    if (currentScene.isEndScene) {
      setGameState({
        ...gameState,
        screen: SCREENS.END
      });
      return;
    }
    
    // Determine the next scene
    let nextSceneId;
    
    if (option.nextScene) {
      // Use the specific next scene from the option
      nextSceneId = option.nextScene;
    } else if (currentScene.getNextScene && gameState.selectedCharacter) {
      // Use dynamic function to determine next scene based on character
      nextSceneId = currentScene.getNextScene(gameState.selectedCharacter);
    } else if (currentScene.defaultNext) {
      // Use the default next scene
      nextSceneId = currentScene.defaultNext;
    } else {
      // If no next scene is defined, go to Coming Soon
      nextSceneId = "coming_soon";
    }
    
    // Update relationships based on the decision
    const updatedRelationships = { ...gameState.relationships };
    if (option.relationshipEffects) {
      Object.entries(option.relationshipEffects).forEach(([charId, change]) => {
        updatedRelationships[charId] = (updatedRelationships[charId] || 50) + change;
      });
    }
    
    // Add to game history
    const updatedHistory = [
      ...gameState.gameHistory,
      { sceneId, selectedOption: option.id, timestamp: new Date() }
    ];
    
    // Update decisions record
    const updatedDecisions = {
      ...gameState.decisions,
      [sceneId]: option.id
    };
    
    console.log("Moving to next scene:", nextSceneId);
    
    setGameState({
      ...gameState,
      currentSceneId: nextSceneId,
      gameHistory: updatedHistory,
      relationships: updatedRelationships,
      decisions: updatedDecisions
    });
  };

  const getCurrentScene = () => {
    return scenes[gameState.currentSceneId] || null;
  };
  
  const getCurrentEpisodeData = () => {
    const scene = getCurrentScene();
    if (!scene) return null;
    
    return episodeData[scene.episodeId] || null;
  };
  
  // Debug functions
  const jumpToScene = (sceneId) => {
    if (scenes[sceneId]) {
      setGameState({
        ...gameState,
        currentSceneId: sceneId
      });
      console.log("Jumped to scene:", sceneId);
    }
  };
  
  const resetGame = () => {
    setGameState({
      ...gameState,
      currentSceneId: "ep1_intro",
      gameHistory: [],
      decisions: {}
    });
    console.log("Game reset to initial state");
  };
  
  const setCharacter = (character) => {
    setGameState({
      ...gameState,
      selectedCharacter: character
    });
    console.log("Character changed to:", character.name);
  };

  const renderScreen = () => {
    switch (gameState.screen) {
      case SCREENS.START:
        return <StartScreen onStart={startGame} />;
      case SCREENS.CHARACTER_SELECT:
        return <CharacterSelect 
          characters={characters} 
          onSelect={selectCharacter} 
        />;
      case SCREENS.GAME:
        const currentScene = getCurrentScene();
        const episodeInfo = getCurrentEpisodeData();
        
        if (!currentScene || !episodeInfo) {
          return <div>Error: Scene or episode not found</div>;
        }
        
        return <GameScreen 
          episode={episodeInfo}
          scene={currentScene}
          character={gameState.selectedCharacter}
          onDecision={makeDecision}
          relationships={gameState.relationships}
          decisions={gameState.decisions}
        />;
      case SCREENS.END:
        return <EndScreen onRestart={startGame} />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <AppContainer className="app-container">
      {renderScreen()}
      
      {/* Debug Tools Overlay (Ctrl+Shift+D to toggle) */}
      {showDebugTools && (
        <StoryDebugScreen 
          gameState={gameState}
          onJumpToScene={jumpToScene}
          onResetGame={resetGame}
          onSetCharacter={setCharacter}
          characters={characters}
          onClose={() => setShowDebugTools(false)}
        />
      )}
      
      {/* Debug button in corner */}
      <DebugButton 
        onClick={() => setShowDebugTools(prev => !prev)}
        title="Toggle Debug Tools (Ctrl+Shift+D)"
      >
        🛠️
      </DebugButton>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  text-align: center;
  background-color: #000;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DebugButton = styled.button`
  position: fixed;
  bottom: 10px;
  left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(50, 50, 50, 0.7);
  border: 1px solid #444;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 1000;
  
  &:hover {
    background-color: rgba(229, 9, 20, 0.7);
  }
`;

export default App; 
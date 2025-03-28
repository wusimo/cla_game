import React, { useState } from 'react';
import styled from 'styled-components';
import SceneVisualizer from './SceneVisualizer';
import StoryGraphVisualizer from './StoryGraphVisualizer';
import { scenes } from '../data/scenes';

const StoryDebugScreen = ({ 
  gameState, 
  onJumpToScene, 
  onResetGame,
  onSetCharacter,
  characters,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('scene');
  
  const handleJumpToScene = (sceneId) => {
    if (scenes[sceneId]) {
      onJumpToScene(sceneId);
    } else {
      alert(`Scene "${sceneId}" not found!`);
    }
  };
  
  const handleSetCharacter = (characterId) => {
    const character = characters.find(c => c.id === characterId);
    if (character) {
      onSetCharacter(character);
    }
  };
  
  return (
    <DebugScreenOverlay>
      <DebugPanel>
        <DebugHeader>
          <Title>Story Debug Tools</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </DebugHeader>
        
        <TabContainer>
          <TabButton 
            $active={activeTab === 'scene'} 
            onClick={() => setActiveTab('scene')}
          >
            Scene Graph
          </TabButton>
          <TabButton 
            $active={activeTab === 'state'} 
            onClick={() => setActiveTab('state')}
          >
            Game State
          </TabButton>
          <TabButton 
            $active={activeTab === 'tools'} 
            onClick={() => setActiveTab('tools')}
          >
            Debug Tools
          </TabButton>
          <TabButton 
            $active={activeTab === 'graph'} 
            onClick={() => setActiveTab('graph')}
          >
            Story Graph
          </TabButton>
        </TabContainer>
        
        <TabContent>
          {activeTab === 'scene' && (
            <SceneVisualizer 
              scenes={scenes}
              currentSceneId={gameState.currentSceneId}
              onSceneClick={handleJumpToScene}
            />
          )}
          
          {activeTab === 'state' && (
            <StateContainer>
              <StateSection>
                <SectionTitle>Current State</SectionTitle>
                <InfoGrid>
                  <InfoRow>
                    <InfoLabel>Current Scene</InfoLabel>
                    <InfoValue>{gameState.currentSceneId}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Selected Character</InfoLabel>
                    <InfoValue>{gameState.selectedCharacter?.name || 'None'}</InfoValue>
                  </InfoRow>
                  <InfoRow>
                    <InfoLabel>Scene Count</InfoLabel>
                    <InfoValue>{Object.keys(scenes).length}</InfoValue>
                  </InfoRow>
                </InfoGrid>
              </StateSection>
              
              <StateSection>
                <SectionTitle>Relationships</SectionTitle>
                <InfoGrid>
                  {Object.entries(gameState.relationships || {}).map(([charId, value]) => {
                    const character = characters.find(c => c.id === charId);
                    return (
                      <InfoRow key={charId}>
                        <InfoLabel>{character?.name || charId}</InfoLabel>
                        <InfoValue>{value}</InfoValue>
                      </InfoRow>
                    );
                  })}
                </InfoGrid>
              </StateSection>
              
              <StateSection>
                <SectionTitle>Decision History</SectionTitle>
                <InfoGrid>
                  {Object.entries(gameState.decisions || {}).map(([sceneId, decisionId]) => {
                    const scene = scenes[sceneId];
                    const decision = scene?.decisions?.options.find(opt => opt.id === decisionId);
                    return (
                      <InfoRow key={sceneId}>
                        <InfoLabel>{scene?.location || sceneId}</InfoLabel>
                        <InfoValue>{decision?.text || decisionId}</InfoValue>
                      </InfoRow>
                    );
                  })}
                </InfoGrid>
              </StateSection>
            </StateContainer>
          )}
          
          {activeTab === 'tools' && (
            <ToolsContainer>
              <ToolSection>
                <SectionTitle>Character Select</SectionTitle>
                <CharacterSelector>
                  {characters.map(character => (
                    <CharacterOption 
                      key={character.id}
                      $isSelected={gameState.selectedCharacter?.id === character.id}
                      onClick={() => handleSetCharacter(character.id)}
                    >
                      {character.name}
                    </CharacterOption>
                  ))}
                </CharacterSelector>
              </ToolSection>
              
              <ToolSection>
                <SectionTitle>Scene Navigation</SectionTitle>
                <SceneInput>
                  <input 
                    type="text" 
                    placeholder="Enter scene ID to jump to"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleJumpToScene(e.target.value);
                      }
                    }}
                  />
                  <ResetButton onClick={() => onResetGame()}>
                    Reset Game
                  </ResetButton>
                </SceneInput>
              </ToolSection>
            </ToolsContainer>
          )}

          {activeTab === 'graph' && (
            <StoryGraphVisualizer 
              scenes={scenes}
              characters={characters}
              decisions={gameState.decisions}
            />
          )}
        </TabContent>
      </DebugPanel>
    </DebugScreenOverlay>
  );
};

const DebugScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const DebugPanel = styled.div`
  background-color: #111;
  border: 1px solid #333;
  border-radius: 8px;
  width: 90%;
  height: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: white;
`;

const DebugHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #333;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #e50914;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #aaa;
  font-size: 28px;
  cursor: pointer;
  
  &:hover {
    color: white;
  }
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #333;
`;

const TabButton = styled.button`
  background: ${props => props.$active ? 'rgba(229, 9, 20, 0.2)' : 'transparent'};
  border: none;
  border-bottom: 3px solid ${props => props.$active ? '#e50914' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#aaa'};
  padding: 15px 30px;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: white;
  }
`;

const TabContent = styled.div`
  flex-grow: 1;
  overflow: hidden;
  padding: 20px;
`;

// eslint-disable-next-line no-unused-vars
const SceneVisualizerContainer = styled.div`
  height: 100%;
`;

// eslint-disable-next-line no-unused-vars
const StateDisplay = styled.div`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  pre {
    background-color: #1a1a1a;
    padding: 15px;
    border-radius: 6px;
    overflow: auto;
    font-family: monospace;
  }
`;

const StateSection = styled.div`
  margin-bottom: 20px;
`;

const ToolsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ToolSection = styled.div``;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: #e50914;
  margin: 0 0 15px 0;
`;

const CharacterSelector = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const CharacterOption = styled.div`
  background-color: ${props => props.$isSelected ? 'rgba(229, 9, 20, 0.5)' : 'rgba(50, 50, 50, 0.5)'};
  border: 1px solid ${props => props.$isSelected ? '#e50914' : '#444'};
  border-radius: 6px;
  padding: 10px 15px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.$isSelected ? 'rgba(229, 9, 20, 0.7)' : 'rgba(70, 70, 70, 0.7)'};
  }
`;

const SceneInput = styled.div`
  display: flex;
  gap: 10px;
  
  input {
    flex-grow: 1;
    background-color: #222;
    border: 1px solid #444;
    border-radius: 4px;
    color: white;
    padding: 10px 15px;
    font-size: 16px;
    
    &:focus {
      outline: none;
      border-color: #e50914;
    }
  }
`;

const ResetButton = styled.button`
  background-color: #333;
  border: 1px solid #444;
  border-radius: 4px;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  
  &:hover {
    background-color: #e50914;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

const InfoRow = styled.div`
  background-color: rgba(50, 50, 50, 0.5);
  border-radius: 6px;
  padding: 15px;
`;

const InfoLabel = styled.div`
  font-size: 14px;
  color: #aaa;
`;

const InfoValue = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-top: 5px;
`;

const StateContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default StoryDebugScreen; 
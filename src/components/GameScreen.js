import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import DialogueBox from './DialogueBox';
import DecisionPrompt from './DecisionPrompt';
import BackgroundMusic from './BackgroundMusic';
import SoundToggle from './SoundToggle';

const GameScreen = ({ 
  episode, 
  scene, 
  character, 
  onDecision, 
  relationships, 
  decisions 
}) => {
  const [showDecisions, setShowDecisions] = useState(false);
  const [narrativeIndex, setNarrativeIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  // Debug mode is off by default - press Ctrl+D to enable
  const [debugMode, setDebugMode] = useState(false);
  // Audio muting state
  const [audioMuted, setAudioMuted] = useState(false);
  
  // Animation state
  const [activeCharacters, setActiveCharacters] = useState([]);
  const [animationEffect, setAnimationEffect] = useState(null);
  
  // Reset state when scene changes
  useEffect(() => {
    setNarrativeIndex(0);
    setShowDecisions(false);
    setIsTyping(false);
    console.log("Scene changed:", scene?.id);
    
    // Reset animation state
    setActiveCharacters([]);
    setAnimationEffect(null);
  }, [scene]);
  
  // Update active characters based on the current narrative
  useEffect(() => {
    if (scene?.narrative && scene.narrative[narrativeIndex]) {
      const currentDialogue = scene.narrative[narrativeIndex];
      
      // If there's a speaker, add them to the active characters
      if (currentDialogue.speaker) {
        // Determine character position (left, center, right) based on role
        let position = 'center';
        if (currentDialogue.speaker === character.name) {
          position = 'right'; // Player character
        } else if (currentDialogue.speaker === 'Narrator') {
          position = 'none'; // No character for narrator
        } else {
          position = 'left'; // NPCs default to left
        }
        
        // Override position if specified in the narrative
        if (currentDialogue.speakerPosition) {
          position = currentDialogue.speakerPosition;
        }
        
        // Check if there's an emotion specified
        const emotion = currentDialogue.emotion || 'neutral';
        
        // Only update if there's actually a speaker
        if (position !== 'none') {
          setActiveCharacters([{
            name: currentDialogue.speaker,
            position,
            emotion,
            speaking: true,
            animation: currentDialogue.animation || null
          }]);
        } else {
          setActiveCharacters([]);
        }
        
        // Check for scene effect animations
        if (currentDialogue.sceneEffect) {
          setAnimationEffect(currentDialogue.sceneEffect);
        } else {
          setAnimationEffect(null);
        }
      }
    }
  }, [narrativeIndex, scene, character.name]);
  
  // Define the forceNextScene function first, before it's used
  const forceNextScene = useCallback(() => {
    console.log("Force moving to next scene");
    // Create a minimal option object to pass to onDecision
    const dummyOption = {
      id: 'force_next',
      // Use default transition from the scene if available
      nextScene: scene.defaultNext || null
    };
    onDecision(scene.id, dummyOption);
  }, [scene, onDecision]);
  
  // Define the advance narrative handler as a callback
  const handleAdvanceNarrative = useCallback(() => {
    if (narrativeIndex < scene?.narrative?.length - 1) {
      console.log("Advancing narrative to index:", narrativeIndex + 1);
      setNarrativeIndex(prev => prev + 1);
    } else if (!showDecisions && scene?.decisions) {
      console.log("Showing decisions");
      setShowDecisions(true);
    } else if (narrativeIndex === scene?.narrative?.length - 1 && !scene?.decisions) {
      // If at last narrative and no decisions, force next scene
      console.log("No decisions available, attempting to go to next scene");
      forceNextScene();
    }
  }, [narrativeIndex, scene, showDecisions, forceNextScene]);
  
  // Add keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space, right arrow, or enter to advance
      if ((e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Enter') && !isTyping) {
        console.log("Key pressed to advance");
        handleAdvanceNarrative();
      }
      
      // Press 'D' to toggle debug mode
      if (e.key === 'd' && e.ctrlKey) {
        setDebugMode(prev => !prev);
        console.log("Debug mode:", !debugMode);
      }
      
      // Force next scene with Ctrl+N
      if (e.key === 'n' && e.ctrlKey) {
        forceNextScene();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTyping, debugMode, handleAdvanceNarrative, forceNextScene]);
  
  // Auto-progress through narrative blocks with a delay
  useEffect(() => {
    if (narrativeIndex < scene?.narrative?.length - 1) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setNarrativeIndex(prev => prev + 1);
          setIsTyping(false);
        }, 1000); // typing animation duration
      }, 4000); // time to read current block
      
      return () => clearTimeout(timer);
    } else if (narrativeIndex === scene?.narrative?.length - 1 && !showDecisions && scene?.decisions) {
      // Show decisions after last narrative block
      const timer = setTimeout(() => {
        setShowDecisions(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [narrativeIndex, scene, showDecisions]);
  
  const handleDecision = (option) => {
    console.log("Decision made:", option);
    setShowDecisions(false);
    onDecision(scene.id, option);
  };

  const forceShowDecisions = () => {
    console.log("Forcing decisions to show");
    setShowDecisions(true);
  };
  
  // Helper to get character image path
  const getCharacterImagePath = (characterName, emotion = 'neutral') => {
    // Convert to lowercase, remove spaces for file path
    const normalizedName = characterName.toLowerCase().replace(/\s+/g, '-');
    return `/assets/characters/${normalizedName}-${emotion}.png`;
  };
  
  if (!scene || !episode) {
    return <div>Loading scene data...</div>;
  }
  
  return (
    <GameScreenContainer 
      $backgroundImage={scene.background || episode.defaultBackground}
      className="fade-in"
    >
      {/* Add Background Music component */}
      <BackgroundMusic sceneId={scene.id} muted={audioMuted} />
      
      {/* Add Sound Toggle component */}
      <SoundToggle muted={audioMuted} onToggle={() => setAudioMuted(!audioMuted)} />
      
      <SceneHeader>
        <EpisodeTitle>{episode.title}</EpisodeTitle>
        <SceneLocation>{scene.location}</SceneLocation>
      </SceneHeader>
      
      {/* Character Animation Layer */}
      <CharacterLayer>
        {activeCharacters.map((char, index) => (
          <CharacterSprite 
            key={`${char.name}-${index}`}
            $position={char.position}
            $isSpeaking={char.speaking}
            $animation={char.animation}
          >
            <img 
              src={getCharacterImagePath(char.name, char.emotion)}
              alt={`${char.name} (${char.emotion})`}
            />
          </CharacterSprite>
        ))}
      </CharacterLayer>
      
      {/* Scene Effects Layer */}
      {animationEffect && (
        <SceneEffectLayer 
          className={`effect-${animationEffect}`}
          $effectType={animationEffect}
        />
      )}
      
      {scene.narrative && scene.narrative[narrativeIndex] && (
        <DialogueBox 
          narrative={scene.narrative[narrativeIndex]} 
          isTyping={isTyping}
          onAdvance={handleAdvanceNarrative}
        />
      )}
      
      {showDecisions && scene.decisions && (
        <DecisionPrompt 
          decisions={scene.decisions} 
          onSelect={handleDecision}
          character={character}
        />
      )}
      
      <CharacterInfo>
        <CharacterAvatar src={character.image} alt={character.name} />
        <CharacterName>{character.name}</CharacterName>
      </CharacterInfo>

      {/* Debug controls - press Ctrl+D to show */}
      {debugMode && (
        <DebugPanel>
          <DebugTitle>Debug Controls</DebugTitle>
          <DebugText>Scene ID: {scene.id}</DebugText>
          <DebugText>Narrative Index: {narrativeIndex} / {scene.narrative?.length - 1}</DebugText>
          <DebugText>Showing Decisions: {showDecisions ? 'Yes' : 'No'}</DebugText>
          <DebugText>Is Typing: {isTyping ? 'Yes' : 'No'}</DebugText>
          <DebugText>Default Next: {scene.defaultNext || 'None'}</DebugText>
          <DebugText>Has Custom Next: {scene.getNextScene ? 'Yes' : 'No'}</DebugText>
          <DebugText>Active Characters: {activeCharacters.length}</DebugText>
          <DebugText>Scene Effect: {animationEffect || 'None'}</DebugText>
          
          <DebugActions>
            <DebugButton onClick={() => setNarrativeIndex(prev => Math.max(0, prev - 1))}>
              ⬅️ Prev Text
            </DebugButton>
            <DebugButton onClick={() => setNarrativeIndex(prev => Math.min(scene.narrative.length - 1, prev + 1))}>
              Next Text ➡️
            </DebugButton>
          </DebugActions>
          
          <DebugActions>
            <DebugButton onClick={forceShowDecisions} disabled={!scene?.decisions}>
              Show Decisions
            </DebugButton>
            <DebugButton onClick={forceNextScene} style={{ backgroundColor: '#ff4500' }}>
              Force Next Scene ⏭️
            </DebugButton>
          </DebugActions>
          
          <DebugTitle style={{ marginTop: '10px' }}>Scene Tree</DebugTitle>
          <DebugSceneTree>
            <div>Current: <strong>{scene.id}</strong></div>
            {scene.defaultNext && <div>Default: <strong>{scene.defaultNext}</strong></div>}
            {scene.decisions && scene.decisions.options && (
              <div>
                <div>Decision Paths:</div>
                {scene.decisions.options.map(option => (
                  <div key={option.id}>• {option.id} → {option.nextScene || 'default'}</div>
                ))}
              </div>
            )}
          </DebugSceneTree>
        </DebugPanel>
      )}
      
      <KeyboardHelp>
        Press <KeyboardKey>Space</KeyboardKey> or <KeyboardKey>→</KeyboardKey> to advance | 
        <KeyboardKey>Ctrl</KeyboardKey>+<KeyboardKey>D</KeyboardKey> for debug | 
        <KeyboardKey>Ctrl</KeyboardKey>+<KeyboardKey>N</KeyboardKey> force next scene
      </KeyboardHelp>
    </GameScreenContainer>
  );
};

const GameScreenContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: ${props => props.$backgroundImage 
    ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${props.$backgroundImage})`
    : 'black'};
  background-size: cover;
  background-position: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SceneHeader = styled.div`
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
`;

const EpisodeTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  color: #e50914;
`;

const SceneLocation = styled.h3`
  font-size: 1rem;
  margin: 0.3rem 0 0;
  font-weight: 300;
`;

// Character Animation Layer
const CharacterLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; // Allow clicks to pass through
  z-index: 5;
`;

const CharacterSprite = styled.div`
  position: absolute;
  bottom: 25%; // Position above dialogue box, slightly higher
  // Position based on the character's position prop
  left: ${props => {
    if (props.$position === 'left') return '10%';
    if (props.$position === 'center') return '50%';
    if (props.$position === 'right') return '70%';
    return '50%';
  }};
  transform-origin: bottom center;
  transform: ${props => {
    // Base transform with scaling
    const scale = 'scale(1.2)';
    
    // Position adjustments
    if (props.$position === 'center') return `${scale} translateX(-40%)`;
    if (props.$position === 'right') return `${scale} translateX(-40%)`;
    return scale;
  }};
  
  // Apply animation based on the animation prop
  animation: ${props => {
    if (props.$animation === 'bounce') return 'bounce 0.5s infinite alternate';
    if (props.$animation === 'shake') return 'shake 0.5s infinite';
    if (props.$animation === 'fadeIn') return 'fadeIn 0.5s forwards';
    if (props.$isSpeaking) return 'speakingPulse 2s infinite';
    return 'none';
  }};
  
  // Size and styling
  max-height: 75vh;
  max-width: 35vw;
  
  img {
    height: 100%;
    max-height: 75vh;
    object-fit: contain;
    filter: ${props => props.$isSpeaking ? 'brightness(1.3)' : 'brightness(0.8)'};
    transition: filter 0.3s ease;
  }
  
  @keyframes speakingPulse {
    0%, 100% { transform: scale(1.2) translateY(0); }
    50% { transform: scale(1.2) translateY(-5px); }
  }
  
  @keyframes bounce {
    0% { transform: scale(1.2) translateY(0); }
    100% { transform: scale(1.2) translateY(-20px); }
  }
  
  @keyframes shake {
    0%, 100% { transform: scale(1.2) translateX(0); }
    25% { transform: scale(1.2) translateX(-5px); }
    75% { transform: scale(1.2) translateX(5px); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(1.2); }
    to { opacity: 1; transform: scale(1.2); }
  }
`;

// Scene effect layer for full-screen animations
const SceneEffectLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  
  &.effect-flashRed {
    animation: flashRed 0.5s;
    background-color: rgba(255, 0, 0, 0);
  }
  
  &.effect-shake {
    animation: sceneShake 0.5s;
  }
  
  &.effect-fadeToBlack {
    animation: fadeToBlack 2s forwards;
    background-color: rgba(0, 0, 0, 0);
  }
  
  @keyframes flashRed {
    0%, 100% { background-color: rgba(255, 0, 0, 0); }
    50% { background-color: rgba(255, 0, 0, 0.3); }
  }
  
  @keyframes sceneShake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-10px); }
    40% { transform: translateX(10px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
  
  @keyframes fadeToBlack {
    from { background-color: rgba(0, 0, 0, 0); }
    to { background-color: rgba(0, 0, 0, 1); }
  }
`;

const CharacterInfo = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.7rem;
  border-radius: 30px;
`;

const CharacterAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #e50914;
`;

const CharacterName = styled.span`
  margin-left: 0.7rem;
  font-weight: bold;
  font-size: 1.1rem;
`;

const DebugPanel = styled.div`
  position: absolute;
  top: 70px;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #e50914;
  border-radius: 8px;
  padding: 1rem;
  z-index: 1000;
  min-width: 250px;
  max-height: 80vh;
  overflow-y: auto;
`;

const DebugTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #e50914;
  font-size: 1rem;
  text-align: center;
`;

const DebugText = styled.p`
  margin: 5px 0;
  font-size: 0.9rem;
  color: #ddd;
`;

const DebugActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 5px;
`;

const DebugButton = styled.button`
  background: rgba(229, 9, 20, 0.7);
  border: none;
  border-radius: 4px;
  color: white;
  padding: 5px;
  flex: 1;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background: rgba(229, 9, 20, 1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DebugSceneTree = styled.div`
  background: rgba(40, 40, 40, 0.7);
  border-radius: 4px;
  padding: 8px;
  margin-top: 5px;
  font-size: 0.8rem;
  
  div {
    margin: 3px 0;
  }
`;

const KeyboardHelp = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  color: #ddd;
`;

const KeyboardKey = styled.span`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  padding: 2px 5px;
  margin: 0 3px;
  font-family: monospace;
`;

export default GameScreen; 
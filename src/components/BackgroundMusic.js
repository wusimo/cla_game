import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const BackgroundMusic = ({ sceneId, muted = false }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [trackError, setTrackError] = useState(false);
  const audioRef = useRef(null);
  const DEFAULT_TRACK = '/assets/music/office-ambience.mp3';

  // Map scenes to music tracks
  const getMusicForScene = (sceneId) => {
    // Episode 1 music mapping - more specific matches first
    
    // Intro scenes
    if (sceneId.startsWith('ep1_intro') || sceneId.startsWith('ep1_office_exterior')) {
      return '/assets/music/intro-theme.mp3';
    }
    
    // Dramatic/tense scenes
    else if (
      sceneId.includes('_tense_') || 
      sceneId.includes('_strained_') ||
      sceneId.includes('demo_day') ||
      sceneId.includes('demo_pressure') ||
      sceneId.includes('_multitask')
    ) {
      return '/assets/music/dramatic-presentation.mp3';
    }
    
    // Meeting/conversation scenes
    else if (
      sceneId.includes('meeting') || 
      sceneId.includes('conversation') || 
      sceneId.includes('investor_')
    ) {
      return '/assets/music/meeting-tense.mp3';
    }
    
    // Ending scenes
    else if (sceneId.includes('_ending_')) {
      return '/assets/music/resolution-theme.mp3';
    }
    
    // Planning/working scenes
    else if (
      sceneId.includes('_planning') ||
      sceneId.includes('_collaborate') ||
      sceneId.includes('_team')
    ) {
      // Use office ambience for the default planning scenes
      return DEFAULT_TRACK;
    }
    
    // Default office ambience for any other scenes
    else {
      return DEFAULT_TRACK;
    }
  };

  // Clear error after 5 seconds
  useEffect(() => {
    if (trackError) {
      const timer = setTimeout(() => {
        setTrackError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [trackError]);

  useEffect(() => {
    const newTrack = getMusicForScene(sceneId);
    setTrackError(false);
    
    // Only change if the track is different
    if (newTrack !== currentTrack) {
      setCurrentTrack(newTrack);
      
      if (audioRef.current) {
        // Fade out current track
        const fadeOut = setInterval(() => {
          if (audioRef.current.volume > 0.1) {
            audioRef.current.volume -= 0.1;
          } else {
            audioRef.current.pause();
            audioRef.current.src = newTrack;
            audioRef.current.volume = 0;
            
            // Try to play the new track
            audioRef.current.play()
              .catch(e => {
                console.log('Audio playback error:', e);
                setTrackError(true);
                // Fall back to the default track if there's an error
                if (newTrack !== DEFAULT_TRACK) {
                  audioRef.current.src = DEFAULT_TRACK;
                  audioRef.current.play().catch(err => console.log('Default track error:', err));
                }
              });
            
            // Fade in new track
            const fadeIn = setInterval(() => {
              if (audioRef.current.volume < 0.9) {
                audioRef.current.volume += 0.1;
              } else {
                clearInterval(fadeIn);
              }
            }, 100);
            
            clearInterval(fadeOut);
          }
        }, 100);
      }
    }
  }, [sceneId, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : 0.7;
    }
  }, [muted]);

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack}
        loop
        autoPlay
        style={{ display: 'none' }}
        onError={() => {
          console.log('Error loading audio track:', currentTrack);
          setTrackError(true);
          // Fall back to default track
          if (currentTrack !== DEFAULT_TRACK && audioRef.current) {
            audioRef.current.src = DEFAULT_TRACK;
            audioRef.current.play().catch(e => console.log('Default track error:', e));
          }
        }}
        onCanPlayThrough={() => {
          if (audioRef.current) {
            audioRef.current.volume = muted ? 0 : 0.7;
          }
        }}
      />
      
      {trackError && (
        <ErrorNotification>
          <span role="img" aria-label="Warning">⚠️</span> Audio error - Using fallback track
        </ErrorNotification>
      )}
    </>
  );
};

const ErrorNotification = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #e50914;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.9rem;
  z-index: 1000;
  animation: fadeInOut 5s forwards;
  
  @keyframes fadeInOut {
    0% { opacity: 0; }
    10% { opacity: 1; }
    80% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

export default BackgroundMusic; 
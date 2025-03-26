import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { scenes } from '../data/scenes';

const SceneVisualizer = ({ currentSceneId, onSceneSelect }) => {
  const [filter, setFilter] = useState('');
  const [expandedScenes, setExpandedScenes] = useState({});
  
  // Expand current scene by default
  useEffect(() => {
    if (currentSceneId) {
      setExpandedScenes(prev => ({
        ...prev,
        [currentSceneId]: true
      }));
    }
  }, [currentSceneId]);
  
  const toggleSceneExpanded = (sceneId) => {
    setExpandedScenes(prev => ({
      ...prev,
      [sceneId]: !prev[sceneId]
    }));
  };
  
  // Build the scene graph to show relationships
  const buildSceneGraph = () => {
    const graph = {};
    
    // First pass: collect all scenes and their direct connections
    Object.values(scenes).forEach(scene => {
      if (!graph[scene.id]) {
        graph[scene.id] = { scene, connections: [] };
      }
      
      // Add default next
      if (scene.defaultNext) {
        graph[scene.id].connections.push({
          type: 'default',
          targetId: scene.defaultNext
        });
      }
      
      // Add decision paths
      if (scene.decisions && scene.decisions.options) {
        scene.decisions.options.forEach(option => {
          if (option.nextScene) {
            graph[scene.id].connections.push({
              type: 'decision',
              decisionId: option.id,
              targetId: option.nextScene
            });
          }
        });
      }
    });
    
    return graph;
  };
  
  const sceneGraph = buildSceneGraph();
  
  // Filter scenes based on search
  const filteredScenes = Object.values(sceneGraph)
    .filter(({ scene }) => {
      if (!filter) return true;
      
      const searchLower = filter.toLowerCase();
      return (
        scene.id.toLowerCase().includes(searchLower) || 
        scene.location?.toLowerCase().includes(searchLower) ||
        JSON.stringify(scene).toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => a.scene.id.localeCompare(b.scene.id));
  
  return (
    <VisualizerContainer>
      <VisualizerHeader>
        <h2>Scene Visualizer</h2>
        <SearchInput 
          type="text" 
          placeholder="Search scenes..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <TotalCount>{filteredScenes.length} scenes</TotalCount>
      </VisualizerHeader>
      
      <SceneList>
        {filteredScenes.map(({ scene, connections }) => (
          <SceneItem 
            key={scene.id} 
            $isActive={scene.id === currentSceneId}
            $isExpanded={expandedScenes[scene.id]}
          >
            <SceneHeader onClick={() => toggleSceneExpanded(scene.id)}>
              <ExpandIcon>{expandedScenes[scene.id] ? '▼' : '►'}</ExpandIcon>
              <SceneTitle 
                onClick={(e) => {
                  e.stopPropagation();
                  onSceneSelect && onSceneSelect(scene.id);
                }}
              >
                {scene.id}
              </SceneTitle>
              <SceneLocation>{scene.location}</SceneLocation>
            </SceneHeader>
            
            {expandedScenes[scene.id] && (
              <SceneDetails>
                <SceneDataRow>
                  <Label>Location:</Label>
                  <Value>{scene.location}</Value>
                </SceneDataRow>
                
                <SceneDataRow>
                  <Label>Background:</Label>
                  <Value>{scene.background || 'Default'}</Value>
                </SceneDataRow>
                
                <SceneDataRow>
                  <Label>Narrative:</Label>
                  <Value>{scene.narrative?.length || 0} lines</Value>
                </SceneDataRow>
                
                {connections.length > 0 && (
                  <ConnectionsSection>
                    <SectionTitle>Connections:</SectionTitle>
                    {connections.map((conn, idx) => (
                      <ConnectionItem key={idx}>
                        {conn.type === 'default' ? (
                          <DefaultConnection>
                            Default → <ConnectionTarget 
                              onClick={() => onSceneSelect && onSceneSelect(conn.targetId)}
                            >
                              {conn.targetId}
                            </ConnectionTarget>
                          </DefaultConnection>
                        ) : (
                          <DecisionConnection>
                            Decision <DecisionId>"{conn.decisionId}"</DecisionId> → 
                            <ConnectionTarget 
                              onClick={() => onSceneSelect && onSceneSelect(conn.targetId)}
                            >
                              {conn.targetId}
                            </ConnectionTarget>
                          </DecisionConnection>
                        )}
                      </ConnectionItem>
                    ))}
                  </ConnectionsSection>
                )}
                
                {connections.length === 0 && (
                  <NoConnections>No outgoing connections (dead end)</NoConnections>
                )}
              </SceneDetails>
            )}
          </SceneItem>
        ))}
      </SceneList>
    </VisualizerContainer>
  );
};

const VisualizerContainer = styled.div`
  background-color: #111;
  color: white;
  border: 1px solid #333;
  border-radius: 6px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const VisualizerHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  gap: 15px;
  
  h2 {
    margin: 0;
    font-size: 18px;
    flex-shrink: 0;
  }
`;

const SearchInput = styled.input`
  background: #222;
  border: 1px solid #444;
  border-radius: 4px;
  color: white;
  padding: 8px 12px;
  font-size: 14px;
  flex-grow: 1;
  
  &:focus {
    outline: none;
    border-color: #e50914;
  }
`;

const TotalCount = styled.div`
  font-size: 14px;
  color: #aaa;
`;

const SceneList = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  padding: 5px;
`;

const SceneItem = styled.div`
  margin: 5px 0;
  border: 1px solid ${props => props.$isActive ? '#e50914' : '#333'};
  border-radius: 4px;
  overflow: hidden;
  background-color: ${props => props.$isActive ? 'rgba(229, 9, 20, 0.1)' : '#1a1a1a'};
`;

const SceneHeader = styled.div`
  padding: 8px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const ExpandIcon = styled.span`
  font-size: 10px;
  margin-right: 8px;
  color: #aaa;
`;

const SceneTitle = styled.div`
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    color: #e50914;
    text-decoration: underline;
  }
`;

const SceneLocation = styled.div`
  margin-left: auto;
  font-size: 14px;
  color: #aaa;
  max-width: 40%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const SceneDetails = styled.div`
  padding: 10px 15px;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.2);
  border-top: 1px solid #333;
`;

const SceneDataRow = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Label = styled.div`
  width: 100px;
  color: #aaa;
`;

const Value = styled.div`
  flex-grow: 1;
`;

const ConnectionsSection = styled.div`
  margin-top: 10px;
`;

const SectionTitle = styled.div`
  color: #aaa;
  margin-bottom: 5px;
`;

const ConnectionItem = styled.div`
  margin: 5px 0 5px 10px;
  padding: 5px;
  border-left: 2px solid #444;
`;

const DefaultConnection = styled.div`
  color: #aaa;
`;

const DecisionConnection = styled.div`
  color: #aaa;
`;

const DecisionId = styled.span`
  color: #29b6f6;
`;

const ConnectionTarget = styled.span`
  color: #e50914;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const NoConnections = styled.div`
  color: #ff9800;
  margin-top: 10px;
`;

export default SceneVisualizer; 
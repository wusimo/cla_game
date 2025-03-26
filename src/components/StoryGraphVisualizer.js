import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const StoryGraphVisualizer = ({ scenes, characters, decisions }) => {
  const svgRef = useRef();
  const width = 1200;
  const height = 800;

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    // Create a hierarchical structure from scenes
    const createTreeData = () => {
      const root = {
        id: 'root',
        name: 'Story Start',
        children: []
      };

      // Find the intro scene
      const introScene = Object.entries(scenes).find(([, scene]) => 
        scene.id === 'ep1_intro'
      );

      if (introScene) {
        const [, scene] = introScene;
        root.children.push(createSceneNode(scene));
      }

      return root;
    };

    const createSceneNode = (scene) => {
      const node = {
        id: scene.id,
        name: scene.location || scene.id,
        type: 'scene',
        color: scene.isEndScene ? '#666' : '#4285f4',
        children: []
      };

      // Add decision branches
      if (scene.decisions && scene.decisions.options) {
        scene.decisions.options.forEach(option => {
          if (option.nextScene && scenes[option.nextScene]) {
            const nextScene = scenes[option.nextScene];
            const childNode = createSceneNode(nextScene);
            childNode.decision = option.text;
            node.children.push(childNode);
          }
        });
      }

      // Add default next scene if no decisions
      if (scene.defaultNext && scenes[scene.defaultNext] && (!scene.decisions || !scene.decisions.options)) {
        const nextScene = scenes[scene.defaultNext];
        const childNode = createSceneNode(nextScene);
        childNode.decision = 'Continue';
        node.children.push(childNode);
      }

      // If this node has no children and isn't the Coming Soon scene, add it
      if (node.children.length === 0 && !scene.isEndScene) {
        node.children.push({
          id: 'coming_soon',
          name: 'Coming Soon',
          type: 'scene',
          color: '#666',
          decision: 'Continue Story',
          children: []
        });
      }

      return node;
    };

    const treeData = createTreeData();

    // Create the tree layout with more space between nodes
    const treeLayout = d3.tree()
      .size([height - 100, width - 200])
      .separation((a, b) => {
        // Add more separation between nodes
        return (a.parent === b.parent ? 1.5 : 2);
      });

    // Create the root node
    const root = d3.hierarchy(treeData);

    // Compute the tree layout
    const treeNodes = treeLayout(root);

    // Create the SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create a container group for zooming
    const g = svg.append('g')
      .attr('transform', `translate(100,50)`);

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    // Apply zoom behavior to svg
    svg.call(zoom);

    // Create links
    g.selectAll('.link')
      .data(treeNodes.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#666')
      .attr('stroke-width', 2)
      .attr('d', d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));

    // Create nodes
    const node = g.selectAll('.node')
      .data(treeNodes.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    // Add circles for nodes
    node.append('circle')
      .attr('r', 10)
      .attr('fill', d => d.data.color || '#4285f4')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Add labels for nodes
    node.append('text')
      .attr('dy', 4)
      .attr('x', d => d.children ? -12 : 12)
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .attr('fill', '#fff')
      .attr('font-size', '12px')
      .text(d => d.data.name);

    // Add decision labels
    node.filter(d => d.data.decision)
      .append('text')
      .attr('dy', -8)
      .attr('x', 0)
      .attr('text-anchor', 'middle')
      .attr('fill', '#4285f4')
      .attr('font-size', '10px')
      .text(d => d.data.decision);

    // Add character icons for scenes
    node.filter(d => d.data.type === 'scene')
      .each(function(d) {
        const scene = scenes[d.data.id];
        if (scene && scene.narrative) {
          const speakers = new Set();
          scene.narrative.forEach(narrative => {
            if (narrative.speaker && narrative.speaker !== 'Narrator') {
              speakers.add(narrative.speaker);
            }
          });

          const characterGroup = d3.select(this)
            .append('g')
            .attr('class', 'characters')
            .attr('transform', 'translate(0, 15)');

          speakers.forEach((speaker, index) => {
            const character = characters.find(c => c.name === speaker);
            if (character) {
              characterGroup.append('circle')
                .attr('cx', index * 12 - (speakers.size - 1) * 6)
                .attr('cy', 0)
                .attr('r', 4)
                .attr('fill', character.hidden ? '#666' : '#e50914')
                .attr('stroke', '#fff')
                .attr('stroke-width', 1);
            }
          });
        }
      });

  }, [scenes, characters, decisions]);

  return (
    <GraphContainer>
      <GraphTitle>Story Decision Tree</GraphTitle>
      <Legend>
        <LegendItem>
          <LegendColor style={{ backgroundColor: '#4285f4' }} />
          <span>Scenes</span>
        </LegendItem>
        <LegendItem>
          <LegendColor style={{ backgroundColor: '#e50914' }} />
          <span>Playable Characters</span>
        </LegendItem>
        <LegendItem>
          <LegendColor style={{ backgroundColor: '#666' }} />
          <span>Supporting Characters</span>
        </LegendItem>
        <LegendItem>
          <LegendColor style={{ backgroundColor: '#34a853' }} />
          <span>Decision Paths</span>
        </LegendItem>
      </Legend>
      <GraphControls>
        <ControlButton onClick={() => {
          const svg = d3.select(svgRef.current);
          const transform = d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(1);
          svg.transition()
            .duration(750)
            .call(d3.zoom().transform, transform);
        }}>
          Reset View
        </ControlButton>
      </GraphControls>
      <GraphSvg ref={svgRef} />
    </GraphContainer>
  );
};

const GraphContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  overflow: hidden;
`;

const GraphTitle = styled.h2`
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 14px;
`;

const LegendColor = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #fff;
`;

const GraphControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const GraphSvg = styled.svg`
  width: 100%;
  height: 800px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export default StoryGraphVisualizer; 
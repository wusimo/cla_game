# Crazy, Lost, Asians - Interactive Movie Game

An interactive storytelling experience based on the "Crazy, Lost, Asians" script. This game lets players step into the roles of different characters and make critical decisions that affect the storyline.

![Game Preview](https://via.placeholder.com/800x400?text=Crazy+Lost+Asians+Game+Preview)

## Overview

Set in the fast-paced world of Silicon Valley tech startups, this interactive movie game follows the story of Wei Zhang and Kevin Liu, co-founders of Nexus AI, as they navigate a critical moment in their company's journey. Players can choose different characters and experience the story from multiple perspectives, making choices that affect relationships, business outcomes, and personal stories.

### Key Features

- **Character-based Gameplay**: Choose from four distinct characters, each with their own perspective and storyline
- **Consequential Choices**: Every decision shapes relationships and storylines with multiple possible outcomes
- **Cinematic Experience**: Immersive visual storytelling with atmospheric backgrounds and character portraits
- **Episode-based Structure**: The story unfolds across multiple episodes, with Episode 1: "Silicon Dreams" currently available

## Getting Started

### Installation and Setup

See [SETUP.md](SETUP.md) for detailed installation and setup instructions.

```bash
# Quick start (after cloning repository)
npm install
npm start
```

### Visual Assets Creation

See [VISUAL_ASSETS.md](VISUAL_ASSETS.md) for guidance on creating and implementing the visual elements needed for the game.

## Game Structure

The game is built with React and follows a component-based architecture:

- **StartScreen**: The initial screen that introduces the game
- **CharacterSelect**: Where players choose which character to play as
- **GameScreen**: The main game interface that displays scenes and decisions
- **DialogueBox**: Displays narrative text and character dialogue
- **DecisionPrompt**: Presents choices to the player

The game state is managed in the App component, tracking:
- Current episode and scene
- Selected character
- Decision history
- Character relationships

## Story Background

"Crazy, Lost, Asians" follows the journey of four interconnected characters in Silicon Valley's tech scene:

- **Wei Zhang**: The technical genius behind Nexus AI, struggling with work-life balance
- **Kevin Liu**: The charismatic business mind who excels at making deals
- **Sophia Liu**: Kevin's ambitious wife who is focused on maintaining their perfect life
- **Melissa Zhang**: Wei's supportive yet increasingly frustrated wife

As the story unfolds, players navigate personal dilemmas, business challenges, and relationship dynamics, with each decision potentially leading to different outcomes.

## Development

### Customizing and Extending

The game can be easily extended with:
- New characters in `src/data/characters.js`
- Additional episodes and scenes in `src/data/episodes.js`
- Custom visual assets in the appropriate directories

### Technology Stack

- **React**: Front-end library for building the user interface
- **Styled Components**: For component-specific styling
- **JavaScript**: Core programming language

### Alternative Implementations

For a more advanced implementation with additional visual features, consider using Unity. See [VISUAL_ASSETS.md](VISUAL_ASSETS.md) for more information.

## License

This project is for educational and entertainment purposes.

## Credits

- Script and concept: Developed from the original "CRAZY, LOST, ASIANS" screenplay
- Game Framework: [Your Name/Organization] 

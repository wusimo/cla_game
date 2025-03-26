# Setup Instructions for Crazy, Lost, Asians Game

This document provides instructions for setting up and running the interactive movie game.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

1. Clone this repository or download the project files.

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the game.

## Creating Assets

Before the game can be fully playable, you'll need to create or gather visual assets:

1. See the `VISUAL_ASSETS.md` file for detailed instructions on creating game assets.

2. Place all assets in the appropriate directories under `/public/assets/`:
   - Character portraits in `/public/assets/characters/`
   - Background scenes in `/public/assets/backgrounds/`
   - UI elements in `/public/assets/ui/`

3. Make sure the filenames match those referenced in the code (e.g., `wei-zhang.jpg`, `silicon-valley-aerial.jpg`).

## Game Structure

The game is built with React and follows this structure:

- `src/components/`: React components for different game screens
- `src/data/`: Data files containing story content, character info, etc.
- `public/assets/`: Game assets (images, sounds, etc.)

## Customizing the Game

### Adding Characters

1. Edit `src/data/characters.js` to add new characters.
2. Add corresponding character portraits to `/public/assets/characters/`.

### Adding Episodes and Scenes

1. Edit `src/data/episodes.js` to add new episodes and scenes.
2. Each scene requires:
   - Unique ID
   - Location
   - Background image
   - Narrative elements (text, dialogue)
   - Decision options (if applicable)

### Customizing Visuals

1. Edit CSS in the styled components to change the look and feel.
2. Replace visual assets with your own to match your desired aesthetic.

## Building for Production

To create a production build:

```
npm run build
```

This will create optimized files in the `build` folder that can be deployed to a web server.

## Alternative: Unity Implementation

For a more advanced implementation with additional visual features:

1. See the "Alternative Approach: Unity Implementation" section in `VISUAL_ASSETS.md`
2. The file structure for game data (episodes, scenes, characters) can be adapted for Unity.
3. Unity would provide more options for animations, transitions, and more interactive elements. 
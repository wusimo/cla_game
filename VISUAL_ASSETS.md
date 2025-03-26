# Visual Assets for Crazy, Lost, Asians

This document provides guidelines for creating the visual assets needed for the game.

## Required Assets

### 1. Character Portraits
- Four main character portraits (Wei, Kevin, Sophia, Melissa)
- Additional supporting character portraits (Charles Westbrook, etc.)
- Size: 512x512 pixels minimum, PNG format with transparency

### 2. Background Scenes
- Silicon Valley Aerial View
- Modest Office Building Exterior
- Nexus AI Office Interior
- Conference Room
- Kevin's Tesla Interior
- Wei's Apartment
- Mansion in Atherton (Sophia and Kevin's home)
- And more as needed for additional scenes

### 3. UI Elements
- Game logo
- Button styles
- Dialog boxes
- Decision interfaces

## Tools for Creating Visual Assets

### 1. Blender
Blender can be used to create 3D character models and render scene backgrounds:
- Download Blender from [blender.org](https://www.blender.org/)
- Create simple 3D environments for each scene
- Render still images for background scenes
- Consider using basic character models for consistent character portraits

### 2. Midjourney or DALL-E
AI image generation tools can help create photorealistic assets:
- Use specific prompts describing each character and scene
- Example prompt: "Professional headshot portrait of an Asian tech CEO in his 30s, intense eyes, disheveled look, has been working all night, dark circles, wearing a hoodie, startup office background, dramatic lighting"
- Refine prompts until you get images that match the characters' descriptions

### 3. Adobe Photoshop/GIMP
For editing and refining images:
- Adjust colors for consistent visual style
- Create transparent backgrounds for character portraits
- Resize and optimize images for web

### 4. Canva or Figma
For UI elements:
- Design consistent interface elements
- Create button styles
- Design dialogue boxes and decision interfaces

## Visual Style Guidelines

### 1. Color Palette
- Primary: Dark backgrounds (#000000, #121212)
- Accent: Red highlight color (#e50914) - used for important buttons and emphasis
- Text: White/light gray for readability (#ffffff, #cccccc)
- UI Elements: Dark grays with subtle transparency (#222222 with 80% opacity)

### 2. Character Style
- Realistic portrait style
- Consistent lighting across character portraits
- Expressions should match character personalities
- Consider including multiple expressions for each character (neutral, happy, angry, etc.)

### 3. Backgrounds
- Cinematic style with dramatic lighting
- Depth of field effects to focus attention
- Consistent time of day within connected scenes
- Realistic but slightly stylized to match the tone

## Asset Organization

Store assets in the following directory structure:
```
/public/assets/
  /backgrounds/
    silicon-valley-aerial.jpg
    modest-office-building.jpg
    nexus-office-interior.jpg
    ...
  /characters/
    wei-zhang.jpg
    kevin-liu.jpg
    sophia-liu.jpg
    melissa-zhang.jpg
    ...
  /ui/
    logo.png
    buttons.png
    dialogue-box.png
    ...
```

## Alternative Approach: Unity Implementation

For a more advanced and immersive experience, consider implementing in Unity:

1. Set up a Unity project (2D template)
2. Import all visual assets 
3. Use Unity's Timeline feature for scene transitions
4. Implement dialogue system (consider using "Dialogue System for Unity" from the Asset Store)
5. Create UI elements using Unity's Canvas system
6. Build for WebGL to make it playable in browsers

Unity would allow for more animation, transitions effects, and potentially more immersive gameplay mechanics, but would require more technical expertise than the web-based approach. 
/**
 * This file contains helper functions to create placeholder images
 * Use this until you have real assets for your game
 */

// Function to create a colored rectangle with text
function createPlaceholderImage(text, width, height, bgColor) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = bgColor || '#333';
  ctx.fillRect(0, 0, width, height);
  
  // Text
  ctx.fillStyle = '#fff';
  ctx.font = Math.floor(height / 10) + 'px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Split text by newlines and render each line
  const lines = text.split('\n');
  const lineHeight = Math.floor(height / 10) * 1.2;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;
  
  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + index * lineHeight);
  });
  
  return canvas.toDataURL('image/png');
}

// Function to create missing icons
function createMissingIcons() {
  // Create logo192.png
  const logo192Link = document.createElement('link');
  logo192Link.rel = 'icon';
  logo192Link.href = createPlaceholderImage('CLA\n192', 192, 192, '#e50914');
  logo192Link.as = 'image';
  logo192Link.type = 'image/png';
  logo192Link.sizes = '192x192';
  document.head.appendChild(logo192Link);
  
  // Create logo512.png
  const logo512Link = document.createElement('link');
  logo512Link.rel = 'icon';
  logo512Link.href = createPlaceholderImage('CLA\n512', 512, 512, '#e50914');
  logo512Link.as = 'image';
  logo512Link.type = 'image/png';
  logo512Link.sizes = '512x512';
  document.head.appendChild(logo512Link);
  
  // Create favicon if missing
  if (!document.querySelector('link[rel="icon"]').href) {
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.href = createPlaceholderImage('CLA', 64, 64, '#e50914');
    document.head.appendChild(faviconLink);
  }
  
  window.debugGame && window.debugGame('Created missing icon files');
}

// Create placeholder images when real ones don't exist
window.addEventListener('load', () => {
  // Create missing icons first
  createMissingIcons();
  
  // Character placeholders
  const characters = [
    { id: 'wei-zhang', name: 'Wei Zhang', color: '#4285F4' },
    { id: 'kevin-liu', name: 'Kevin Liu', color: '#EA4335' },
    { id: 'sophia-liu', name: 'Sophia Liu', color: '#FBBC05' },
    { id: 'melissa-zhang', name: 'Melissa Zhang', color: '#34A853' }
  ];
  
  // Background placeholders
  const backgrounds = [
    { id: 'silicon-valley-aerial', name: 'Silicon Valley\nAerial View', color: '#1A73E8' },
    { id: 'modest-office-building', name: 'Office Building\nExterior', color: '#185ABC' },
    { id: 'nexus-office-interior', name: 'Nexus AI Office', color: '#174EA6' },
    { id: 'conference-room', name: 'Conference Room', color: '#103D8F' },
    { id: 'tesla-interior', name: 'Tesla Interior', color: '#1A1A1A' },
    { id: 'wei-apartment', name: 'Wei\'s Apartment', color: '#071F4A' },
    { id: 'vc-office', name: 'VC Office', color: '#1B3C87' },
    { id: 'google-campus', name: 'Google Campus', color: '#4285F4' },
    { id: 'country-club', name: 'Country Club', color: '#2C5530' },
    { id: 'family-dinner', name: 'Family Dinner', color: '#8B4513' },
    { id: 'conference-room-meeting', name: 'Conference Room Meeting', color: '#2C3E50' },
    { id: 'office-exterior', name: 'Office Exterior', color: '#030924' },
    { id: 'nexus-office-night', name: 'Office at Night', color: '#010714' }
  ];
  
  // Process all images on the page
  const allImages = document.querySelectorAll('img');
  
  allImages.forEach(img => {
    // Check if image failed to load
    img.addEventListener('error', function() {
      const src = this.getAttribute('src');
      
      // Handle character images
      if (src.includes('/characters/')) {
        const characterId = src.split('/').pop().split('.')[0];
        const character = characters.find(c => c.id === characterId);
        
        if (character) {
          this.src = createPlaceholderImage(character.name, 200, 200, character.color);
          window.debugGame && window.debugGame(`Created placeholder for character: ${character.name}`);
        } else {
          this.src = createPlaceholderImage('Character', 200, 200, '#555');
        }
      }
      // Handle background images
      else if (src.includes('/backgrounds/')) {
        const bgId = src.split('/').pop().split('.')[0];
        const background = backgrounds.find(b => b.id === bgId);
        
        if (background) {
          this.src = createPlaceholderImage(background.name, 800, 450, background.color);
          window.debugGame && window.debugGame(`Created placeholder for background: ${background.name}`);
        } else {
          this.src = createPlaceholderImage('Background', 800, 450, '#222');
        }
      }
      // Handle other images
      else {
        this.src = createPlaceholderImage('Image\nPlaceholder', 300, 200, '#777');
      }
    });
  });
  
  window.debugGame && window.debugGame('Placeholder image system initialized');
}); 
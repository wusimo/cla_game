// Character definitions for the game
export const characters = [
  {
    id: 'wei',
    name: 'Wei Zhang',
    title: 'Technical Genius',
    image: '/assets/characters/wei-zhang.jpg',
    description: 'A brilliant programmer and co-founder of Nexus AI. Wei is intense, focused, and sometimes socially awkward. His priority is building revolutionary technology, often at the expense of his personal life.',
    traits: ['Dedicated', 'Workaholic', 'Brilliant', 'Socially Awkward'],
    startingStats: {
      coding: 95,
      business: 30,
      charisma: 20,
      workLifeBalance: 10
    },
    initialRelationships: {
      kevin: 65,
      melissa: 80,
    },
    personalStoryline: 'Struggling with work-life balance as his startup dream consumes his life, Wei must navigate the tension between technological ambition and family responsibilities.'
  },
  {
    id: 'kevin',
    name: 'Kevin Liu',
    title: 'Business Visionary',
    image: '/assets/characters/kevin-liu.jpg',
    description: 'The charismatic co-founder and business mind behind Nexus AI. Kevin is polished, strategic, and excellent at networking. He excels at raising capital and making deals happen.',
    traits: ['Charismatic', 'Strategic', 'Ambitious', 'Status-driven'],
    startingStats: {
      coding: 40,
      business: 90,
      charisma: 85,
      workLifeBalance: 25
    },
    initialRelationships: {
      wei: 70,
      sophia: 85,
    },
    personalStoryline: 'Kevin navigates the high-pressure world of Silicon Valley dealmaking while maintaining a lavish lifestyle that may be built on promises he cannot keep.'
  },
  {
    id: 'sophia',
    name: 'Sophia Liu',
    title: 'Corporate Climber',
    image: '/assets/characters/sophia-liu.jpg',
    description: 'Kevin\'s ambitious wife who has her own career in venture capital. Sophia is intelligent, socially savvy, and has built a perfect life that may be more precarious than it appears.',
    traits: ['Ambitious', 'Image-conscious', 'Resourceful', 'Determined'],
    startingStats: {
      networking: 90,
      finance: 80,
      patience: 40,
      authenticity: 50
    },
    initialRelationships: {
      kevin: 85,
      wei: 50,
    },
    personalStoryline: 'Behind her picture-perfect life, Sophia must decide how far she is willing to go to maintain status and security in Silicon Valley\'s social hierarchy.'
  },
  {
    id: 'melissa',
    name: 'Melissa Zhang',
    title: 'Family Anchor',
    image: '/assets/characters/melissa-zhang.jpg',
    description: 'Wei\'s supportive yet increasingly frustrated wife who manages both her career and their family while Wei is consumed by his startup.',
    traits: ['Patient', 'Supportive', 'Practical', 'Assertive'],
    startingStats: {
      patience: 75,
      career: 65,
      familyFocus: 90,
      independence: 60
    },
    initialRelationships: {
      wei: 75,
      kevin: 40,
    },
    personalStoryline: 'Melissa must decide how long to support Wei\'s dream while balancing her own career aspirations and their family needs.'
  }
]; 
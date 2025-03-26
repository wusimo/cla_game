// Core emotions that we have assets for
const CORE_EMOTIONS = {
  HAPPY: 'happy',
  CONFIDENT: 'confident',
  NEUTRAL: 'neutral',
  THOUGHTFUL: 'thoughtful',
  SERIOUS: 'serious',
  FRUSTRATED: 'frustrated'
};

// Mapping of complex emotions to core emotions
const EMOTION_MAPPING = {
  // Positive emotions
  'excited': CORE_EMOTIONS.HAPPY,
  'pleased': CORE_EMOTIONS.HAPPY,
  'proud': CORE_EMOTIONS.HAPPY,
  'celebratory': CORE_EMOTIONS.HAPPY,
  'energetic': CORE_EMOTIONS.HAPPY,
  'optimistic': CORE_EMOTIONS.HAPPY,
  'grateful': CORE_EMOTIONS.HAPPY,
  'satisfied': CORE_EMOTIONS.HAPPY,
  'impressed': CORE_EMOTIONS.HAPPY,
  
  // Confident emotions
  'determined': CORE_EMOTIONS.CONFIDENT,
  'focused': CORE_EMOTIONS.CONFIDENT,
  'professional': CORE_EMOTIONS.CONFIDENT,
  'commanding': CORE_EMOTIONS.CONFIDENT,
  'supportive': CORE_EMOTIONS.CONFIDENT,
  'engaged': CORE_EMOTIONS.CONFIDENT,
  'encouraging': CORE_EMOTIONS.CONFIDENT,
  'resolute': CORE_EMOTIONS.CONFIDENT,
  'passionate': CORE_EMOTIONS.CONFIDENT,
  
  // Neutral emotions
  'calm': CORE_EMOTIONS.NEUTRAL,
  'balanced': CORE_EMOTIONS.NEUTRAL,
  'relaxed': CORE_EMOTIONS.NEUTRAL,
  'unfazed': CORE_EMOTIONS.NEUTRAL,
  'composed': CORE_EMOTIONS.NEUTRAL,
  
  // Thoughtful emotions
  'considering': CORE_EMOTIONS.THOUGHTFUL,
  'engaged': CORE_EMOTIONS.THOUGHTFUL,
  'focused': CORE_EMOTIONS.THOUGHTFUL,
  'interested': CORE_EMOTIONS.THOUGHTFUL,
  'curious': CORE_EMOTIONS.THOUGHTFUL,
  'reassuring': CORE_EMOTIONS.THOUGHTFUL,
  
  // Serious emotions
  'concerned': CORE_EMOTIONS.SERIOUS,
  'worried': CORE_EMOTIONS.SERIOUS,
  'stressed': CORE_EMOTIONS.SERIOUS,
  'anxious': CORE_EMOTIONS.SERIOUS,
  'nervous': CORE_EMOTIONS.SERIOUS,
  'tired': CORE_EMOTIONS.SERIOUS,
  'exhausted': CORE_EMOTIONS.SERIOUS,
  
  // Frustrated emotions
  'annoyed': CORE_EMOTIONS.FRUSTRATED,
  'irritated': CORE_EMOTIONS.FRUSTRATED,
  'angry': CORE_EMOTIONS.FRUSTRATED,
  'demanding': CORE_EMOTIONS.FRUSTRATED,
  'defensive': CORE_EMOTIONS.FRUSTRATED,
  'disappointed': CORE_EMOTIONS.FRUSTRATED,
  'resigned': CORE_EMOTIONS.FRUSTRATED
};

/**
 * Maps any emotion to one of our core emotions
 * @param {string} emotion - The emotion to map
 * @returns {string} The mapped core emotion
 */
function mapEmotion(emotion) {
  // If it's already a core emotion, return it
  if (Object.values(CORE_EMOTIONS).includes(emotion)) {
    return emotion;
  }
  
  // If we have a mapping for it, return the mapped emotion
  if (EMOTION_MAPPING[emotion]) {
    return EMOTION_MAPPING[emotion];
  }
  
  // Default to neutral if we don't have a mapping
  console.warn(`No mapping found for emotion: ${emotion}. Defaulting to neutral.`);
  return CORE_EMOTIONS.NEUTRAL;
}

/**
 * Validates if an emotion is valid (either a core emotion or has a mapping)
 * @param {string} emotion - The emotion to validate
 * @returns {boolean} Whether the emotion is valid
 */
function isValidEmotion(emotion) {
  return Object.values(CORE_EMOTIONS).includes(emotion) || EMOTION_MAPPING[emotion];
}

module.exports = {
  CORE_EMOTIONS,
  mapEmotion,
  isValidEmotion
}; 
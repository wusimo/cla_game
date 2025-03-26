/**
 * Scene Graph Structure
 * 
 * This file defines all game scenes in a graph structure where each scene connects
 * to other scenes through decisions or default transitions.
 */

// Helper function to determine the next scene based on character
// eslint-disable-next-line no-unused-vars
const getCharacterSpecificScene = (baseId, character) => {
  return `${baseId}_${character.id}`;
};

export const scenes = {
  // Coming Soon scene
  "coming_soon": {
    id: "coming_soon",
    title: "To Be Continued...",
    location: "Coming Soon",
    background: "/assets/backgrounds/silicon-valley-aerial.jpg",
    narrative: [
      {
        type: "narration",
        text: "Episode 1 is complete. Thank you for playing Silicon Dreams!"
      },
      {
        type: "narration",
        text: "The story of Nexus AI will continue in future episodes..."
      }
    ],
    defaultNext: "ep1_intro" // Loops back to start
  },

  // Episode 2: The Next Chapter
  "ep2_intro": {
    id: "ep2_intro",
    episodeId: "ep2",
    title: "To Be Continued...",
    location: "Coming Soon",
    background: "/assets/backgrounds/silicon-valley-aerial.jpg",
    narrative: [
      {
        type: "narration",
        text: "Episode 2 is currently in development. Thank you for playing Episode 1: Silicon Dreams!"
      },
      {
        type: "narration",
        text: "The story of Nexus AI will continue soon..."
      }
    ],
    defaultNext: "ep1_intro" // Loops back to start for now
  },

  "ep2_office_growth": {
    id: "ep2_office_growth",
    episodeId: "ep2",
    title: "The Next Chapter",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "The office is bustling with new employees. The Series A funding has allowed for significant growth."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "We've hired some amazing talent. The team is stronger than ever.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Yes, but we need to make sure we maintain our culture as we grow.",
        emotion: "thoughtful",
        speakerPosition: "left"
      }
    ],
    defaultNext: "coming_soon"
  },

  // Episode 1: Silicon Dreams
  "ep1_intro": {
    id: "ep1_intro",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Silicon Valley - Aerial View",
    background: "/assets/backgrounds/silicon-valley-aerial.jpg",
    narrative: [
      {
        type: "narration",
        text: "Sprawling tech campuses dominate the landscape. The gleaming headquarters of Google, Apple, and Facebook stand as monuments to innovation and wealth."
      },
      {
        type: "narration",
        text: "But not every tech company exists at such scale. Some dreams are still taking shape in more modest surroundings..."
      }
    ],
    defaultNext: "ep1_office_exterior"
  },
  
  "ep1_office_exterior": {
    id: "ep1_office_exterior",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Modest Office Building - Exterior",
    background: "/assets/backgrounds/modest-office-building.jpg",
    narrative: [
      {
        type: "narration",
        text: "A stark contrast to the tech giants' campuses. A small office building with a sign that reads \"NEXUS AI - 3rd Floor.\""
      }
    ],
    defaultNext: "ep1_nexus_office"
  },
  
  "ep1_nexus_office": {
    id: "ep1_nexus_office",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Headquarters",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "A cramped open office with about 15 employees working intensely at clustered desks. The space is utilitarian but with touches of startup culture—a ping pong table covered with paperwork, motivational posters, and whiteboards filled with code."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "We need to completely rewrite the recommendation algorithm. The current version won't scale beyond a million users.",
        emotion: "serious",
        speakerPosition: "left"
      }
    ],
    getNextScene: (character) => {
      // Different scene paths based on character
      return `ep1_kevin_enters_${character.id}`;
    }
  },
  
  // Wei's path - Kevin enters
  "ep1_kevin_enters_wei": {
    id: "ep1_kevin_enters_wei",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Headquarters",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "Wei stands in front of a whiteboard, coding furiously. Dark circles under his eyes suggest he hasn't slept in days."
      },
      {
        type: "narration",
        text: "Kevin Liu enters, carrying a designer coffee. He exudes confidence and charm that seems out of place in the modest office."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Good morning, everyone! Beautiful day in the Valley!",
        emotion: "happy",
        speakerPosition: "right",
        animation: "fadeIn"
      },
      {
        type: "narration",
        text: "Wei barely acknowledges Kevin's entrance. The employees nod respectfully."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "You're late. Again.",
        emotion: "frustrated",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "It's 8:30, Wei. Normal business hours.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "I've been here since 5. We're rewriting the entire recommendation algorithm.",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "And I've been up since 4 dining with Jackson Wong from Sequoia Capital.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "This catches Wei's attention. He turns."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Jackson? What did he say?",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Let's talk in private.",
        emotion: "serious",
        speakerPosition: "right"
      }
    ],
    decisions: {
      prompt: "How should Wei respond to Kevin?",
      quote: "\"The goal isn't just to build something that will change the world, but to build something that will last.\" - Kevin Systrom",
      options: [
        {
          id: "enthusiastic",
          text: "Show enthusiasm about the investor meeting",
          preview: "Put aside your coding frustration to focus on this business opportunity",
          relationshipEffects: {
            kevin: 5
          },
          nextScene: "ep1_meeting_enthusiastic_wei"
        },
        {
          id: "hesitant",
          text: "Express concern about the timeline",
          preview: "Prioritize the technical issues that need to be solved",
          relationshipEffects: {
            kevin: -5
          },
          nextScene: "ep1_meeting_hesitant_wei"
        },
        {
          id: "multitask",
          text: "Bring your laptop to continue coding during the meeting",
          preview: "Try to balance both priorities at once",
          relationshipEffects: {
            kevin: -3
          },
          nextScene: "ep1_meeting_multitask_wei"
        }
      ]
    }
  },
  
  // Kevin's path - Meeting Wei
  "ep1_kevin_enters_kevin": {
    id: "ep1_kevin_enters_kevin",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Headquarters",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "You enter the office, designer coffee in hand, having just come from an early breakfast meeting with Jackson Wong from Sequoia Capital."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Good morning, everyone! Beautiful day in the Valley!",
        emotion: "happy",
        speakerPosition: "right",
        animation: "fadeIn"
      },
      {
        type: "narration",
        text: "The employees nod respectfully. Wei barely acknowledges your entrance, standing at a whiteboard filled with code. Dark circles under his eyes suggest he hasn't slept."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "You're late. Again.",
        emotion: "frustrated",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "You check your Rolex - it's 8:30 AM. Completely reasonable."
      }
    ],
    decisions: {
      prompt: "How do you respond to Wei?",
      quote: "\"Sometimes the people with the worst past create the best future.\" - Umar Patek",
      options: [
        {
          id: "businessHours",
          text: "Point out it's normal business hours",
          preview: "Defend your schedule as perfectly reasonable",
          relationshipEffects: {
            wei: -5
          },
          nextScene: "ep1_kevin_response_business"
        },
        {
          id: "apologetic",
          text: "Apologize and mention the investor meeting",
          preview: "Acknowledge Wei's frustration but highlight the important business reason",
          relationshipEffects: {
            wei: 5
          },
          nextScene: "ep1_kevin_response_apologetic"
        },
        {
          id: "bringCoffee",
          text: "Hand Wei a coffee you brought for him",
          preview: "You anticipated his mood and came prepared",
          relationshipEffects: {
            wei: 10
          },
          nextScene: "ep1_kevin_response_coffee"
        }
      ]
    }
  },
  
  // Wei's meeting responses
  "ep1_meeting_enthusiastic_wei": {
    id: "ep1_meeting_enthusiastic_wei",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "Let's hear what Jackson had to say. This could be the break we need.",
        emotion: "thoughtful",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "Kevin smiles, pleased with your enthusiasm. He leads you to the small conference room."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Jackson is extremely interested in our technology. Sequoia could lead our Series A.",
        emotion: "happy",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_investor_conversation_supportive"
  },
  
  "ep1_meeting_hesitant_wei": {
    id: "ep1_meeting_hesitant_wei",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "I'm concerned about the timeline, Kevin. The recommendation engine isn't ready for a demo yet.",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "Kevin frowns slightly, but nods understandingly."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "I get it, but we can't pass up this opportunity. Jackson is ready to move quickly.",
        emotion: "serious",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_investor_conversation_concerned"
  },
  
  "ep1_meeting_multitask_wei": {
    id: "ep1_meeting_multitask_wei",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "I'll bring my laptop and keep working while we talk.",
        emotion: "thoughtful",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "Kevin rolls his eyes slightly."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Fine, but please pay attention when I'm talking about Sequoia's offer.",
        emotion: "frustrated",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_investor_conversation_distracted"
  },
  
  // Kevin's response paths
  "ep1_kevin_response_business": {
    id: "ep1_kevin_response_business",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Headquarters",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "It's 8:30, Wei. Normal business hours.",
        emotion: "frustrated",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "I've been here since 5. We're rewriting the entire recommendation algorithm.",
        emotion: "frustrated",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "And I've been up since 4 dining with Jackson Wong from Sequoia Capital.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "This catches Wei's attention. He turns."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Jackson? What did he say?",
        emotion: "neutral",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_kevin_proposal"
  },
  
  "ep1_kevin_response_apologetic": {
    id: "ep1_kevin_response_apologetic",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Headquarters",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "Sorry I'm late, Wei. I was having breakfast with Jackson Wong from Sequoia Capital. He's extremely interested in our technology.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Wei's expression softens. He puts down his marker."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Jackson? Really? What did he say?",
        emotion: "thoughtful",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_kevin_proposal_positive"
  },
  
  "ep1_kevin_response_coffee": {
    id: "ep1_kevin_response_coffee",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Headquarters",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "I figured you'd be pulling another all-nighter, so I brought you this.",
        emotion: "thoughtful",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "You hand Wei a large black coffee - exactly how he likes it. His expression softens immediately."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Thanks, I needed this. Been here since 5AM rewriting the recommendation algorithm.",
        emotion: "happy",
        speakerPosition: "left",
        animation: "fadeIn"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "And I've been up since 4 having breakfast with Jackson Wong from Sequoia Capital. He's interested, Wei. Really interested.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Wei's eyes widen as he takes a sip of coffee."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Jackson Wong? Tell me everything.",
        emotion: "neutral",
        speakerPosition: "left",
        animation: "bounce"
      }
    ],
    defaultNext: "ep1_kevin_proposal_enthusiastic"
  },
  
  // Investor conversation scenes
  "ep1_investor_conversation_supportive": {
    id: "ep1_investor_conversation_supportive",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "Sequoia is willing to lead our Series A at a $15 million valuation. But they want to see a demo next week.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Next week? That's ambitious, but I'll make it happen.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "Kevin looks relieved. Your support clearly means a lot to him."
      }
    ],
    decisions: {
      prompt: "What do you prioritize for the demo?",
      options: [
        {
          id: "technical",
          text: "Focus on technical excellence",
          relationshipEffects: {
            kevin: -2
          },
          nextScene: "ep1_demo_technical" 
        },
        {
          id: "presentation",
          text: "Focus on presentation quality",
          relationshipEffects: {
            kevin: 5
          },
          nextScene: "ep1_demo_presentation"
        },
        {
          id: "balance",
          text: "Try to balance both aspects",
          nextScene: "ep1_demo_balanced"
        }
      ]
    }
  },
  
  "ep1_investor_conversation_concerned": {
    id: "ep1_investor_conversation_concerned",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "Sequoia is willing to lead our Series A at a $15 million valuation. But they want to see a demo next week.",
        emotion: "serious",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "A week isn't much time to fix our scaling issues...",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "We need to make it work, Wei. This is our shot.",
        emotion: "neutral",
        speakerPosition: "right"
      }
    ],
    decisions: {
      prompt: "How do you approach the demo?",
      options: [
        {
          id: "ask_delay",
          text: "Ask Kevin to negotiate for more time",
          relationshipEffects: {
            kevin: -5
          },
          nextScene: "ep1_demo_delay" 
        },
        {
          id: "work_overtime",
          text: "Commit to working overtime to get it done",
          relationshipEffects: {
            kevin: 8
          },
          nextScene: "ep1_demo_overtime"
        },
        {
          id: "fake_it",
          text: "Suggest faking some features for the demo",
          relationshipEffects: {
            kevin: 3
          },
          nextScene: "ep1_demo_fake"
        }
      ]
    }
  },
  
  "ep1_investor_conversation_distracted": {
    id: "ep1_investor_conversation_distracted",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "Sequoia is willing to lead our Series A at a $15 million valuation. But they want to see a demo next week.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Next week? That's going to be tight with all the technical issues we need to fix.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "You continue typing on your laptop as Kevin speaks. He gives you an irritated look."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Wei, are you even listening? This is a $15 million deal we're talking about.",
        emotion: "frustrated",
        speakerPosition: "right",
        sceneEffect: "shake"
      }
    ],
    decisions: {
      prompt: "How do you respond?",
      options: [
        {
          id: "close_laptop",
          text: "Close your laptop and focus on Kevin",
          relationshipEffects: {
            kevin: 5
          },
          nextScene: "ep1_demo_focus" 
        },
        {
          id: "multitask_continue",
          text: "Keep working while talking about the demo",
          relationshipEffects: {
            kevin: -8
          },
          nextScene: "ep1_demo_multitask"
        },
        {
          id: "show_progress",
          text: "Show Kevin what you're working on",
          relationshipEffects: {
            kevin: 2
          },
          nextScene: "ep1_demo_show_progress"
        }
      ]
    }
  },
  
  // Kevin's proposal scenes
  "ep1_kevin_proposal": {
    id: "ep1_kevin_proposal",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "Let's discuss it in the conference room.",
        emotion: "serious",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Wei follows you into the small conference room. The tension between you is palpable."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Sequoia is offering us $15 million for a 20% stake. But they need a demo in a week.",
        emotion: "serious",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "A week? That's not enough time to solve our scaling issues.",
        emotion: "serious",
        speakerPosition: "left"
      }
    ],
    decisions: {
      prompt: "How do you respond to Wei's concerns?",
      options: [
        {
          id: "pressure",
          text: "Pressure him to make it work",
          relationshipEffects: {
            wei: -10
          },
          nextScene: "ep1_demo_pressure"
        },
        {
          id: "compromise",
          text: "Suggest a compromise",
          relationshipEffects: {
            wei: 5
          },
          nextScene: "ep1_demo_compromise"
        },
        {
          id: "offer_help",
          text: "Offer to help with the technical issues",
          relationshipEffects: {
            wei: 10
          },
          nextScene: "ep1_demo_help"
        }
      ]
    }
  },
  
  "ep1_kevin_proposal_positive": {
    id: "ep1_kevin_proposal_positive",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "Let's talk in the conference room. This is big news.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Wei follows you eagerly, his coding concerns momentarily forgotten."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Sequoia is offering us $15 million at a $75 million valuation. But they need a demo in a week.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "A week? That's not much time...",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "I know, but this is our shot. We can't miss it.",
        emotion: "serious",
        speakerPosition: "right"
      }
    ],
    decisions: {
      prompt: "How do you want to approach the demo preparation?",
      options: [
        {
          id: "team_effort",
          text: "Propose a full team effort",
          relationshipEffects: {
            wei: 5
          },
          nextScene: "ep1_demo_team"
        },
        {
          id: "cut_corners",
          text: "Suggest cutting some corners to meet the timeline",
          relationshipEffects: {
            wei: -5
          },
          nextScene: "ep1_demo_shortcuts"
        },
        {
          id: "request_extension",
          text: "Suggest trying to get a time extension",
          relationshipEffects: {
            wei: 8,
            sequoia: -5
          },
          nextScene: "ep1_demo_extension"
        }
      ]
    }
  },
  
  "ep1_kevin_proposal_enthusiastic": {
    id: "ep1_kevin_proposal_enthusiastic",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "Let's discuss it in detail. This could be our big break.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Wei grabs his notebook and follows you to the conference room, energized by both the coffee and the news."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Jackson loved our vision. He's offering $15 million for a 15% stake - a $100 million valuation!",
        emotion: "happy",
        speakerPosition: "right",
        animation: "bounce"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "That's incredible! What's the timeline?",
        emotion: "happy",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "That's the catch - they want a full demo in a week.",
        emotion: "serious",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "A week? Well, I guess we better get to work then!",
        emotion: "confident",
        speakerPosition: "left"
      }
    ],
    decisions: {
      prompt: "What's your approach to the demo preparation?",
      options: [
        {
          id: "collaborate",
          text: "Offer to collaborate closely with Wei",
          relationshipEffects: {
            wei: 10
          },
          nextScene: "ep1_demo_collaborate"
        },
        {
          id: "delegate",
          text: "Focus on investor relations and delegate the tech work",
          relationshipEffects: {
            wei: -3
          },
          nextScene: "ep1_demo_delegate"
        },
        {
          id: "bring_in_help",
          text: "Suggest bringing in outside help",
          relationshipEffects: {
            wei: 0
          },
          nextScene: "ep1_demo_outsource"
        }
      ]
    }
  },
  
  // Demo preparation scenes - Part 1
  "ep1_demo_technical": {
    id: "ep1_demo_technical",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "I'm going to focus on making sure the algorithm actually works. The scaling issues need to be fixed.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Just make sure it looks good enough for the demo. The investors won't understand the technical details anyway.",
        emotion: "serious",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "I won't present something that doesn't work properly. That's not how I operate.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "The next few days are a blur of coding sessions and testing. You barely leave the office, sleeping on the couch when necessary."
      }
    ],
    defaultNext: "ep1_demo_day"
  },
  
  "ep1_demo_presentation": {
    id: "ep1_demo_presentation",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "I'll focus on making the demo look polished. We can fix the underlying issues later.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Perfect! That's exactly what we need. Investors buy into the vision first, technical details second.",
        emotion: "happy",
        speakerPosition: "right",
        animation: "bounce"
      },
      {
        type: "narration",
        text: "Over the next week, you work on creating a beautiful user interface and smooth demo flow, even if some features are simulated."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "This is looking fantastic. Jackson is going to love it.",
        emotion: "happy",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_demo_day"
  },
  
  "ep1_demo_balanced": {
    id: "ep1_demo_balanced",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "I'll try to balance the technical improvements with presentation quality. We need both.",
        emotion: "thoughtful",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Good thinking. We need something that works AND impresses them visually.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "The week passes in a flurry of activity. Your team pulls several all-nighters, but manages to improve both the algorithm and the user interface."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "It's not perfect, but it shows what we're capable of. Real results with a polished presentation.",
        emotion: "happy",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_demo_day"
  },

  // More demo preparation paths
  "ep1_demo_delay": {
    id: "ep1_demo_delay",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "Kevin, can you ask for more time? Two weeks would make a huge difference in quality.",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "That's not how this works, Wei. If we appear hesitant, they'll just move on to the next startup.",
        emotion: "frustrated",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Kevin makes a call anyway, stepping out of the room. When he returns, his expression is grim."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "They said they need to decide within their current investment cycle. It's one week or nothing.",
        emotion: "frustrated",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_demo_reluctant"
  },
  
  "ep1_demo_overtime": {
    id: "ep1_demo_overtime",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "I'll make it work. We'll need the whole team on this, and I'll be coding around the clock.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "That's the spirit! I knew I could count on you, Wei.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "The next week is brutal. You barely sleep, subsisting on energy drinks and takeout. Your code quality suffers, but you manage to address the critical issues."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "It's not my best work, but it should scale to handle the demo at least.",
        emotion: "serious",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_demo_day"
  },
  
  "ep1_demo_fake": {
    id: "ep1_demo_fake",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "What if we fake some of the features for the demo? Just hard-code the responses for the demonstration scenarios.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "I like how you think! A 'smoke and mirrors' approach. As long as we can build it for real after we get the funding.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "You spend the week creating an elaborate facade. The demo looks amazing, with pre-programmed responses that wow the viewer."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "It works beautifully... as long as they stick to our script.",
        emotion: "serious",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_demo_day_fake"
  },
  
  // Demo Day Scenes
  "ep1_demo_day": {
    id: "ep1_demo_day",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "narration",
        text: "The day of the demo arrives. Your heart pounds as you set up your laptop in Sequoia Capital's sleek conference room."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Jackson will be here any minute. How are you feeling about the demo?",
        emotion: "serious",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "As ready as we'll ever be. I've run through it a dozen times this morning.",
        emotion: "thoughtful",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "The door opens, and Jackson Wong enters with two associates. His expression is unreadable as he shakes your hands."
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "Kevin, Wei, good to see you both. Let's get right to it - show me what Nexus AI can do.",
        emotion: "neutral",
        speakerPosition: "center"
      }
    ],
    decisions: {
      prompt: "How do you begin the presentation?",
      options: [
        {
          id: "technical_first",
          text: "Start with technical details and capabilities",
          relationshipEffects: {
            jackson: -5
          },
          nextScene: "ep1_demo_technical_pitch"
        },
        {
          id: "vision_first",
          text: "Begin with your vision and market opportunity",
          relationshipEffects: {
            jackson: 10
          },
          nextScene: "ep1_demo_vision_pitch"
        },
        {
          id: "demo_first",
          text: "Jump straight into the live demo",
          relationshipEffects: {
            jackson: 3
          },
          nextScene: "ep1_demo_immediate"
        }
      ]
    }
  },
  
  "ep1_demo_day_fake": {
    id: "ep1_demo_day_fake",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "narration",
        text: "The day of the demo arrives. Your heart pounds as you set up your laptop in Sequoia Capital's sleek conference room."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "They'll be here any minute. Did you double-check the prepared scenarios?",
        emotion: "serious",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Yes, everything's set. Just make sure they follow our demo script. If they go off-script...",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "I'll guide the conversation. Don't worry.",
        emotion: "thoughtful",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "The door opens, and Jackson Wong enters with two associates. Your stomach tightens as you prepare to present your carefully crafted illusion."
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "Kevin, Wei, let's see what you've built that's got everyone talking.",
        emotion: "thoughtful",
        speakerPosition: "center"
      }
    ],
    decisions: {
      prompt: "How do you handle the fake demo?",
      options: [
        {
          id: "stick_to_script",
          text: "Carefully guide them through your prepared script",
          relationshipEffects: {
            jackson: 5
          },
          nextScene: "ep1_demo_fake_success"
        },
        {
          id: "improvise",
          text: "Be flexible and improvise if they ask unexpected questions",
          relationshipEffects: {
            jackson: -10
          },
          nextScene: "ep1_demo_fake_failure"
        },
        {
          id: "honest_admission",
          text: "Come clean about the limitations but emphasize the vision",
          relationshipEffects: {
            jackson: 2,
            kevin: -8
          },
          nextScene: "ep1_demo_honest_pivot"
        }
      ]
    }
  },
  
  // Demo Response Scenes - Focus
  "ep1_demo_focus": {
    id: "ep1_demo_focus",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "You're right. This is important.",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "You close your laptop and give Kevin your full attention. His expression relaxes."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Thank you. Now, Sequoia is offering $15 million, but we need a killer demo in a week.",
        emotion: "serious",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "That's going to be tight with our current issues. But I'll make it work.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Great! Let's map out a plan.",
        emotion: "happy",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_demo_planning"
  },
  
  // Demo Reluctant Scene
  "ep1_demo_reluctant": {
    id: "ep1_demo_reluctant",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room", 
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "Fine. One week it is.",
        emotion: "frustrated",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "Wei's frustration is evident, but he starts mapping out tasks on the whiteboard."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "We'll need the entire team working overtime. I'm not sure we'll solve all the scaling issues, but we can at least make it demo-worthy.",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "That's all we need right now. Once we have the funding, we can fix everything else.",
        emotion: "happy",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_demo_day"
  },
  
  "ep1_demo_multitask": {
    id: "ep1_demo_multitask",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "I'm listening. I can code and talk at the same time.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "Kevin's face reddens. He slams his palm on the table, making you jump."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Damn it, Wei! This is our future we're talking about! $15 million! Can you put that thing away for five minutes?",
        emotion: "frustrated",
        speakerPosition: "right",
        sceneEffect: "shake"
      },
      {
        type: "narration",
        text: "The outburst catches you by surprise. The conference room falls silent."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "...fine.",
        emotion: "neutral",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_demo_tense_planning"
  },
  
  "ep1_demo_show_progress": {
    id: "ep1_demo_show_progress",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "Look at what I'm working on, Kevin. This is why I'm concerned about the timeline.",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "You turn your laptop to show Kevin a visualization of the scaling issues. His expression shifts as he begins to understand."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "I see the problem. But we still need to make this work for the demo.",
        emotion: "thoughtful",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "I have some ideas for temporary fixes that will work for the demo. But we'll need to completely rebuild this section after funding.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "That's fine. Let's make a plan.",
        emotion: "neutral",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_demo_collaborative_planning"
  },
  
  // Kevin-Wei Interaction Scenes
  "ep1_demo_pressure": {
    id: "ep1_demo_pressure",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "Look, I don't care what it takes. Pull all-nighters, bring in freelancers, whatever. This has to work by next week.",
        emotion: "frustrated",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Wei's expression hardens as he listens to your demands."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "You can't just demand the impossible, Kevin. Software development doesn't work that way.",
        emotion: "frustrated",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "This isn't impossible. Other startups pull this off all the time. We just need you to prioritize the right things.",
        emotion: "frustrated",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Fine. But don't come crying to me when technical debt crushes us later.",
        emotion: "frustrated",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_demo_strained_planning"
  },
  
  "ep1_demo_compromise": {
    id: "ep1_demo_compromise",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "How about this - we focus on making a limited but rock-solid demo. Just enough features to impress Jackson, but fully functional.",
        emotion: "thoughtful",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Wei considers your suggestion, some of the tension leaving his shoulders."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "That's... actually reasonable. We could limit the scope to just the core recommendation engine.",
        emotion: "thoughtful",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Exactly. Show the quality of what we can do, not the quantity. What features do you need to focus on?",
        emotion: "confident",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Let me sketch out a plan. I think we can make this work.",
        emotion: "thoughtful",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_demo_focused_planning"
  },
  
  "ep1_demo_help": {
    id: "ep1_demo_help",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "Let me help with the technical issues. I may not code as well as you, but I still remember enough from my engineering days.",
        emotion: "confident",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Wei looks genuinely surprised by your offer."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "You'd do that? I thought you'd be focused on preparing the pitch and slide deck.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "I can do both. The tech needs to work, and I haven't forgotten my roots. What if I help with optimizing the front-end while you focus on the algorithm?",
        emotion: "confident",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "That... would actually help a lot. Let's do it.",
        emotion: "happy",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_demo_team_coding"
  },
  
  // Team preparation scenes
  "ep1_demo_team": {
    id: "ep1_demo_team",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "Let's get the whole team involved. Everyone drops what they're doing and focuses on making this demo shine.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "You gather the small Nexus team of 15 engineers, designers, and product people for an emergency meeting."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Team, we have huge news. Sequoia Capital is ready to lead our Series A with $15 million, but we need an amazing demo in one week.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Excited murmurs fill the room. The energy is palpable as people realize what this could mean for everyone."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Here's the plan. We're forming three task forces: algorithm optimization, UI polish, and testing. Everyone will be assigned to one.",
        emotion: "confident",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_team_montage"
  },
  
  "ep1_demo_shortcuts": {
    id: "ep1_demo_shortcuts",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "We need to cut some corners to meet this deadline. Let's focus on what will impress Jackson and worry about the rest later.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "What kind of corners are we talking about?",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Hard-code some responses for the demo scenarios. Skip the scalability fixes for now. Make the UI look polished even if the backend isn't fully optimized.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Wei looks uncomfortable but nods slowly."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "I don't love it, but I get it. Just remember we'll need to fix all of this after we get the funding.",
        emotion: "neutral",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_cutting_corners_montage"
  },
  
  "ep1_demo_extension": {
    id: "ep1_demo_extension",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "Let me call Jackson and see if we can get two weeks instead of one. I can explain that we want to show them something truly impressive.",
        emotion: "thoughtful",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "You step out of the room to make the call. Wei waits anxiously, pacing around the conference room."
      },
      {
        type: "narration",
        text: "When you return five minutes later, your expression tells the story before you speak."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Jackson says their investment committee meets next Friday. If we want to be considered in this round, it has to be next week.",
        emotion: "frustrated",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "So we're back to the original timeline.",
        emotion: "frustrated",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "But he did say they're very excited about our technology. The potential is there for a much larger round if we impress them.",
        emotion: "happy",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_crunch_time"
  },
  
  "ep1_demo_collaborate": {
    id: "ep1_demo_collaborate",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "Let's tackle this together. I'll cancel my other meetings this week and work side by side with you on the demo.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Really? That would make a huge difference. What about your investor meetings?",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "They can wait. This is our top priority. You focus on the algorithm, I'll handle the presentation layer and coordinate with the design team.",
        emotion: "thoughtful",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "For the first time in months, you and Wei feel like true partners again. The energy between you is reminiscent of when you first started the company."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Like old times, huh? Let's get to work.",
        emotion: "neutral",
        speakerPosition: "left",
        animation: "bounce"
      }
    ],
    defaultNext: "ep1_collaborative_montage"
  },
  
  "ep1_demo_delegate": {
    id: "ep1_demo_delegate",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "Wei, I need you to lead the technical effort for the demo. I'll focus on preparing for the investor pitch and handling logistics.",
        emotion: "confident",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "So business as usual? You handle the money people, I handle the actual product?",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "We each play to our strengths. That's why we make a good team.",
        emotion: "confident",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "There's a slight tension in the air, but both of you know this arrangement has worked in the past."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "I'll need the entire engineering team focused on this. No distractions or side projects.",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Done. They're all yours. Just make it impressive.",
        emotion: "neutral",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_parallel_work"
  },
  
  "ep1_demo_outsource": {
    id: "ep1_demo_outsource",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Kevin",
        text: "What if we bring in some outside help? I know a few freelance developers who could assist with the frontend polish.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Outside developers? On our proprietary AI algorithm? That seems risky.",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Not on the core algorithm. Just the UI layer and maybe some of the API integration. Give them the non-sensitive tasks.",
        emotion: "thoughtful",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Wei contemplates this for a moment, weighing the risks against the tight timeline."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Alright, but with strict NDAs and limited access. And I review all their code before it goes into production.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Perfect. I'll make some calls right away.",
        emotion: "happy",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_outsourced_work"
  },
  
  // Planning scenes
  "ep1_demo_planning": {
    id: "ep1_demo_planning",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "narration",
        text: "You and Kevin spend the next hour mapping out a detailed plan for the demo. The whiteboard fills with tasks, timelines, and assignments."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "If we focus on these three key features and make them flawless, Jackson will be impressed.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "The recommendation algorithm, the user interface, and the analytics dashboard. It's ambitious, but doable.",
        emotion: "thoughtful",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "As the plan takes shape, a sense of cautious optimism fills the room."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "This is going to work. Sequoia will love it.",
        emotion: "confident",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Let's get to work then. We've got a lot to do and not much time.",
        emotion: "confident",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_demo_day"
  },
  
  "ep1_demo_tense_planning": {
    id: "ep1_demo_tense_planning",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "narration",
        text: "The atmosphere remains tense as you and Kevin develop the demo plan. Communication is minimal and strictly professional."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Here's what we need for the demo. Can you confirm these features will be ready?",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Yes. I'll handle the technical implementation. You focus on the presentation.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "The divide between you feels wider than ever, but both of you are professionals. The work will get done."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "I'll brief the team tomorrow. Let's reconvene in two days to check progress.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Fine. I'll send daily updates by email.",
        emotion: "neutral",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_demo_day"
  },
  
  // Demo Technical Pitch scenes
  "ep1_demo_technical_pitch": {
    id: "ep1_demo_technical_pitch",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "Before we show you the demo, I'd like to explain the technical architecture of our system.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "Wei launches into a detailed explanation of the algorithm, using technical terms that clearly go over Jackson's head."
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "That's... very interesting. But what does your product actually do for users?",
        emotion: "neutral",
        speakerPosition: "center"
      },
      {
        type: "narration",
        text: "Kevin looks anxious. He steps in quickly."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Perhaps it's better if we show the demo first, then we can dive into the technical details after.",
        emotion: "serious",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_demo_recovery"
  },
  
  "ep1_demo_vision_pitch": {
    id: "ep1_demo_vision_pitch",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "We believe AI shouldn't just be a tool, but a companion that understands you.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "Wei speaks with surprising eloquence about the vision behind Nexus AI. Jackson leans forward, clearly engaged."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Our technology adapts to individual users in ways that current recommendation engines can only dream of.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "That's exactly what we're looking for - technology with both heart and brains. Show me how it works.",
        emotion: "happy",
        speakerPosition: "center"
      }
    ],
    defaultNext: "ep1_demo_successful"
  },
  
  "ep1_demo_immediate": {
    id: "ep1_demo_immediate",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "Let me show you what we've built.",
        emotion: "thoughtful",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "Without preamble, Wei launches into the demonstration. The Nexus AI interface appears on the large screen."
      },
      {
        type: "narration",
        text: "Jackson watches carefully, but without the context of your vision, he seems to be struggling to understand the product's unique value."
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "I see what it does, but help me understand how this is different from what's already on the market.",
        emotion: "neutral",
        speakerPosition: "center"
      }
    ],
    defaultNext: "ep1_demo_explanation"
  },
  
  "ep1_demo_recovery": {
    id: "ep1_demo_recovery",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "narration",
        text: "Wei quickly adjusts his approach, focusing on the practical benefits of the technology rather than the complex details."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Let me show you what it means for users. Our prototype can already demonstrate personalized content in real-time.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "The demo proceeds, and while Jackson becomes more engaged, his initial impression has already been set."
      }
    ],
    defaultNext: "ep1_demo_mixed_result"
  },
  
  "ep1_demo_successful": {
    id: "ep1_demo_successful",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "narration",
        text: "Wei demonstrates the technology with confidence. The AI recommendation system works flawlessly, showcasing exactly the points you highlighted in your vision."
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "This is impressive. The user experience is intuitive, but I can see the sophisticated technology behind it.",
        emotion: "happy",
        speakerPosition: "center"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "And this is just the beginning. With proper funding, we can expand these capabilities exponentially.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "Kevin beams with pride as the demo concludes. Jackson's associates are taking detailed notes."
      }
    ],
    defaultNext: "ep1_investor_decision_positive"
  },
  
  "ep1_demo_explanation": {
    id: "ep1_demo_explanation",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Wei",
        text: "Unlike existing systems, our algorithm learns from subtle behavioral patterns to create truly personalized experiences.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "Wei attempts to explain the differentiators, but without the initial vision setting, the explanation feels disjointed."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "What Wei means is that we're reinventing how AI understands user intent - it's more intuitive and human-like.",
        emotion: "neutral",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_demo_mixed_result"
  },
  
  "ep1_demo_mixed_result": {
    id: "ep1_demo_mixed_result",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "narration",
        text: "The demo concludes. Jackson and his associates confer quietly for a moment."
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "There's definitely potential here, but I have some concerns about market differentiation and scaling.",
        emotion: "thoughtful",
        speakerPosition: "center"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "We understand those concerns. That's exactly what the Series A funding would help us address.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "We'll need to discuss this internally. I'll get back to you next week.",
        emotion: "neutral",
        speakerPosition: "center"
      }
    ],
    defaultNext: "ep1_investor_decision_neutral"
  },
  
  // Investor decision outcomes
  "ep1_investor_decision_positive": {
    id: "ep1_investor_decision_positive",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Jackson",
        text: "I've seen enough. We want to lead your Series A.",
        emotion: "neutral",
        speakerPosition: "center"
      },
      {
        type: "narration",
        text: "A surge of relief washes over you. Months of work have led to this moment."
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "Let's move forward with the $15 million at the valuation we discussed. Our team will work on the term sheet immediately.",
        emotion: "happy",
        speakerPosition: "center"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "That's fantastic news! Thank you for your confidence in us.",
        emotion: "neutral",
        speakerPosition: "right",
        animation: "bounce"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "We won't let you down. This investment will help us revolutionize AI personalization.",
        emotion: "happy",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_ending_successful_wei"
  },
  
  "ep1_investor_decision_neutral": {
    id: "ep1_investor_decision_neutral",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "One week later. The team is gathered in the conference room, waiting anxiously for Kevin's update on the Sequoia investment."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "I just got off the phone with Jackson.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "The room falls silent. Everyone holds their breath."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "They're not ready to lead our Series A... yet. But they're interested in participating in a smaller seed extension round.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "What does that mean for us financially?",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "$5 million instead of $15 million, and at a lower valuation. But it keeps us alive, and gives us another shot at a Series A in 6-12 months.",
        emotion: "neutral",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_ending_compromise_wei"
  },
  
  // Wei's Endings for Episode 1
  "ep1_ending_successful_wei": {
    id: "ep1_ending_successful_wei",
    episodeId: "ep1",
    title: "Silicon Dreams - Finale",
    location: "Nexus AI Office - Rooftop",
    background: "/assets/backgrounds/office-rooftop-celebration.jpg",
    narrative: [
      {
        type: "narration",
        text: "One week later. The Nexus team has gathered on the rooftop of your building for an impromptu celebration."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "To Nexus AI and our Series A funding! $15 million to build the future!",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Everyone cheers and raises their glasses. The sunset casts a golden glow over Silicon Valley spread out before you."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "We did it. But this is just the beginning. Now the real work starts.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Always the pragmatist, Wei. But he's right. With this funding comes higher expectations.",
        emotion: "thoughtful",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "As the celebration continues around you, Wei takes a moment alone at the edge of the rooftop, looking out at the valley."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "We have the resources now. Time to build something that will change the world.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "End of Episode 1: Silicon Dreams"
      }
    ],
    defaultNext: "ep2_intro" // This would point to the first scene of Episode 2
  },
  
  "ep1_ending_compromise_wei": {
    id: "ep1_ending_compromise_wei",
    episodeId: "ep1",
    title: "Silicon Dreams - Finale",
    location: "Nexus AI Office - Late Night",
    background: "/assets/backgrounds/office-night.jpg",
    narrative: [
      {
        type: "narration",
        text: "Most of the team has gone home. Only you and Kevin remain, sitting in the dim light of the conference room."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Five million buys us about eight months of runway. We need to be more efficient.",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "I know it's not what we hoped for, but it's not a rejection either. It's a challenge.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "We need to focus on fixing the scaling issues. That's what will convince them next time.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "And I'll work on lining up other investors. We shouldn't be so dependent on Sequoia.",
        emotion: "thoughtful",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Wei stares at the whiteboard filled with algorithm notes. This setback is frustrating, but also clarifying."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "I'm going to rewrite the core engine. By the time we go for Series A, it'll be bulletproof.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "That's the spirit. This isn't the end, it's just the beginning of chapter two.",
        emotion: "confident",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "End of Episode 1: Silicon Dreams"
      }
    ],
    defaultNext: "ep2_intro" // This would point to the first scene of Episode 2
  },

  // ... existing code continues ...

  // Kevin's Demo Outcomes
  "ep1_demo_fake_success": {
    id: "ep1_demo_fake_success",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "narration",
        text: "You carefully guide Jackson through the predetermined script, showcasing each feature exactly as rehearsed."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "And as you can see, our AI adapts instantly to the user's preferences, creating a seamless experience.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Wei follows your lead perfectly, handling the technical demonstrations while avoiding any deviation from the plan."
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "Very impressive. The response time is remarkable.",
        emotion: "happy",
        speakerPosition: "center"
      },
      {
        type: "narration",
        text: "You catch Wei's eye across the table. A silent understanding passes between you - you've pulled it off."
      }
    ],
    defaultNext: "ep1_investor_decision_positive_kevin"
  },
  
  "ep1_demo_fake_failure": {
    id: "ep1_demo_fake_failure",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "narration",
        text: "The demo begins well, with Jackson impressed by the initial features."
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "What happens if we try it with a completely different type of content? Say, scientific papers instead of news?",
        emotion: "thoughtful",
        speakerPosition: "center"
      },
      {
        type: "narration",
        text: "Your stomach drops. This wasn't in your scripted demo."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Well, we could certainly... Wei, would you like to show that feature?",
        emotion: "serious",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "I... that module isn't implemented in this build.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "Jackson's expression changes as he realizes the limitations of what you're showing."
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "I see. So this is more of a concept demo than a working product.",
        emotion: "frustrated",
        speakerPosition: "center",
        sceneEffect: "fadeToBlack"
      }
    ],
    defaultNext: "ep1_investor_decision_negative_kevin"
  },
  
  "ep1_demo_honest_pivot": {
    id: "ep1_demo_honest_pivot",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "narration",
        text: "As the demo begins, you feel a wave of discomfort about the deception."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Before we continue, I want to be transparent. What you're seeing is a prototype with some pre-programmed responses for demonstration purposes.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Wei looks shocked at your sudden honesty. Jackson raises an eyebrow."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "But the core technology is real, and with your investment, we can implement the full system within three months.",
        emotion: "confident",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "I appreciate your honesty, Kevin. Many founders try to fake it till they make it.",
        emotion: "neutral",
        speakerPosition: "center"
      },
      {
        type: "narration",
        text: "Wei relaxes slightly, though he still looks uncertain about this change in strategy."
      }
    ],
    defaultNext: "ep1_investor_decision_respect_kevin"
  },
  
  // Kevin's investor decisions
  "ep1_investor_decision_positive_kevin": {
    id: "ep1_investor_decision_positive_kevin",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Jackson",
        text: "This is exactly the kind of innovation we're looking to fund. The user experience is seamless.",
        emotion: "happy",
        speakerPosition: "center"
      },
      {
        type: "narration",
        text: "Jackson turns to his associates, who nod in agreement."
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "We're prepared to offer the full $15 million at the valuation we discussed. I believe Nexus AI has tremendous potential.",
        emotion: "neutral",
        speakerPosition: "center"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "That's fantastic news! Thank you for your confidence in our vision.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "You shake hands with Jackson, sealing the deal. As you leave the building, Wei pulls you aside."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "We did it. But now we have three months to make everything we just showed actually work.",
        emotion: "serious",
        speakerPosition: "left"
      }
    ],
    defaultNext: "ep1_ending_successful_kevin"
  },
  
  "ep1_investor_decision_negative_kevin": {
    id: "ep1_investor_decision_negative_kevin",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Jackson",
        text: "I think we've seen enough for today.",
        emotion: "frustrated",
        speakerPosition: "center"
      },
      {
        type: "narration",
        text: "Jackson signals to his associates, who begin packing up their notebooks."
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "Kevin, Wei, I appreciate your time, but I don't think this is the right investment for Sequoia at this stage.",
        emotion: "confident",
        speakerPosition: "center"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Jackson, please. We just need a little more time to fully implement—",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "I'd suggest getting the core technology working before your next investor pitch. Good luck with your venture.",
        emotion: "neutral",
        speakerPosition: "center"
      },
      {
        type: "narration",
        text: "The door closes behind Jackson and his team, leaving you and Wei in stunned silence."
      }
    ],
    defaultNext: "ep1_ending_failure_kevin"
  },
  
  "ep1_investor_decision_respect_kevin": {
    id: "ep1_investor_decision_respect_kevin",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Sequoia Capital - Conference Room",
    background: "/assets/backgrounds/investor-conference-room.jpg",
    narrative: [
      {
        type: "character",
        speaker: "Jackson",
        text: "Your honesty is refreshing, Kevin. Most founders oversell and underdeliver.",
        emotion: "happy",
        speakerPosition: "center"
      },
      {
        type: "narration",
        text: "Jackson consults briefly with his associates before turning back to you."
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "Here's what I'm thinking. We'll do a smaller round now - $7 million to get you to a working product. Then we'll reassess for the full Series A.",
        emotion: "neutral",
        speakerPosition: "center"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "That sounds fair. We can definitely show significant progress with that funding.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "With $7 million, we can hire the engineers we need to implement the full system.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Jackson",
        text: "Perfect. I like partners who can admit when they're not quite there yet. Shows integrity.",
        emotion: "neutral",
        speakerPosition: "center"
      }
    ],
    defaultNext: "ep1_ending_partial_kevin"
  },
  
  // Kevin's Endings for Episode 1
  "ep1_ending_successful_kevin": {
    id: "ep1_ending_successful_kevin",
    episodeId: "ep1",
    title: "Silicon Dreams - Finale",
    location: "Upscale Restaurant - San Francisco",
    background: "/assets/backgrounds/upscale-restaurant.jpg",
    narrative: [
      {
        type: "narration",
        text: "Two weeks later. You've arranged a celebration dinner at one of San Francisco's most exclusive restaurants. The team is in high spirits."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "To Nexus AI and our Series A! $15 million to revolutionize personalization!",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Everyone cheers and clinks glasses. The mood is electric with possibilities."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Wei, I want to particularly thank you. Your technical brilliance made this possible, even if we had to... streamline some things for the demo.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Just make sure I have the resources to deliver what we promised. We're on a tight timeline now.",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "Later that evening, you step outside for some air and check your phone. Three missed calls from other VC firms who heard about your Sequoia round."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "This is just the beginning. Silicon Valley rewards the bold.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "End of Episode 1: Silicon Dreams"
      }
    ],
    defaultNext: "ep2_intro" // This would point to the first scene of Episode 2
  },
  
  "ep1_ending_failure_kevin": {
    id: "ep1_ending_failure_kevin",
    episodeId: "ep1",
    title: "Silicon Dreams - Finale",
    location: "Nexus AI Office - Night",
    background: "/assets/backgrounds/office-night.jpg",
    narrative: [
      {
        type: "narration",
        text: "Three days after the disastrous Sequoia meeting. The office is quiet - most of the team left early, sensing the grim mood."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "We need to talk about our runway. Without new funding, we have about two months left.",
        emotion: "serious",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "I know. I've been calling every investor contact I have. Word about the Sequoia rejection has spread.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "We should have focused on building a real product instead of faking it.",
        emotion: "frustrated",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "You run your hands through your hair, exhausted. The weight of the company's future rests heavily on your shoulders."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "We still have options. We could try for an acqui-hire with one of the big tech companies.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Is that what this was all about? Building something just to sell it off?",
        emotion: "frustrated",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "The tension between you is palpable. Dreams of changing the world now replaced by desperate survival strategies."
      },
      {
        type: "narration",
        text: "End of Episode 1: Silicon Dreams"
      }
    ],
    defaultNext: "ep2_intro" // This would point to the first scene of Episode 2
  },
  
  "ep1_ending_partial_kevin": {
    id: "ep1_ending_partial_kevin",
    episodeId: "ep1",
    title: "Silicon Dreams - Finale",
    location: "Nexus AI Office - Afternoon",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "One month after securing the $7 million investment. The office has transformed - new equipment, several new engineers, and a palpable sense of purpose."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Wei, how's progress on the implementation? Jackson wants a monthly update.",
        emotion: "thoughtful",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "We're on track. The new team is solid, and we've solved the core scaling issues. It's not just smoke and mirrors anymore.",
        emotion: "happy",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "You nod, relieved. Your gamble on honesty has paid off, even if it meant a smaller initial investment."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Your honesty saved us that day. I was ready to bluff our way through.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Sometimes the best move is just telling the truth. We've got a real shot at building something meaningful now.",
        emotion: "happy",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "And when we show Jackson the real product in two months, that full Series A will be ours.",
        emotion: "confident",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "End of Episode 1: Silicon Dreams"
      }
    ],
    defaultNext: "ep2_intro" // This would point to the first scene of Episode 2
  },

  // ... existing code continues ...

  // The following are scenes that need connections to endings

  // Demo preparation and planning scenes
  "ep1_team_montage": {
    id: "ep1_team_montage",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "The week passes in a blur of intense activity. The entire office transforms into a dedicated machine focused on one goal."
      },
      {
        type: "narration",
        text: "Engineers code through the night, designers refine the interface, and the testing team mercilessly hunts for bugs."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "The optimization is working. Load times are down 40% and the recommendations are more accurate.",
        emotion: "happy",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "This is incredible work, everyone. Sequoia is going to be blown away.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "The night before the demo, the team runs through a final rehearsal. Everything comes together beautifully."
      }
    ],
    defaultNext: "ep1_demo_day"
  },
  
  "ep1_cutting_corners_montage": {
    id: "ep1_cutting_corners_montage",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "The week is a strategic exercise in creating the illusion of a perfect product. The team focuses on the surface elements that will impress investors."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "I've hard-coded the responses for the demo scenarios. It'll look impressive, as long as they don't go off-script.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Perfect. I'll make sure Jackson sticks to our planned examples.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "The UI team creates beautiful animations and transitions that mask the limitations of the underlying technology."
      },
      {
        type: "narration",
        text: "By the end of the week, you have a stunning demo that showcases an idealized version of what Nexus AI could be."
      }
    ],
    defaultNext: "ep1_demo_day_fake"
  },
  
  "ep1_crunch_time": {
    id: "ep1_crunch_time",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "With the extension request denied, the team goes into full crunch mode. Everyone works around the clock to prepare for the demo."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "We need to prioritize. What's the absolute minimum we need to show to impress Jackson?",
        emotion: "thoughtful",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "The core recommendation engine, the user interface, and at least one impressive use case.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Coffee cups pile up, take-out containers overflow the trash bins, and the office becomes a second home."
      },
      {
        type: "narration",
        text: "By the final day, you have a working demo that's imperfect but showcases the potential of your technology."
      }
    ],
    defaultNext: "ep1_demo_day"
  },
  
  "ep1_collaborative_montage": {
    id: "ep1_collaborative_montage",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "For the first time in months, you and Wei work side by side, reminiscent of the early days when you founded the company."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "What if we emphasize this feature? It really showcases how our approach differs from competitors.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Good idea. I can optimize this section to make it run even smoother.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "The synergy between you is contagious, energizing the entire team. Progress accelerates as innovative solutions emerge from your collaboration."
      },
      {
        type: "narration",
        text: "When the day of the demo arrives, not only is the product ready, but your partnership feels stronger than ever."
      }
    ],
    defaultNext: "ep1_demo_day"
  },
  
  "ep1_parallel_work": {
    id: "ep1_parallel_work",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "You and Wei work in parallel, each focusing on your areas of expertise. Wei leads the engineering team while you prepare the investment pitch."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "The pitch deck is coming together beautifully. I've emphasized our unique approach to personalization.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "The algorithm is stable now. It won't scale beyond a million users yet, but it will handle the demo perfectly.",
        emotion: "confident",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "Daily check-ins keep both sides aligned. The division of responsibilities proves efficient, if somewhat impersonal."
      },
      {
        type: "narration",
        text: "By the end of the week, both the technical demo and the business presentation are polished and ready."
      }
    ],
    defaultNext: "ep1_demo_day"
  },
  
  "ep1_outsourced_work": {
    id: "ep1_outsourced_work",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "The freelance developers Kevin brought in quickly get to work on the user interface and API integrations."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "These external developers are actually pretty good. The UI is looking much better.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "I told you I'd find the best. They're expensive, but worth it for this demo.",
        emotion: "happy",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "Wei focuses on the core algorithm while the freelancers handle everything else. The arrangement works well, with Wei reviewing all code before integration."
      },
      {
        type: "narration",
        text: "The week passes productively, resulting in a polished demo that effectively showcases your technology."
      }
    ],
    defaultNext: "ep1_demo_day"
  },
  
  "ep1_demo_strained_planning": {
    id: "ep1_demo_strained_planning",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "The tension between you and Wei is palpable as you work on preparations for the demo."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "I've listed all the technical modifications needed. We'll need the entire team working overtime.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Make it happen. Whatever resources you need, just ask.",
        emotion: "frustrated",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "The frosty interactions extend throughout the week. Communication is minimal and purely functional."
      },
      {
        type: "narration",
        text: "Despite the strained relationship, both of you are professionals. The work gets done, even if the process is uncomfortable."
      }
    ],
    defaultNext: "ep1_demo_day"
  },
  
  "ep1_demo_focused_planning": {
    id: "ep1_demo_focused_planning",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "You and Wei develop a tightly focused plan, concentrating on a few key features rather than trying to show everything."
      },
      {
        type: "character",
        speaker: "Wei",
        text: "If we focus just on these core features, we can make them rock solid in a week.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Perfect. Quality over quantity. Let's make these few features absolutely flawless.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "narration",
        text: "The team rallies around this focused approach. Without the pressure to implement everything, they can perfect what matters most."
      },
      {
        type: "narration",
        text: "By the end of the week, you have a limited but extremely polished demo that showcases your best work."
      }
    ],
    defaultNext: "ep1_demo_day"
  },
  
  "ep1_demo_team_coding": {
    id: "ep1_demo_team_coding",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Nexus AI Office",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: "True to your word, you roll up your sleeves and dive back into coding alongside Wei and the team."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "I've optimized the front-end response time. It's 30% faster now.",
        emotion: "thoughtful",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "Impressive. You haven't lost your touch. I've restructured the algorithm to handle the demo scenarios more efficiently.",
        emotion: "happy",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "The rest of the team is energized seeing both founders coding side by side. Productivity soars as everyone pulls together."
      },
      {
        type: "narration",
        text: "Working through the night before the demo, you put the finishing touches on a product that reflects the best of both your skills."
      }
    ],
    defaultNext: "ep1_demo_day"
  },
  
  "ep1_demo_collaborative_planning": {
    id: "ep1_demo_collaborative_planning",
    episodeId: "ep1",
    title: "Silicon Dreams",
    location: "Conference Room",
    background: "/assets/backgrounds/conference-room.jpg",
    narrative: [
      {
        type: "narration",
        text: "With a new understanding of each other's concerns, you and Kevin develop a balanced plan for the demo."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "Let's make sure the demo showcases both the technology and its business potential.",
        emotion: "neutral",
        speakerPosition: "right"
      },
      {
        type: "character",
        speaker: "Wei",
        text: "I can implement some temporary optimizations that will work for the demo, while highlighting where we plan to improve later.",
        emotion: "neutral",
        speakerPosition: "left"
      },
      {
        type: "narration",
        text: "You spend the evening mapping out a strategy that addresses both the technical challenges and presentation needs."
      },
      {
        type: "character",
        speaker: "Kevin",
        text: "This is good. We're showing Jackson something real, but also communicating our vision for the future.",
        emotion: "happy",
        speakerPosition: "right"
      }
    ],
    defaultNext: "ep1_demo_day"
  },

  // Add ep2_intro as a placeholder for future episodes
  "ep2_intro": {
    id: "ep2_intro",
    episodeId: "ep2",
    title: "To Be Continued...",
    location: "Coming Soon",
    background: "/assets/backgrounds/silicon-valley-aerial.jpg",
    narrative: [
      {
        type: "narration",
        text: "Episode 2 is currently in development. Thank you for playing Episode 1: Silicon Dreams!"
      },
      {
        type: "narration",
        text: "The story of Nexus AI will continue soon..."
      }
    ],
    defaultNext: "ep1_intro" // Loops back to start for now
  },

  "ep1_scene9_breaking_news": {
    id: "ep1_scene9_breaking_news",
    episodeId: "ep1",
    title: "Breaking News",
    location: "Outside Nexus AI Building",
    background: "/assets/backgrounds/office-exterior.jpg",
    narrative: [
      {
        type: "narration",
        text: "As the meeting happens inside, a news alert flashes on a phone belonging to a Pinnacle analyst waiting outside:"
      },
      {
        type: "narration",
        text: '"BREAKING: OpenMind AI accelerates launch of quantum model. CEO announces release in TWO WEEKS, ahead of schedule."'
      }
    ],
    defaultNext: "coming_soon"
  },

  "ep1_scene10_episode_end": {
    id: "ep1_scene10_episode_end",
    episodeId: "ep1",
    title: "Episode End",
    location: "Nexus AI Headquarters",
    background: "/assets/backgrounds/nexus-office-interior.jpg",
    narrative: [
      {
        type: "narration",
        text: 'End of Episode 1: "Silicon Dreams"'
      },
      {
        type: "narration",
        text: "Your decisions have shaped the beginning of this story. The consequences will unfold in future episodes..."
      }
    ],
    defaultNext: "coming_soon"
  }
}; 
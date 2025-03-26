// Episode data for the game
export const episodes = [
  {
    id: 'ep1',
    title: 'Silicon Dreams',
    description: 'The Nexus AI team faces a critical juncture as they prepare for a potential acquisition.',
    defaultBackground: '/assets/backgrounds/silicon-valley-aerial.jpg',
    scenes: [
      // Scene 1 - Intro
      {
        id: 'ep1_scene1',
        location: 'Silicon Valley - Aerial View',
        background: '/assets/backgrounds/silicon-valley-aerial.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'Sprawling tech campuses dominate the landscape. The gleaming headquarters of Google, Apple, and Facebook stand as monuments to innovation and wealth.'
          },
          {
            type: 'narration',
            text: 'But not every tech company exists at such scale. Some dreams are still taking shape in more modest surroundings...'
          }
        ],
        decisions: null
      },
      
      // Scene 2 - Office Exterior
      {
        id: 'ep1_scene2',
        location: 'Modest Office Building - Exterior',
        background: '/assets/backgrounds/modest-office-building.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'A stark contrast to the tech giants\' campuses. A small office building with a sign that reads "NEXUS AI - 3rd Floor."'
          }
        ],
        decisions: null
      },
      
      // Scene 3 - Nexus AI Office
      {
        id: 'ep1_scene3',
        location: 'Nexus AI Headquarters',
        background: '/assets/backgrounds/nexus-office-interior.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'A cramped open office with about 15 employees working intensely at clustered desks. The space is utilitarian but with touches of startup culture—a ping pong table covered with paperwork, motivational posters, and whiteboards filled with code.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'We need to completely rewrite the recommendation algorithm. The current version won\'t scale beyond a million users.'
          }
        ],
        decisions: null
      },
      
      // Scene 4 - Kevin Enters (Wei)
      {
        id: 'ep1_scene4_wei',
        character: 'wei',
        location: 'Nexus AI Headquarters',
        background: '/assets/backgrounds/nexus-office-interior.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'Wei stands in front of a whiteboard, coding furiously. Dark circles under his eyes suggest he hasn\'t slept in days.'
          },
          {
            type: 'narration',
            text: 'Kevin Liu enters, carrying a designer coffee. He exudes confidence and charm that seems out of place in the modest office.'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'Good morning, everyone! Beautiful day in the Valley!'
          },
          {
            type: 'narration',
            text: 'Wei barely acknowledges Kevin\'s entrance. The employees nod respectfully.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'You\'re late. Again.'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'It\'s 8:30, Wei. Normal business hours.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'I\'ve been here since 5. We\'re rewriting the entire recommendation algorithm.'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'And I\'ve been up since 4 dining with Jackson Wong from Sequoia Capital.'
          },
          {
            type: 'narration',
            text: 'This catches Wei\'s attention. He turns.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'Jackson? What did he say?'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'Let\'s talk in private.'
          }
        ],
        decisions: {
          prompt: 'How should Wei respond to Kevin?',
          quote: '"The goal isn\'t just to build something that will change the world, but to build something that will last." - Kevin Systrom',
          options: [
            {
              id: 'enthusiastic',
              text: 'Show enthusiasm about the investor meeting',
              preview: 'Put aside your coding frustration to focus on this business opportunity',
              relationshipEffects: {
                kevin: 5
              },
              nextScene: 'ep1_scene5_meeting'
            },
            {
              id: 'hesitant',
              text: 'Express concern about the timeline',
              preview: 'Prioritize the technical issues that need to be solved',
              relationshipEffects: {
                kevin: -5
              },
              nextScene: 'ep1_scene5_meeting'
            },
            {
              id: 'multitask',
              text: 'Bring your laptop to continue coding during the meeting',
              preview: 'Try to balance both priorities at once',
              relationshipEffects: {
                kevin: -3
              },
              nextScene: 'ep1_scene5_meeting'
            }
          ]
        }
      },
      
      // Scene 4 Alternate - Kevin's Entrance (Kevin)
      {
        id: 'ep1_scene4_kevin',
        character: 'kevin',
        location: 'Nexus AI Headquarters',
        background: '/assets/backgrounds/nexus-office-interior.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'You enter the office, designer coffee in hand, having just come from an early breakfast meeting with Jackson Wong from Sequoia Capital.'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'Good morning, everyone! Beautiful day in the Valley!'
          },
          {
            type: 'narration',
            text: 'The employees nod respectfully. Wei barely acknowledges your entrance, standing at a whiteboard filled with code. Dark circles under his eyes suggest he hasn\'t slept.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'You\'re late. Again.'
          },
          {
            type: 'narration',
            text: 'You check your Rolex - it\'s 8:30 AM. Completely reasonable.'
          }
        ],
        decisions: {
          prompt: 'How do you respond to Wei?',
          quote: '"Sometimes the people with the worst past create the best future." - Umar Patek',
          options: [
            {
              id: 'businessHours',
              text: 'Point out it\'s normal business hours',
              preview: 'Defend your schedule as perfectly reasonable',
              relationshipEffects: {
                wei: -5
              },
              nextScene: 'ep1_scene4_kevin_continued'
            },
            {
              id: 'apologetic',
              text: 'Apologize and mention the investor meeting',
              preview: 'Acknowledge Wei\'s frustration but highlight the important business reason',
              relationshipEffects: {
                wei: 5
              },
              nextScene: 'ep1_scene4_kevin_continued'
            },
            {
              id: 'bringCoffee',
              text: 'Hand Wei a coffee you brought for him',
              preview: 'You anticipated his mood and came prepared',
              relationshipEffects: {
                wei: 10
              },
              nextScene: 'ep1_scene4_kevin_continued_coffee'
            }
          ]
        }
      },
      
      // Kevin Scene Continuation
      {
        id: 'ep1_scene4_kevin_continued',
        character: 'kevin',
        location: 'Nexus AI Headquarters',
        background: '/assets/backgrounds/nexus-office-interior.jpg',
        narrative: [
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'It\'s 8:30, Wei. Normal business hours.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'I\'ve been here since 5. We\'re rewriting the entire recommendation algorithm.'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'And I\'ve been up since 4 dining with Jackson Wong from Sequoia Capital.'
          },
          {
            type: 'narration',
            text: 'This catches Wei\'s attention. He turns.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'Jackson? What did he say?'
          }
        ],
        decisions: {
          prompt: 'How do you want to share the news?',
          quote: '"The best way to predict the future is to create it." - Peter Drucker',
          options: [
            {
              id: 'private',
              text: 'Suggest talking in private',
              preview: 'This is sensitive information that shouldn\'t be shared with the whole team yet',
              relationshipEffects: {},
              nextScene: 'ep1_scene5_meeting'
            },
            {
              id: 'excitedly',
              text: 'Share the exciting news with everyone',
              preview: 'Boost team morale by announcing the potential acquisition interest',
              relationshipEffects: {
                wei: -10
              },
              nextScene: 'ep1_scene5_meeting_conflict'
            },
            {
              id: 'downplay',
              text: 'Downplay it now but hint at good news',
              preview: 'Keep expectations managed while building anticipation',
              relationshipEffects: {
                wei: 3
              },
              nextScene: 'ep1_scene5_meeting'
            }
          ]
        }
      },
      
      // Kevin Coffee Scene Continuation
      {
        id: 'ep1_scene4_kevin_continued_coffee',
        character: 'kevin',
        location: 'Nexus AI Headquarters',
        background: '/assets/backgrounds/nexus-office-interior.jpg',
        narrative: [
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'I figured you\'d been here all night. Black, two sugars - just how you like it.'
          },
          {
            type: 'narration',
            text: 'Wei\'s expression softens slightly as he takes the coffee.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'Thanks... So how was the meeting?'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'That\'s what I wanted to talk to you about. Jackson connected me with Pinnacle Ventures.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'Pinnacle? They only get involved when acquisition is on the table.'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'Exactly. Let\'s talk somewhere private.'
          }
        ],
        decisions: {
          prompt: 'How much should you reveal to Wei right now?',
          quote: '"Trust is built with consistency." - Lincoln Chafee',
          options: [
            {
              id: 'fullDetails',
              text: 'Share all the details about the potential deal',
              preview: 'Be completely transparent with your co-founder',
              relationshipEffects: {
                wei: 5
              },
              nextScene: 'ep1_scene5_meeting'
            },
            {
              id: 'partialInfo',
              text: 'Hold back the timeline concerns',
              preview: 'Don\'t mention OpenMind\'s upcoming release yet',
              relationshipEffects: {
                wei: -5
              },
              nextScene: 'ep1_scene5_meeting'
            },
            {
              id: 'askInput',
              text: 'Ask Wei if the product will be ready for acquisition',
              preview: 'Get his technical assessment before proceeding',
              relationshipEffects: {
                wei: 10
              },
              nextScene: 'ep1_scene5_meeting_technical'
            }
          ]
        }
      },
      
      // Scene 5 - Meeting Room
      {
        id: 'ep1_scene5_meeting',
        location: 'Nexus AI - Small Conference Room',
        background: '/assets/backgrounds/conference-room.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'Wei and Kevin sit across from each other. The room has glass walls—everyone can see them but not hear them.'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'It\'s happening. Pinnacle Ventures is sending their team tomorrow.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'Tomorrow? That\'s too soon. The new feature set isn\'t ready.'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'Not my call. Charles Westbrook himself wants to come. Do you understand what this means? Pinnacle only acquires when they\'re serious.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'How much?'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'They\'re talking about $200 million.'
          },
          {
            type: 'narration',
            text: 'Wei falls back in his chair, stunned.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'Jesus. Does... does Westbrook know about OpenMind\'s announcement?'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'No one outside the industry is connecting those dots yet. As far as Pinnacle is concerned, our predictive engine is still revolutionary.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'But it won\'t be. Not in a month.'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'Exactly. Once OpenMind releases their quantum model, our technology becomes obsolete overnight. We have four weeks to close this deal.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'Four weeks before five years of work becomes worthless.'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'Four weeks to become multimillionaires. Focus, Wei.'
          }
        ],
        decisions: {
          prompt: 'What should be the priority now?',
          quote: '"Ethics is knowing the difference between what you have a right to do and what is right to do." - Potter Stewart',
          options: [
            {
              id: 'prepareDemo',
              text: 'Prepare the most impressive demo possible',
              preview: 'Focus on showcasing what works well, even if incomplete',
              relationshipEffects: {
                kevin: 5
              },
              nextScene: 'ep1_scene6_kevin_tesla'
            },
            {
              id: 'discloseRisks',
              text: 'Plan to disclose the risks to Pinnacle',
              preview: 'Be honest about OpenMind\'s upcoming release',
              relationshipEffects: {
                kevin: -10
              },
              nextScene: 'ep1_scene6_kevin_tesla'
            },
            {
              id: 'accelerateDevelopment',
              text: 'Try to accelerate development of new features',
              preview: 'Work through the night to improve the product',
              relationshipEffects: {
                kevin: 3
              },
              nextScene: 'ep1_scene6_wei_working'
            }
          ]
        }
      },

      // Additional scenes...
      {
        id: 'ep1_scene6_kevin_tesla',
        character: 'kevin',
        location: 'Kevin\'s Tesla',
        background: '/assets/backgrounds/tesla-interior.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'Kevin drives his brand new Model S through the streets of Palo Alto, heading home after a long day of preparation for tomorrow\'s meeting.'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'Honey, I\'m on my way. Did you make the reservation?'
          },
          {
            type: 'character',
            speaker: 'Sophia (V.O.)',
            text: 'Yes, 8 PM at Nobu. Are you sure we should be spending like this right now?'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'We\'re celebrating. Pinnacle is coming tomorrow.'
          },
          {
            type: 'character',
            speaker: 'Sophia (V.O.)',
            text: 'Oh my god! Really? Should I call the realtor about the Woodside property?'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'Not yet. Let\'s get through this week first.'
          },
          {
            type: 'character',
            speaker: 'Sophia (V.O.)',
            text: 'Kevin, that house will be gone if we wait. It\'s nine million and it\'s already underpriced for the neighborhood.'
          }
        ],
        decisions: {
          prompt: 'How do you handle Sophia\'s request?',
          quote: '"Money is a terrible master but an excellent servant." - P.T. Barnum',
          options: [
            {
              id: 'agreeHouse',
              text: 'Tell her to call the realtor',
              preview: 'Make a deposit on the house to secure it',
              relationshipEffects: {
                sophia: 10,
                wei: -5
              },
              nextScene: 'ep1_scene7_meeting_prep'
            },
            {
              id: 'delayHouse',
              text: 'Insist on waiting until the deal is signed',
              preview: 'Be financially prudent until the money is guaranteed',
              relationshipEffects: {
                sophia: -5
              },
              nextScene: 'ep1_scene7_meeting_prep'
            },
            {
              id: 'compromiseHouse',
              text: 'Suggest looking at slightly less expensive options',
              preview: 'Try to find a middle ground that satisfies both of you',
              relationshipEffects: {
                sophia: -3
              },
              nextScene: 'ep1_scene7_meeting_prep'
            }
          ]
        }
      },
      
      {
        id: 'ep1_scene6_wei_working',
        character: 'wei',
        location: 'Wei\'s Apartment',
        background: '/assets/backgrounds/wei-apartment.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'Wei\'s studio apartment is sparse, functional, and small. Takeout containers and empty energy drink cans litter the desk where Wei sits, still coding.'
          },
          {
            type: 'narration',
            text: 'His phone buzzes with a text message.'
          },
          {
            type: 'narration',
            text: 'On screen: Text from MELISSA ZHANG: "It\'s Dad\'s birthday dinner. Are you really not coming?"'
          },
          {
            type: 'narration',
            text: 'Wei looks at a framed photo of his wife and young daughter, then back at his code. He sighs.'
          }
        ],
        decisions: {
          prompt: 'What will Wei do about the family dinner?',
          quote: '"The best way to find yourself is to lose yourself in the service of others." - Gandhi',
          options: [
            {
              id: 'skipDinner',
              text: 'Stay and continue working',
              preview: 'The acquisition is a once-in-a-lifetime opportunity that can\'t wait',
              relationshipEffects: {
                melissa: -10
              },
              nextScene: 'ep1_scene7_meeting_prep'
            },
            {
              id: 'attendDinner',
              text: 'Go to the family dinner',
              preview: 'Family comes first, even during crucial business moments',
              relationshipEffects: {
                melissa: 10,
                kevin: -5
              },
              nextScene: 'ep1_scene7_family_dinner'
            },
            {
              id: 'videocall',
              text: 'Join by video call for part of the dinner',
              preview: 'Try to find a compromise between work and family',
              relationshipEffects: {
                melissa: -3
              },
              nextScene: 'ep1_scene7_meeting_prep'
            }
          ]
        }
      },
      
      // Additional scenes would continue here...
      
      {
        id: 'ep1_scene7_meeting_prep',
        location: 'Nexus AI Headquarters',
        background: '/assets/backgrounds/nexus-office-night.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'Late night at the office. The team is working frantically to prepare for tomorrow\'s presentation.'
          },
          {
            type: 'narration',
            text: 'The office has been transformed—clean, professional, with product demos set up. The team is dressed formally.'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'Everything needs to be perfect. Westbrook is known for his attention to detail.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'The demo is as good as it\'s going to get with the time we have. I\'ve hidden the unfinished modules.'
          }
        ],
        decisions: null
      },
      
      {
        id: 'ep1_scene7_family_dinner',
        character: 'wei',
        location: 'Melissa\'s Parents\' Home',
        background: '/assets/backgrounds/family-dinner.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'The Zhang family home is warm and inviting, filled with the aroma of traditional Chinese dishes. Melissa\'s father, a retired professor, sits at the head of the table.'
          },
          {
            type: 'character',
            speaker: 'Melissa',
            text: 'I\'m glad you came. Dad was worried you\'d miss it again.',
            emotion: 'relieved'
          },
          {
            type: 'character',
            speaker: 'Melissa\'s Father',
            text: 'How is the startup going? Still working on that AI thing?'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'Yes, we have a big meeting tomorrow with Pinnacle Capital.'
          },
          {
            type: 'character',
            speaker: 'Melissa',
            text: 'Wei has been working really hard. But I\'m proud of him.',
            emotion: 'supportive'
          },
          {
            type: 'character',
            speaker: 'Melissa\'s Mother',
            text: 'And how is your job at Google, Melissa?'
          },
          {
            type: 'character',
            speaker: 'Melissa',
            text: 'It\'s going well. I\'m up for a promotion next month.',
            emotion: 'proud'
          }
        ],
        decisions: {
          prompt: 'How does Wei handle the family dinner?',
          quote: '"Family is not an important thing. It\'s everything." - Michael J. Fox',
          options: [
            {
              id: 'engageFamily',
              text: 'Engage fully with the family',
              preview: 'Put aside work concerns and focus on family',
              relationshipEffects: {
                melissa: 15
              },
              nextScene: 'ep1_scene8_acquisition_meeting'
            },
            {
              id: 'checkWork',
              text: 'Check work messages discreetly',
              preview: 'Stay connected while being present',
              relationshipEffects: {
                melissa: -5
              },
              nextScene: 'ep1_scene8_acquisition_meeting'
            },
            {
              id: 'discussFuture',
              text: 'Discuss future plans with Melissa\'s parents',
              preview: 'Share your vision while respecting family time',
              relationshipEffects: {
                melissa: 5
              },
              nextScene: 'ep1_scene8_acquisition_meeting'
            }
          ]
        }
      },

      {
        id: 'ep1_scene7_sophia_office',
        character: 'kevin',
        location: 'Sophia\'s VC Office',
        background: '/assets/backgrounds/vc-office.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'Sophia\'s corner office at her venture capital firm overlooks Sand Hill Road. She\'s reviewing a pitch deck when Kevin arrives.'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'You\'re early. I thought you\'d be preparing for tomorrow.',
            emotion: 'surprised'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'I wanted to talk about the house situation.'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'I\'ve already spoken with the realtor. They\'re willing to hold it for 48 hours if we put down a deposit.',
            emotion: 'determined'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'Sophia, we need to be careful with our finances right now.'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'This is exactly the right time. The market is perfect, and this house is underpriced.',
            emotion: 'insistent'
          }
        ],
        decisions: {
          prompt: 'How does Kevin handle Sophia\'s persistence?',
          quote: '"The best investment is in yourself." - Warren Buffett',
          options: [
            {
              id: 'agreeSophia',
              text: 'Agree to the deposit',
              preview: 'Trust Sophia\'s judgment on the real estate market',
              relationshipEffects: {
                sophia: 15
              },
              nextScene: 'ep1_scene8_acquisition_meeting'
            },
            {
              id: 'resistSophia',
              text: 'Firmly resist the purchase',
              preview: 'Stand your ground on financial prudence',
              relationshipEffects: {
                sophia: -10
              },
              nextScene: 'ep1_scene8_acquisition_meeting'
            },
            {
              id: 'compromiseSophia',
              text: 'Suggest a smaller property',
              preview: 'Find middle ground between ambition and caution',
              relationshipEffects: {
                sophia: -3
              },
              nextScene: 'ep1_scene8_acquisition_meeting'
            }
          ]
        }
      },

      {
        id: 'ep1_scene8_melissa_google',
        character: 'wei',
        location: 'Google Campus',
        background: '/assets/backgrounds/google-campus.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'Wei meets Melissa at Google\'s campus for lunch. She\'s just come from a meeting about her promotion.'
          },
          {
            type: 'character',
            speaker: 'Melissa',
            text: 'They offered me the position. Senior Product Manager.',
            emotion: 'excited'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'That\'s amazing! Congratulations!'
          },
          {
            type: 'character',
            speaker: 'Melissa',
            text: 'But it means more responsibility, longer hours...',
            emotion: 'concerned'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'We\'ll figure it out. After the acquisition...'
          },
          {
            type: 'character',
            speaker: 'Melissa',
            text: 'Wei, we need to talk about our future. This can\'t go on forever.',
            emotion: 'serious'
          }
        ],
        decisions: {
          prompt: 'How does Wei respond to Melissa\'s concerns?',
          quote: '"The only way to do great work is to love what you do." - Steve Jobs',
          options: [
            {
              id: 'supportMelissa',
              text: 'Support her career fully',
              preview: 'Commit to better work-life balance',
              relationshipEffects: {
                melissa: 15
              },
              nextScene: 'ep1_scene9_acquisition_result'
            },
            {
              id: 'delayDiscussion',
              text: 'Ask to discuss after the acquisition',
              preview: 'Focus on the immediate opportunity',
              relationshipEffects: {
                melissa: -5
              },
              nextScene: 'ep1_scene9_acquisition_result'
            },
            {
              id: 'compromiseMelissa',
              text: 'Propose a timeline for change',
              preview: 'Acknowledge the issue and plan for improvement',
              relationshipEffects: {
                melissa: 5
              },
              nextScene: 'ep1_scene9_acquisition_result'
            }
          ]
        }
      },

      {
        id: 'ep1_scene8_sophia_social',
        character: 'kevin',
        location: 'Silicon Valley Country Club',
        background: '/assets/backgrounds/country-club.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'Sophia hosts a pre-meeting gathering at the country club. The Valley\'s elite are in attendance.'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'Everyone is talking about the Pinnacle deal. This could be huge for us.',
            emotion: 'excited'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'We should keep this quiet until tomorrow.'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'Too late. I may have mentioned it to a few key people.',
            emotion: 'confident'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'Sophia, what if the deal doesn\'t happen?'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'It will happen. I\'ve already started planning our next steps.',
            emotion: 'determined'
          }
        ],
        decisions: {
          prompt: 'How does Kevin handle Sophia\'s social maneuvering?',
          quote: '"Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill',
          options: [
            {
              id: 'trustSophia',
              text: 'Trust her judgment',
              preview: 'Support her social strategy',
              relationshipEffects: {
                sophia: 15
              },
              nextScene: 'ep1_scene9_acquisition_result'
            },
            {
              id: 'cautionSophia',
              text: 'Express concern about the risks',
              preview: 'Urge more caution in social dealings',
              relationshipEffects: {
                sophia: -5
              },
              nextScene: 'ep1_scene9_acquisition_result'
            },
            {
              id: 'compromiseSophia',
              text: 'Suggest more controlled messaging',
              preview: 'Find balance between ambition and prudence',
              relationshipEffects: {
                sophia: 0
              },
              nextScene: 'ep1_scene9_acquisition_result'
            }
          ]
        }
      },
      
      {
        id: 'ep1_scene8_acquisition_meeting',
        location: 'Nexus AI Headquarters - Conference Room',
        background: '/assets/backgrounds/conference-room-meeting.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'The next morning. Kevin paces, checking his phone.'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'They\'re two minutes late.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'Normal business hours, right?'
          },
          {
            type: 'narration',
            text: 'The elevator dings. In walks CHARLES WESTBROOK (60s, imposing, old-school VC) with his team of analysts.'
          },
          {
            type: 'character',
            speaker: 'Charles',
            text: 'Kevin, Wei. Charles Westbrook. I\'ve heard fascinating things about what you\'re building here.'
          },
          {
            type: 'narration',
            text: 'Kevin and Wei exchange a look—this is their moment.'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'Mr. Westbrook, what we\'re about to show you will change the future of predictive analytics.'
          },
          {
            type: 'character',
            speaker: 'Wei',
            text: 'For the next month, at least.'
          }
        ],
        decisions: null
      },
      
      {
        id: 'ep1_scene9_breaking_news',
        location: 'Outside Nexus AI Building',
        background: '/assets/backgrounds/office-exterior.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'As the meeting happens inside, a news alert flashes on a phone belonging to a Pinnacle analyst waiting outside:'
          },
          {
            type: 'narration',
            text: '"BREAKING: OpenMind AI accelerates launch of quantum model. CEO announces release in TWO WEEKS, ahead of schedule."'
          }
        ],
        decisions: null
      },
      
      {
        id: 'ep1_scene10_episode_end',
        location: 'Nexus AI Headquarters',
        background: '/assets/backgrounds/nexus-office-interior.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'End of Episode 1: "Silicon Dreams"'
          },
          {
            type: 'narration',
            text: 'Your decisions have shaped the beginning of this story. The consequences will unfold in Episode 2: "Quantum Leap"'
          }
        ],
        decisions: null
      },

      {
        id: 'ep1_scene5_sophia_network',
        character: 'kevin',
        location: 'Palo Alto Coffee Shop',
        background: '/assets/backgrounds/coffee-shop.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'Sophia meets with her network of venture capitalists at a trendy Palo Alto coffee shop. The conversation turns to Nexus AI.'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'The technology is impressive, but the team needs more polish.',
            emotion: 'professional'
          },
          {
            type: 'character',
            speaker: 'VC Partner',
            text: 'We\'ve heard rumors about Pinnacle\'s interest.'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'Yes, but there might be other opportunities. I\'m thinking about introducing them to some of my contacts.',
            emotion: 'strategic'
          },
          {
            type: 'character',
            speaker: 'VC Partner',
            text: 'Isn\'t that a conflict of interest?'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'In Silicon Valley, it\'s all about who you know. I\'m just facilitating connections.',
            emotion: 'confident'
          }
        ],
        decisions: {
          prompt: 'How does Kevin handle Sophia\'s networking?',
          quote: '"Your network is your net worth." - Porter Gale',
          options: [
            {
              id: 'supportNetwork',
              text: 'Support her networking efforts',
              preview: 'Trust her judgment in building connections',
              relationshipEffects: {
                sophia: 10
              },
              nextScene: 'ep1_scene6_kevin_tesla'
            },
            {
              id: 'cautionNetwork',
              text: 'Express concern about conflicts',
              preview: 'Warn about potential ethical issues',
              relationshipEffects: {
                sophia: -5
              },
              nextScene: 'ep1_scene6_kevin_tesla'
            },
            {
              id: 'compromiseNetwork',
              text: 'Suggest more transparent approach',
              preview: 'Find middle ground between networking and ethics',
              relationshipEffects: {
                sophia: 0
              },
              nextScene: 'ep1_scene6_kevin_tesla'
            }
          ]
        }
      },

      {
        id: 'ep1_scene7_sophia_career',
        character: 'kevin',
        location: 'Sophia\'s VC Office',
        background: '/assets/backgrounds/vc-office.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'Sophia is preparing for a partner meeting at her VC firm. Her office is filled with pitch decks and market analysis.'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'I\'m up for partner this year. This deal could be my ticket.',
            emotion: 'determined'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'You\'re already doing great work.'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'But I need something big. Something that proves I belong at the top.',
            emotion: 'ambitious'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'What about the house? We can wait if you need to focus on this.'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'No, we need both. I can handle it. I always do.',
            emotion: 'confident'
          }
        ],
        decisions: {
          prompt: 'How does Kevin support Sophia\'s career?',
          quote: '"The only way to do great work is to love what you do." - Steve Jobs',
          options: [
            {
              id: 'supportCareer',
              text: 'Fully support her career goals',
              preview: 'Put her career advancement first',
              relationshipEffects: {
                sophia: 15
              },
              nextScene: 'ep1_scene8_sophia_social'
            },
            {
              id: 'balanceCareer',
              text: 'Suggest finding balance',
              preview: 'Encourage work-life balance',
              relationshipEffects: {
                sophia: -5
              },
              nextScene: 'ep1_scene8_sophia_social'
            },
            {
              id: 'compromiseCareer',
              text: 'Propose timeline for both goals',
              preview: 'Plan for both career and personal life',
              relationshipEffects: {
                sophia: 5
              },
              nextScene: 'ep1_scene8_sophia_social'
            }
          ]
        }
      },

      {
        id: 'ep1_scene9_sophia_result',
        character: 'kevin',
        location: 'Sophia\'s VC Office',
        background: '/assets/backgrounds/vc-office.jpg',
        narrative: [
          {
            type: 'narration',
            text: 'After the acquisition meeting, Sophia receives news about her partner candidacy.'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'They want me to lead the AI investment team.',
            emotion: 'excited'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'That\'s amazing! When did they tell you?'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'Just now. They said my work on the Nexus deal was impressive.',
            emotion: 'proud'
          },
          {
            type: 'character',
            speaker: 'Kevin',
            text: 'So the house...'
          },
          {
            type: 'character',
            speaker: 'Sophia',
            text: 'We can afford it now. Both of our careers are taking off.',
            emotion: 'determined'
          }
        ],
        decisions: {
          prompt: 'How does Kevin respond to Sophia\'s success?',
          quote: '"Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill',
          options: [
            {
              id: 'celebrateSuccess',
              text: 'Celebrate her achievement',
              preview: 'Share in her success and plan the future',
              relationshipEffects: {
                sophia: 15
              },
              nextScene: 'ep1_scene10_ending'
            },
            {
              id: 'cautionSuccess',
              text: 'Express concern about pressure',
              preview: 'Warn about the challenges ahead',
              relationshipEffects: {
                sophia: -5
              },
              nextScene: 'ep1_scene10_ending'
            },
            {
              id: 'balanceSuccess',
              text: 'Discuss work-life balance',
              preview: 'Plan for maintaining balance with success',
              relationshipEffects: {
                sophia: 5
              },
              nextScene: 'ep1_scene10_ending'
            }
          ]
        }
      }
    ]
  }
]; 
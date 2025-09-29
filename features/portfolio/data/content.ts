import type { PortfolioContent } from './types';

export const portfolioContent: PortfolioContent = {
  profile: {
    name: 'Jason Kim',
    title: 'Product Designer',
    tagline: 'Building thoughtful products,\none honest conversation at a time.',
  },
  links: {
    playground: {
      id: 'playground',
      text: 'Playground',
      url: 'https://tryplayground.com',
    },
  },
  bio: [
    {
      id: 'bio-section-1',
      sentence: [
        { type: 'text', text: "I'm " },
        { type: 'trigger', triggerId: 'bio-section-1', text: 'based in NYC' },
        { type: 'text', text: ' and currently work at ' },
        { type: 'link', linkId: 'playground', text: 'Playground' },
        { type: 'text', text: '.' },
      ],
      content: {
        type: 'richText',
        segments: [
          {
            type: 'text',
            text: 'Just north of Prospect Park, nestled between verdant trees and an urban landscape. This is where I spend my time on ',
          },
          {
            type: 'trigger',
            triggerId: 'personal-interests',
            text: 'personal interests',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
      children: [
        {
          id: 'personal-interests',
          triggerLabel: 'personal interests',
          content: {
            type: 'richText',
            segments: [
              {
                type: 'text',
                text: "I draw most of my inspiration from ",
              },
              {
                type: 'trigger',
                triggerId: 'photography',
                text: 'photography',
              },
              {
                type: 'text',
                text: ', modernist painting, graphic design, and the abundance of scholarship across that subject matter. I\'m currently working on my front-end development skills (supplemented with a healthy amount of vibe coding).',
              },
            ],
          },
          children: [
            {
              id: 'photography',
              triggerLabel: 'photography',
              content: { type: 'gallery', galleryId: 'gallery-1' },
            },
          ],
        },
      ],
    },
    {
      id: 'bio-section-2',
      sentence: [
        { type: 'text', text: 'I specialise in ' },
        {
          type: 'trigger',
          triggerId: 'bio-section-2',
          text: 'product design for B2B startups',
        },
        { type: 'text', text: ' with an appetite for consumer-level flare.' },
      ],
      content: {
        type: 'richText',
        segments: [
          {
            type: 'text',
            text: 'The industry-agnostic nature of design has taken me from human-centered consultancies to ecommerce checkouts, financial services, and beyond.\n\nThat breadth has shown me how great design can transform complex business software at scale — while still looking and feeling beautiful along the way.',
          },
        ],
      },
    },
    {
      id: 'bio-section-3',
      sentence: [
        { type: 'text', text: "Let's make " },
        { type: 'trigger', triggerId: 'bio-section-3', text: 'great boring business software' },
        { type: 'text', text: '.' },
      ],
      content: {
        type: 'richText',
        segments: [
          {
            type: 'text',
            text: "Every interface is just as much a barrier as it is an aid. Boring doesn't mean bad, just as much as throwing confetti doesn't mean delight. Good design clears the way so customers can get back to work.",
          },
        ],
      },
    },
  ],
  workHistory: {
    sectionTitle: 'History',
    items: [
      { company: 'Playground', role: 'Childcare, CRM', period: 'Now' },
      { company: 'Pilot', role: 'Fintech, AI', period: '2022 - 25' },
      { company: 'HYPR', role: 'Cybersecurity, IDV', period: '2021 - 22' },
      { company: 'Wayfair', role: 'E-Comm, Fintech', period: '2018 - 21' },
    ],
  },
  awards: {
    sectionTitle: 'Awards',
    items: [
      { title: 'Fast Company — Innovation by Design', year: '2018' },
      { title: 'Interaction Design Awards', year: '2017' },
    ],
  },
  sideProjects: {
    sectionTitle: 'Personal',
    items: [
      { key: 'local-minima', label: 'Local Minima', isClickable: true, status: 'published' },
      { key: 'productivity-ai', label: 'Productivity in the age of AI', isClickable: true, status: 'published' },
      { key: 'modernism-photography', label: "Photography's Modernism", isClickable: true, status: 'wip' },
    ],
  },
  contact: {
    sectionTitle: 'Connect',
    items: [
      { platform: 'LinkedIn', handle: '@miknosaj', id: 'linkedin', url: 'https://linkedin.com/in/miknosaj' },
      { platform: 'Instagram', handle: '@kim.json', id: 'instagram', url: 'https://instagram.com/kim.json' },
      { platform: 'Email', handle: 'jajasonkim@gmail.com', id: 'email', url: 'mailto:jajasonkim@gmail.com' },
    ],
  },
};

import { BRANCHES } from './data/branches'

const primary = BRANCHES.find((b) => b.id === 'sanur')

// Primary studio identity for the whole site (hero, JSON-LD, contact links,
// etc). Sourced from the original Sanur (Pantai Sindhu) branch, operating
// since 2012 — the flagship location.
//
// recommendLabel/reviewCount come from the studio's Facebook page ("100%
// recommend", 23 reviews) at scaffold time. No numeric Google star rating
// was found in research — don't invent one; recommendLabel is used in the
// UI instead of a fake "X★".
export const STUDIO = {
  name: 'Segara Ink Tattoo',
  location: 'Sanur, Bali',
  since: 2012,
  recommendLabel: '100% Recommended',
  reviewCount: 23,
  address: primary.address,
  hours: primary.hours,
  phoneDisplay: primary.phoneDisplay,
  whatsapp: primary.whatsapp,
  email: 'segaratattoobali@rocketmail.com',
  instagram: primary.instagram,
  instagramHandle: primary.instagramHandle,
  mapsLink: primary.mapsLink,
  mapsEmbed: primary.mapsEmbed,
}

export const NAV_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Team', href: '/team' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Visit', href: '/#location' },
]

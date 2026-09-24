import { BRANCHES } from './data/branches'

const primary = BRANCHES.find((b) => b.id === 'sanur')

// Primary studio identity for the whole site (hero, JSON-LD, contact links,
// etc). Sourced from the original Sanur (Pantai Sindhu) branch, operating
// since 2012 — the flagship location.
//
// Google Maps ratings read directly from the two listings (Sept 2026): Sanur
// 4.9 (462 reviews) + Sanur 2 4.9 (209 reviews). googleReviewCount is the sum.
export const STUDIO = {
  name: 'Segara Ink Tattoo',
  location: 'Sanur, Bali',
  since: 2012,
  googleRating: 4.9,
  googleReviewCount: 671,
  address: primary.address,
  hours: primary.hours,
  phoneDisplay: primary.phoneDisplay,
  whatsapp: primary.whatsapp,
  email: 'segaratattoobali@rocketmail.com',
  logoSm: primary.logoSm,
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

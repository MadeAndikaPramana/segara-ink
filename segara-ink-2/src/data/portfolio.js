import portfolioData from './portfolio.json'

// Tattoo type/style categories the owner chooses from when uploading —
// mix of style (Fineline, Water Color, Polynesian, Color), service
// (Piercing, Cover Up), and size/placement (Full Back, Full Sleeve, Full
// Leg), matching the category set used across the sibling Swordsman site
// so both admin panels work the same way.
export const CATEGORIES = [
  'Piercing',
  'Water Color',
  'Polynesian',
  'Fineline',
  'Color',
  'Cover Up',
  'Full Back',
  'Full Sleeve',
  'Full Leg',
]

export const categoryToSlug = (category) => category.toLowerCase().replace(/\s+/g, '-')

// Lives in portfolio.json (not inline here) so the /admin serverless
// function (and the bulk-import script) can read + rewrite it as plain
// JSON via the GitHub API / filesystem, without needing to safely
// parse/regenerate JS source.
export const PORTFOLIO = portfolioData.items

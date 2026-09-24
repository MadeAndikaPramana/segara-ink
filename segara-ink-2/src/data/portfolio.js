import portfolioData from './portfolio.json'

// Tattoo type/placement categories the owner chooses from when uploading —
// matched to the story highlights actually pinned on the studio's own
// Instagram (@segarainktattoo_bali) rather than the sibling Swordsman
// site's category set: no evidence there of watercolor, Polynesian, color,
// or cover-up work, so those were dropped in favor of what's really shown.
export const CATEGORIES = [
  'Piercing',
  'Portrait',
  'Sleeve',
  'Leg',
  'Fine Line',
  'Back',
  'Chest',
]

export const categoryToSlug = (category) => category.toLowerCase().replace(/\s+/g, '-')

// Lives in portfolio.json (not inline here) so the /admin serverless
// function (and the bulk-import script) can read + rewrite it as plain
// JSON via the GitHub API / filesystem, without needing to safely
// parse/regenerate JS source.
export const PORTFOLIO = portfolioData.items

import { useEffect } from 'react'

const SITE_NAME = 'Segara Ink Tattoo'
const DEFAULT_DESCRIPTION =
  'Segara Ink Tattoo — custom tattoos in Sanur, Bali since 2012. Book via WhatsApp.'
// Same domain used in index.html's OG tags and public/sitemap.xml — update
// all three together once the studio's real domain is confirmed (see the
// TODO in index.html).
const SITE_URL = 'https://www.segarainktattoobali.com'

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Sets the browser tab title + meta description per page. Note: this runs
// client-side after mount, so it's picked up by Google (which executes JS)
// and shapes the browser tab / bookmark title — but link-preview crawlers
// (WhatsApp, Facebook, iMessage, etc.) read the raw HTML from the server
// and never run this, so they'll always show index.html's static
// title/description/OG image regardless of which route was shared. Proper
// per-route social previews would need server-side rendering or
// prerendering, which this plain client-side SPA doesn't have.
export function useDocumentHead({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME
    document.title = fullTitle
    // always resets, even when a page omits `description` — otherwise the
    // previous page's description sticks around
    setMeta('description', description || DEFAULT_DESCRIPTION)
    // self-referencing canonical, e.g. /portfolio/fine-line canonicalizes
    // to itself (not /portfolio) since each style filter shows genuinely
    // different content and each has its own title/description + sitemap
    // entry — they're meant to be indexed as their own pages, not merged
    setCanonical(`${SITE_URL}${window.location.pathname}`)
  }, [title, description])
}

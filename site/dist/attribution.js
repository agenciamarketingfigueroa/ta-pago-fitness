// Carry campaign attribution through navigation and into the Hotmart checkout.
// Only explicit campaign fields are forwarded; offer/payment parameters stay intact.
const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'sck'];

export function attributedUrl(href, sourceHref) {
  if (!href || href.startsWith('#')) return href;
  let source, target;
  try {
    source = new URL(sourceHref);
    target = new URL(href, source);
  } catch {
    return href;
  }
  const internal = target.origin === source.origin;
  const checkout = target.protocol === 'https:' && target.hostname === 'pay.hotmart.com';
  if (!['http:', 'https:'].includes(target.protocol) || (!internal && !checkout)) return href;
  let changed = false;
  for (const key of campaignKeys) {
    const value = source.searchParams.get(key);
    if (value && !target.searchParams.has(key)) {
      target.searchParams.set(key, value);
      changed = true;
    }
  }
  return changed ? target.href : href;
}

export function applyAttribution(doc, sourceHref) {
  for (const link of doc.querySelectorAll('a[href]')) {
    const href = link.getAttribute('href');
    const tracked = attributedUrl(href, sourceHref);
    if (tracked !== href) link.setAttribute('href', tracked);
  }
}

if (typeof document !== 'undefined') applyAttribution(document, window.location.href);

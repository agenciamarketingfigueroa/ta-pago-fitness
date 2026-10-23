import assert from 'node:assert/strict';
import { attributedUrl, applyAttribution } from './dist/attribution.js';

const source = 'https://tapagofitness.com.br/dieta-com-ia/?utm_source=ig&utm_medium=paid_social&utm_campaign=123&utm_term=456&utm_content=789&utm_id=123&sck=meta_123_456_789&off=wrong&email=private&fbclid=not-forwarded';
const checkout = 'https://pay.hotmart.com/G81186656A?off=62vsidox&checkoutMode=10';
const result = new URL(attributedUrl(checkout, source));
assert.equal(result.searchParams.get('off'), '62vsidox');
assert.equal(result.searchParams.get('checkoutMode'), '10');
for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id', 'sck']) {
  assert.equal(result.searchParams.get(key), new URL(source).searchParams.get(key));
}
for (const key of ['email', 'fbclid']) assert.equal(result.searchParams.has(key), false);
const internal = new URL(attributedUrl('/produtos/#ebooks', source));
assert.equal(internal.pathname, '/produtos/');
assert.equal(internal.hash, '#ebooks');
assert.equal(new URL(attributedUrl(checkout, internal.href)).searchParams.get('sck'), 'meta_123_456_789');
assert.equal(new URL(attributedUrl(checkout + '&sck=existing', source)).searchParams.get('sck'), 'existing');
assert.equal(attributedUrl(result.href, source), result.href);
assert.equal(attributedUrl(checkout, 'https://tapagofitness.com.br/?sck=&utm_source='), checkout);
for (const href of ['#oferta', 'mailto:hello@example.com', 'https://example.com/', 'https://pay.hotmart.com.example.com/', 'http://pay.hotmart.com/', 'javascript:void(0)']) {
  assert.equal(attributedUrl(href, source), href);
}
const links = [checkout, '/produtos/', '#oferta'].map(href => ({
  href, getAttribute() { return this.href; }, setAttribute(name, value) { assert.equal(name, 'href'); this.href = value; }
}));
applyAttribution({ querySelectorAll(selector) { assert.equal(selector, 'a[href]'); return links; } }, source);
assert.equal(new URL(links[0].href).searchParams.get('sck'), 'meta_123_456_789');
assert.equal(new URL(links[1].href).searchParams.get('utm_content'), '789');
assert.equal(links[2].href, '#oferta');
console.log('PASS: campaign attribution, checkout offer preservation, internal navigation, exclusions and DOM links.');

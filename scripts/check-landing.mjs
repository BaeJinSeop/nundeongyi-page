// Source/render regression checks, not browser layout or store-install verification.
// Run: node scripts/check-landing.mjs
// Fetches the same pinned React/Babel runtime used by the page; installs nothing.
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (name) => readFile(path.join(root, name), 'utf8');
const koHtml = await read('index.html');
const babelTag = koHtml.match(/<script[^>]+src="([^"]+babel\.min\.js)"[^>]+integrity="([^"]+)"/);
assert(babelTag, 'Keep the pinned Babel runtime and integrity check');
const fetchText = async (url) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  assert(response.ok, `Dependency fetch failed: ${url} (${response.status})`);
  return response.text();
};
const [babel, react, server] = await Promise.all([
  fetchText(babelTag[1]),
  fetchText('https://unpkg.com/react@18.3.1/umd/react.production.min.js'),
  fetchText('https://unpkg.com/react-dom@18.3.1/umd/react-dom-server-legacy.browser.production.min.js'),
]);
assert.equal(`sha384-${createHash('sha384').update(babel).digest('base64')}`, babelTag[2]);
const compiler = vm.createContext({ console });
vm.runInContext(babel, compiler);
const transform = (source, filename) => compiler.Babel.transform(source, {
  filename, presets: ['react'], sourceType: 'script',
}).code;
const shared = transform(await read('landing.jsx'), 'landing.jsx');
const mascot = transform(await read('mascot.jsx'), 'mascot.jsx');
const apple = 'https://apps.apple.com/app/id6778849270';
const google = 'https://play.google.com/store/apps/details?id=com.snowball.nundeongyi';
let checks = 0;
const check = (condition, message) => { assert(condition, message); checks++; };
const contextFor = (lang, device = {}) => {
  const context = vm.createContext({
    console, TextEncoder, TextDecoder,
    navigator: { userAgent: '', platform: '', maxTouchPoints: 0, ...device },
    document: { documentElement: { lang } },
  });
  context.window = context;
  context.self = context;
  vm.runInContext(react, context);
  vm.runInContext(server, context);
  vm.runInContext(mascot, context);
  return context;
};
const attributes = (html, name) => [...html.matchAll(new RegExp(`\\b${name}="([^"]+)"`, 'g'))].map((match) => match[1]);

for (const [lang, page] of [['ko', 'index.html'], ['en', 'en.html'], ['ja', 'ja.html']]) {
  const html = await read(page);
  const context = contextFor(lang);
  const copy = lang === 'ko' ? '' : transform(await read(`landing.copy.${lang}.jsx`), `landing.copy.${lang}.jsx`);
  if (copy) vm.runInContext(copy, context);
  vm.runInContext(shared, context);
  const rendered = vm.runInContext('ReactDOMServer.renderToStaticMarkup(React.createElement(LandingPage))', context);
  check(!rendered.includes('undefined'), `${lang}: missing translation`);
  check((rendered.match(/<h1\b/g) || []).length === 1, `${lang}: one heading`);
  check((rendered.match(/<main\b/g) || []).length === 1, `${lang}: one main landmark`);
  check((rendered.match(/role="tab"/g) || []).length === 4, `${lang}: four feature tabs`);
  check((rendered.match(/aria-selected="true"/g) || []).length === 1, `${lang}: one selected tab`);
  check(/id="journey-tab-1"[^>]+aria-selected="true"/.test(rendered), `${lang}: expenses selected initially`);
  check((rendered.match(/role="tabpanel"/g) || []).length === 4, `${lang}: preserve every feature`);
  check((rendered.match(/role="tabpanel"[^>]+hidden=""/g) || []).length === 3, `${lang}: hide only inactive panels`);
  check((rendered.match(new RegExp(`href="${apple}"`, 'g')) || []).length === 4, `${lang}: four Apple placements`);
  check((rendered.match(/href="https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.snowball\.nundeongyi"/g) || []).length === 4, `${lang}: four Google placements`);
  check(rendered.includes('mobile-install-bar'), `${lang}: mobile install access`);
  const ids = attributes(rendered, 'id');
  check(ids.length === new Set(ids).size, `${lang}: unique IDs`);
  for (const id of attributes(rendered, 'aria-controls')) check(ids.includes(id), `${lang}: control target ${id}`);
  for (const src of attributes(rendered, 'src')) {
    await access(path.join(root, src));
    checks++;
  }
  for (const href of attributes(rendered, 'href')) {
    if (href.startsWith('#')) check(ids.includes(href.slice(1)), `${lang}: anchor ${href}`);
    else if (!/^(https?:|mailto:)/.test(href)) await access(path.join(root, href));
  }
  const fallback = html.slice(html.indexOf('<div id="root">'), html.indexOf('<script src="https://unpkg.com/react'));
  check(fallback.includes('<h1>') && fallback.includes(apple) && fallback.includes(google), `${lang}: no-JS/install fallback`);
  check(!html.includes('<div id="root"></div>'), `${lang}: no blank bootstrap`);
  check(html.includes('<LandingPage />'), `${lang}: shared entrypoint`);
  for (const inline of html.matchAll(/<script type="text\/babel">([\s\S]*?)<\/script>/g)) transform(inline[1], page);
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  check(schema.inLanguage === lang && schema.installUrl.includes(apple) && schema.installUrl.includes(google), `${lang}: store metadata`);
  const koKeys = vm.runInContext('Object.keys(KO_COPY.install).sort().join()', context);
  check(vm.runInContext('Object.keys(C.install).sort().join()', context) === koKeys, `${lang}: install translation schema`);
  const events = [];
  context.gtag = (...args) => events.push(args);
  vm.runInContext("trackStoreClick('apple', 'mobile_sticky')", context);
  check(events[0][0] === 'event' && events[0][1] === 'store_click' && events[0][2].language === lang, `${lang}: existing click event`);
  context.gtag = () => { throw new Error('measurement unavailable'); };
  vm.runInContext("trackStoreClick('google', 'hero')", context);
  checks++;
  delete context.gtag;
  vm.runInContext("trackStoreClick('google', 'hero')", context);
  checks++;
  console.log(`${lang}: source, server-rendered content, links, assets and measurement fallback passed`);
}

for (const [device, expected] of [
  [{ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)' }, 'apple'],
  [{ userAgent: 'Mozilla/5.0 (Linux; Android 15)' }, 'google'],
  [{ userAgent: 'Macintosh', platform: 'MacIntel', maxTouchPoints: 5 }, 'apple'],
  [{ userAgent: 'Macintosh', platform: 'MacIntel', maxTouchPoints: 0 }, null],
  [{ userAgent: 'Mozilla/5.0 (Windows NT 10.0)' }, null],
  [{}, null],
]) {
  const context = contextFor('ko', device);
  vm.runInContext(shared, context);
  check(vm.runInContext('getStorePlatform()', context) === expected, `Device hint ${JSON.stringify(device)}`);
  const badges = vm.runInContext("ReactDOMServer.renderToStaticMarkup(React.createElement(StoreActions, {where: 'hero'}))", context);
  check(badges.includes(apple) && badges.includes(google), 'Never hide the other platform');
  check(attributes(badges, 'href')[0] === (expected === 'google' ? google : apple), 'Preferred store comes first');
}

// Exercise keyboard/click handlers as pure component logic, without a browser.
const logic = contextFor('ko');
vm.runInContext(shared, logic);
let selected = 1;
let focused = null;
const refs = { current: Array.from({ length: 4 }, (_, index) => ({ focus: () => { focused = index; } })) };
logic.React = {
  ...logic.React,
  useState: () => [selected, (value) => { selected = value; }],
  useRef: () => refs,
};
const walk = (node) => {
  if (!node || typeof node !== 'object') return [];
  if (Array.isArray(node)) return node.flatMap(walk);
  return [node, ...walk(node.props?.children)];
};
const tabs = walk(vm.runInContext('V2Showcase()', logic)).filter((node) => node.props?.role === 'tab');
for (const [index, key, expected] of [[1, 'ArrowRight', 2], [0, 'ArrowLeft', 3], [3, 'Home', 0], [0, 'End', 3], [3, 'ArrowRight', 0]]) {
  let prevented = false;
  tabs[index].props.onKeyDown({ key, preventDefault: () => { prevented = true; } });
  check(prevented && selected === expected && focused === expected, `Tab keyboard: ${key}`);
}
tabs[0].props.onClick();
check(selected === 0, 'Tab click selection');
let prevented = false;
tabs[0].props.onKeyDown({ key: 'Tab', preventDefault: () => { prevented = true; } });
check(!prevented, 'Tab key leaves the tablist normally');
console.log(`PASS: ${checks} checks. Browser layout, live analytics and actual installs are not measured here.`);

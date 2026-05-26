import { useState, useRef } from 'react';
import { Button } from '@toss/tds-mobile';
import { type Lang, translate } from '../i18n';
import { PI_DIGITS } from '../data/piDigits';

const CHAR_IMAGES: Record<string, string[]> = {
  search: ['07_question.png', '09_dnd.png', '10_busy.png'],
  found: ['13_yes.png', '17_funny.png', '19_awesome.png', '30_idea.png'],
  not_found: ['06_boring.png', '12_sleep.png', '14_no.png', '20_well.png', '26_yawn.png', '29_hmm.png'],
};

function randomImage(cat: string): string {
  const list = CHAR_IMAGES[cat];
  return `images/${cat}/${list[Math.floor(Math.random() * list.length)]}`;
}

function escapeHtml(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

interface SearchResult {
  firstPosition: number;
  count: number;
}

function findInPi(query: string): SearchResult {
  const maxDigits = 1000000;
  const digits = PI_DIGITS.substring(2, 2 + maxDigits);
  let firstPosition = -1;
  let count = 0;
  let pos = 0;
  while (true) {
    pos = digits.indexOf(query, pos);
    if (pos === -1) break;
    if (firstPosition === -1) firstPosition = pos;
    count++;
    pos++;
  }
  return { firstPosition, count };
}

interface Props {
  lang: Lang;
}

export function SearchView({ lang }: Props) {
  const t = (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);
  const [query, setQuery] = useState('');
  const [resultHtml, setResultHtml] = useState('');
  const [resultImage, setResultImage] = useState(randomImage('search'));
  const [isSearching, setIsSearching] = useState(false);

  function doSearch() {
    const q = query.trim();
    if (!q || q.length > 8) {
      setResultHtml(`<div class="empty-msg" style="color:var(--wrong)">${t('search_error')}</div>`);
      return;
    }
    setIsSearching(true);
    setResultHtml(`<div class="empty-msg">${t('searching')}</div>`);

    setTimeout(() => {
      const result = findInPi(q);
      if (result.firstPosition === -1) {
        setResultImage(randomImage('not_found'));
        setResultHtml(`
          <div class="search-result-card">
            <h4>${t('search_title')}</h4>
            <p>${t('search_query', { q: `<strong>${escapeHtml(q)}</strong>` })}</p>
            <p>${t('search_not_found')}</p>
          </div>
        `);
      } else {
        setResultImage(randomImage('found'));
        const displayPos = result.firstPosition + 1;
        const LINE = 40;
        const HALF = 20;
        const matchStart = result.firstPosition + 2;
        const centerBegin = Math.max(2, matchStart - HALF);
        const centerEnd = Math.min(PI_DIGITS.length, matchStart + q.length + (LINE - HALF));
        const centerLine = PI_DIGITS.substring(centerBegin, centerEnd);
        const upperLine = PI_DIGITS.substring(Math.max(2, centerBegin - LINE), centerBegin) || '...';
        const lowerLine = PI_DIGITS.substring(centerEnd, Math.min(PI_DIGITS.length, centerEnd + LINE)) || '...';
        const mIdx = centerLine.indexOf(q);
        const highlighted = mIdx >= 0
          ? centerLine.slice(0, mIdx) + `<mark>${escapeHtml(q)}</mark>` + centerLine.slice(mIdx + q.length)
          : escapeHtml(centerLine);

        setResultHtml(`
          <div class="search-result-card">
            <h4>${t('search_title')}</h4>
            <p>${t('search_query', { q: `<strong>${escapeHtml(q)}</strong>` })}</p>
            <p>${t('search_pos', { n: `<strong>${displayPos.toLocaleString()}</strong>` })}</p>
            <p>${t('search_count', { n: `<strong>${result.count.toLocaleString()}</strong>` })}</p>
            <div class="search-context">
              <div class="ctx-dim">${escapeHtml(upperLine)}</div>
              <div class="ctx-main">${highlighted}</div>
              <div class="ctx-dim">${escapeHtml(lowerLine)}</div>
            </div>
          </div>
        `);
      }
      setIsSearching(false);
    }, 10);
  }

  return (
    <div className="view active search-view">
      <div className="search-desc">
        <img src={resultImage} alt="" />
        <div>{t('search_desc')}</div>
      </div>

      <div className="search-input-group">
        <input
          type="text"
          className="search-input"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={8}
          placeholder={t('search_placeholder')}
          value={query}
          onChange={e => setQuery(e.target.value.replace(/[^0-9]/g, ''))}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); doSearch(); } }}
        />
        <Button color="primary" variant="fill" size="large" onClick={doSearch} loading={isSearching}>
          {t('search_btn')}
        </Button>
      </div>

      <div
        className="search-result"
        dangerouslySetInnerHTML={{ __html: resultHtml }}
      />
    </div>
  );
}

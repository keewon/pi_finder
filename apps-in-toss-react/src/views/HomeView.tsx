import { Button } from '@toss/tds-mobile';
import { type Lang, translate } from '../i18n';
import { getMathematicians } from '../i18n';

const PI_DIAGRAM = `<svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="72" r="52" stroke="currentColor" stroke-width="2"/>
  <line x1="48" y1="72" x2="152" y2="72" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 4"/>
  <circle cx="100" cy="72" r="3.5" fill="currentColor"/>
  <circle cx="48" cy="72" r="3" fill="currentColor"/>
  <circle cx="152" cy="72" r="3" fill="currentColor"/>
  <text x="100" y="155" text-anchor="middle" fill="currentColor" font-size="16" font-style="italic" font-family="Georgia,serif">C = 2πr</text>
</svg>`;

function randomImage(cat: string): string {
  const images: Record<string, string[]> = {
    home: ['01_hello.png', '05_please.png', '22_letsplay.png', '24_thanks.png', '27_at_home.png'],
  };
  const list = images[cat] || images.home;
  return `images/${cat}/${list[Math.floor(Math.random() * list.length)]}`;
}

interface Props {
  lang: Lang;
  userName: string;
  onMemorize: () => void;
  onSearch: () => void;
  onRecords: () => void;
}

export function HomeView({ lang, userName, onMemorize, onSearch, onRecords }: Props) {
  const t = (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);

  const maths = getMathematicians(lang);
  const mathDesc = maths.find(m => userName.endsWith(m.name))?.desc ?? null;

  return (
    <div className="view active home-view">
      <div className="home-hero">
        <div className="pi-diagram" dangerouslySetInnerHTML={{ __html: PI_DIAGRAM }} />
        <div className="home-title">π</div>
        <div className="home-greeting">
          {t('greeting')} <span className="nickname">{userName}</span>
          {mathDesc && <sup className="footnote-star">*</sup>}
        </div>
        {mathDesc && <div className="user-desc">* {mathDesc}</div>}
      </div>

      <div className="home-actions">
        <Button
          color="primary"
          variant="fill"
          display="full"
          size="xlarge"
          onClick={onMemorize}
        >
          {t('btn_memorize')}
        </Button>
        <Button
          color="primary"
          variant="weak"
          display="full"
          size="xlarge"
          onClick={onSearch}
        >
          {t('btn_find')}
        </Button>
        <Button
          color="primary"
          variant="weak"
          display="full"
          size="xlarge"
          onClick={onRecords}
        >
          {t('btn_records')}
        </Button>
      </div>

    </div>
  );
}

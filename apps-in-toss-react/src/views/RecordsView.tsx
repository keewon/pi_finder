import { useState, useEffect } from 'react';
import { type Lang, translate } from '../i18n';
import type { GameMode } from '../hooks/useSettings';

const API_URL = location.hostname === 'localhost' || location.protocol === 'file:'
  ? 'http://localhost:8787'
  : 'https://pi-finder-api.acidblob.com';

interface LocalRecord {
  id: number;
  name: string;
  digits: number;
  time: number;
  continues: number;
  mode: string;
  date: string;
  serverId: string | null;
}

interface ServerRecord {
  uid: string;
  name: string;
  digits: number;
  time: number;
  continues: number;
  mode: string;
  created_at: string;
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function formatMode(mode: string, lang: Lang, t: (k: string, v?: Record<string, string | number>) => string): string {
  if (!mode) return '';
  if (mode === 'keypad') return t('digits_per', { n: 1 });
  const n = parseInt(mode.replace('multiple', ''));
  return t('digits_per', { n });
}

function escapeHtml(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

type Tab = 'mine' | 'all' | 'monthly' | 'weekly';

interface Props {
  lang: Lang;
  deviceUid: string;
  onDelete: (id: number) => void;
  getLocalRecords: () => LocalRecord[];
  deleteLocalRecord: (id: number) => void;
}

export function RecordsView({ lang, deviceUid, getLocalRecords, deleteLocalRecord }: Props) {
  const t = (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);
  const [tab, setTab] = useState<Tab>('mine');
  const [localRecords, setLocalRecords] = useState<LocalRecord[]>([]);
  const [serverRecords, setServerRecords] = useState<ServerRecord[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLocalRecords(getLocalRecords());
  }, [tab]);

  useEffect(() => {
    if (tab === 'mine') return;
    setLoading(true);
    setError(false);
    setServerRecords(null);
    const params = new URLSearchParams({ constKey: 'pi', period: tab, uid: deviceUid, limit: '50' });
    fetch(`${API_URL}/records?${params}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { setServerRecords(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [tab, deviceUid]);

  function handleDelete(id: number) {
    deleteLocalRecord(id);
    setLocalRecords(getLocalRecords());
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'mine', label: t('tab_mine') },
    { key: 'all', label: t('tab_all') },
    { key: 'monthly', label: t('tab_monthly') },
    { key: 'weekly', label: t('tab_weekly') },
  ];

  return (
    <div className="view active records-view">
      <div className="records-tabs">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            className={`tab-btn ${tab === key ? 'active' : ''}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="records-list">
        {tab === 'mine' && (
          localRecords.length === 0 ? (
            <div className="empty-msg">{t('records_empty')}</div>
          ) : (
            localRecords.map(rec => (
              <div key={rec.id} className="record-item">
                <div className="record-item-info">
                  <div className="record-item-name">{escapeHtml(rec.name)}</div>
                  <div className="record-item-details">
                    {t('digits_unit', { n: rec.digits })}
                    {rec.mode ? ` · ${formatMode(rec.mode, lang, t)}` : ''}
                    {' | '}{formatTime(rec.time)}
                    {rec.continues ? ` | ${t('continues', { n: rec.continues })}` : ''}
                    {' | '}{new Date(rec.date).toLocaleDateString(lang)}
                  </div>
                </div>
                <button className="btn-delete" onClick={() => handleDelete(rec.id)}>
                  {t('btn_delete')}
                </button>
              </div>
            ))
          )
        )}

        {tab !== 'mine' && loading && (
          <div className="empty-msg">{t('loading')}</div>
        )}
        {tab !== 'mine' && error && (
          <div className="empty-msg">{t('server_error')}</div>
        )}
        {tab !== 'mine' && !loading && !error && serverRecords !== null && (
          serverRecords.length === 0 ? (
            <div className="empty-msg">{t('records_empty')}</div>
          ) : (
            serverRecords.map((rec, idx) => {
              const isMe = rec.uid === deviceUid;
              const rankLabel = t('rank_label', { n: idx + 1 });
              return (
                <div key={idx} className={`record-item ${isMe ? 'record-item-me' : ''}`}>
                  <div className="record-item-rank">{rankLabel}</div>
                  <div className="record-item-info">
                    <div className="record-item-name">
                      {escapeHtml(rec.name)}
                      {isMe && <span className="me-tag"> ({t('me_tag')})</span>}
                    </div>
                    <div className="record-item-details">
                      {t('digits_unit', { n: rec.digits })}
                      {rec.mode ? ` · ${formatMode(rec.mode, lang, t)}` : ''}
                      {' | '}{formatTime(rec.time)}
                      {rec.continues ? ` | ${t('continues', { n: rec.continues })}` : ''}
                      {' | '}{new Date(rec.created_at).toLocaleDateString(lang)}
                    </div>
                  </div>
                </div>
              );
            })
          )
        )}
      </div>
    </div>
  );
}

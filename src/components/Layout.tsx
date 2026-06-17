import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useI18n } from '../i18n'
import { useSettings } from '../settings/SettingsContext'
import { useData } from '../data/DataContext'
import { groupStageComplete } from '../utils/helpers'
import { LANG_LABEL } from '../i18n/strings'
import type { Lang } from '../types'
import Icon from './Icon'
import type { IconName } from './Icon'
import Freshness from './Freshness'
import { campaignStrings, DONATE_URL } from '../data/waterTexts'

const NAV: { to: string; key: string; icon: IconName }[] = [
  { to: '/', key: 'navMatches', icon: 'calendar' },
  { to: '/groups', key: 'navGroups', icon: 'table' },
  { to: '/bracket', key: 'navBracket', icon: 'bracket' },
  { to: '/teams', key: 'navTeams', icon: 'shirt' },
  { to: '/venues', key: 'navVenues', icon: 'stadium' },
  { to: '/watch', key: 'navWatch', icon: 'tv' },
  { to: '/stats', key: 'navStats', icon: 'chart' },
  { to: '/forecast', key: 'navSim', icon: 'target' },
  { to: '/settings', key: 'navSettings', icon: 'gear' },
]

const MORE_TAB = { to: '/more', key: 'navMore' as string, icon: 'dots' as IconName }

/** bottom tabs: the third slot is stage-aware — Groups during the group stage,
 * Bracket once all twelve groups are complete (the page it replaces stays
 * reachable from More and in-app links) */
function tabsFor(knockout: boolean) {
  const phase = knockout ? NAV[2] : NAV[1] // bracket : groups
  return [
    NAV[0],
    phase,
    NAV.find((n) => n.key === 'navTeams') ?? NAV[3],
    NAV.find((n) => n.key === 'navSim') ?? MORE_TAB,
    MORE_TAB,
  ]
}

// display order comes from LANG_LABEL's key order (single source of truth in i18n/strings.ts)
const LANGS = Object.keys(LANG_LABEL) as Lang[]

/** language selector: opens on hover (desktop) or click/tap, closes on outside click / Esc */
function LangMenu() {
  const { t } = useI18n()
  const { settings, setLang } = useSettings()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={`lang-menu${open ? ' open' : ''}`} ref={ref}>
      <button
        type="button"
        className="lang-quick"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('settingLang')}
        title={t('settingLang')}
        onClick={() => setOpen((o) => !o)}
      >
        {/* "文A" translate glyph (Ionicons language icon, MIT) */}
        <svg width="19" height="19" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
          <path d="M478.33,433.6l-90-218a22,22,0,0,0-40.67,0l-90,218a22,22,0,1,0,40.67,16.79L316.66,406H419.33l18.33,44.39A22,22,0,0,0,458,464a22,22,0,0,0,20.32-30.4ZM334.83,362,368,281.65,401.17,362Z" />
          <path d="M267.84,342.92a22,22,0,0,0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73,39.65-53.68,62.11-114.75,71.27-143.49H330a22,22,0,0,0,0-44H214V70a22,22,0,0,0-44,0V90H54a22,22,0,0,0,0,44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-31.41-41.68-43.08-68.65-43.17-68.87a22,22,0,0,0-40.58,17c.58,1.38,14.55,34.23,52.86,83.93.92,1.19,1.83,2.35,2.74,3.51-39.24,44.35-77.74,71.86-93.85,80.74a22,22,0,1,0,21.07,38.63c2.16-1.18,48.6-26.89,101.63-85.59,22.52,24.08,38,35.44,38.93,36.1a22,22,0,0,0,30.75-4.9Z" />
        </svg>
      </button>
      <div className="lang-list" role="listbox" aria-label={t('settingLang')}>
        {LANGS.map((l) => (
          <button
            type="button"
            key={l}
            role="option"
            aria-selected={l === settings.lang}
            className={l === settings.lang ? 'on' : ''}
            onClick={() => {
              setLang(l)
              setOpen(false)
            }}
          >
            {LANG_LABEL[l]}
            {l === settings.lang && <span aria-hidden="true">✓</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Layout() {
  const { t, lang } = useI18n()
  const donate = campaignStrings(lang)
  const { data } = useData()
  const tabs = tabsFor(groupStageComplete(data?.standings))
  const headerRef = useRef<HTMLElement>(null)

  // sticky children (day headers, filter bars) offset themselves by the real
  // header height — it grows when the nav wraps to a second line
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const apply = () => document.documentElement.style.setProperty('--hdr-h', `${el.offsetHeight}px`)
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // content-driven nav breakpoint: show the top nav only when every label fits
  // on one line (the threshold differs per language), else keep the tab bar
  const navRef = useRef<HTMLElement>(null)
  // biome-ignore lint/correctness/useExhaustiveDependencies: t changes when labels change — it is the re-measure signal
  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const update = () => {
      let needed = 0
      // fractional rect widths: summed integer offsetWidths under-report by a few px
      for (const child of nav.children) needed += (child as HTMLElement).getBoundingClientRect().width
      needed += (nav.children.length - 1) * 2 // column gap
      // 1px slack against integer rounding clipping the first item in borderline languages
      document.documentElement.classList.toggle('nav-fits', needed <= nav.clientWidth + 1)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(nav)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [t])

  return (
    <>
      <header className="shell-header" ref={headerRef}>
        <div className="shell-header-in">
          <NavLink to="/" className="brand" aria-label={`Jesus Diário — ${t('appName')}`}>
            <img
              className="pa-brand-logo"
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Jesus Diário"
            />
          </NavLink>
          <nav className="top-nav" ref={navRef}>
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'}>
                {t(n.key)}
              </NavLink>
            ))}
          </nav>
          <a
            className="donate-btn"
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 21c-1-.9-8-5.6-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.4-7 10.1-8 11Z" />
            </svg>
            <span className="donate-full">{donate.donateNow}</span>
            <span className="donate-short">{donate.donate}</span>
          </a>
          <LangMenu />
        </div>
      </header>

      <main className="shell-main">
        <Outlet />
      </main>

      <footer className="shell-footer">
        <div>
          <Freshness />
        </div>
      </footer>

      <nav className="tab-bar">
        {tabs.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'}>
            <Icon name={n.icon} />
            {t(n.key)}
          </NavLink>
        ))}
      </nav>
    </>
  )
}

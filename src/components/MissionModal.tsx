import { useEffect } from 'react'
import { useI18n } from '../i18n'
import { campaignStrings, DONATE_URL } from '../data/waterTexts'

/** vídeo do YouTube (autoplay) sem cookies, para o embed do modal da missão */
const VIDEO_SRC =
  'https://www.youtube-nocookie.com/embed/rjzsKovmmyI?autoplay=1&rel=0&playsinline=1'

/**
 * Modal "Join Our Mission" (H7O): vídeo de apresentação com autoplay, o texto da
 * missão localizado e um botão que leva à doação (Stripe). O iframe só é montado
 * quando o modal está aberto, então fechar interrompe a reprodução.
 */
export default function MissionModal({ onClose }: { onClose: () => void }) {
  const { lang } = useI18n()
  const s = campaignStrings(lang)

  // fecha com Esc e trava o scroll do fundo enquanto o modal está aberto
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className="mm-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={s.joinMission}
      onClick={onClose}
    >
      <div className="mm-dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="mm-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
        <div className="mm-video">
          <iframe
            src={VIDEO_SRC}
            title="H7O"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="mm-body">
          <h2 className="mm-title">{s.joinMission}</h2>
          <p className="mm-text" dir="auto">
            {s.missionText}
          </p>
          <a
            className="donate-btn mm-cta"
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 21c-1-.9-8-5.6-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.4-7 10.1-8 11Z" />
            </svg>
            {s.donateNow}
          </a>
        </div>
      </div>
    </div>
  )
}

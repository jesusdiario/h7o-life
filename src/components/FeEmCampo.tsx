import { useI18n } from '../i18n'
import { campaignStrings, DONATE_URL } from '../data/waterTexts'
import { pickWater, waterProfile } from '../data/waterProfiles'
import WaterIcon from './WaterIcon'

/**
 * Bloco "Água em campo" (H7O.LIFE): compara a situação hídrica da seleção com a
 * seca no sertão brasileiro e convida a doar para projetos de água. Reutilizado
 * na página do time e na tela da partida; textos localizados pelo idioma do app.
 */
export default function FeEmCampo({ code, id }: { code: string | null | undefined; id?: string }) {
  const { lang } = useI18n()
  const wp = waterProfile(code)
  if (!wp) return null
  const s = campaignStrings(lang)
  const country = pickWater(wp.country, lang)
  const level = pickWater(wp.water_level_label, lang)
  const text = pickWater(wp.texts, lang)
  return (
    <section className="card card-pad fe-card" id={id}>
      <div className="fe-head">
        <WaterIcon size={26} className="fe-icon" />
        <div>
          <h2 className="fe-title">{s.waterTitle}</h2>
          <p className="fe-sub small muted">
            {country} · {level}
          </p>
        </div>
      </div>
      <p className="fe-text">{text}</p>
      <a className="btn fe-cta" href={DONATE_URL} target="_blank" rel="noopener noreferrer">
        <WaterIcon size={18} />
        {s.donateNow}
      </a>
    </section>
  )
}

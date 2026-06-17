// Textos de UI da campanha (leves) — usados também no Layout (bundle principal).
// Os textos pesados por país (48×12) ficam em waterProfiles.ts, carregado só nas
// páginas de detalhe (lazy), para não pesar o carregamento inicial.

/** idiomas presentes no JSON da campanha */
export type WaterLang =
  | 'en'
  | 'fr'
  | 'es'
  | 'pt_PT'
  | 'pt_BR'
  | 'de'
  | 'nl'
  | 'cs'
  | 'hr'
  | 'sv'
  | 'no'
  | 'ar'

/** mapeia o idioma do app (ex.: 'pt-BR', 'pt') para a chave do JSON da campanha */
export function waterLang(appLang: string): WaterLang {
  const map: Record<string, WaterLang> = {
    'pt-BR': 'pt_BR',
    pt: 'pt_PT',
    en: 'en',
    fr: 'fr',
    es: 'es',
    de: 'de',
    nl: 'nl',
    cs: 'cs',
    hr: 'hr',
    sv: 'sv',
    no: 'no',
    ar: 'ar',
  }
  return map[appLang] ?? 'en'
}

/** link de doação (Stripe) */
export const DONATE_URL = 'https://donate.stripe.com/9B67sLgFJ8xhbegclieQM00'

/** textos de interface da campanha (botão doar e título da seção de água) */
interface CampaignStrings {
  donate: string
  donateNow: string
  waterTitle: string
}

const CAMPAIGN_I18N: Record<WaterLang, CampaignStrings> = {
  en: { donate: 'Donate', donateNow: 'Donate Now', waterTitle: 'Water in play' },
  fr: { donate: 'Faire un don', donateNow: 'Faire un don', waterTitle: 'De l’eau en jeu' },
  es: { donate: 'Donar', donateNow: 'Donar ahora', waterTitle: 'Agua en juego' },
  pt_PT: { donate: 'Doar', donateNow: 'Doar agora', waterTitle: 'Água em campo' },
  pt_BR: { donate: 'Doar', donateNow: 'Doar Agora', waterTitle: 'Água em campo' },
  de: { donate: 'Spenden', donateNow: 'Jetzt spenden', waterTitle: 'Wasser im Spiel' },
  nl: { donate: 'Doneren', donateNow: 'Nu doneren', waterTitle: 'Water in het spel' },
  cs: { donate: 'Darovat', donateNow: 'Darovat nyní', waterTitle: 'Voda ve hře' },
  hr: { donate: 'Doniraj', donateNow: 'Doniraj odmah', waterTitle: 'Voda u igri' },
  sv: { donate: 'Donera', donateNow: 'Donera nu', waterTitle: 'Vatten i spel' },
  no: { donate: 'Doner', donateNow: 'Doner nå', waterTitle: 'Vann i spill' },
  ar: { donate: 'تبرّع', donateNow: 'تبرّع الآن', waterTitle: 'الماء في الملعب' },
}

export function campaignStrings(appLang: string): CampaignStrings {
  return CAMPAIGN_I18N[waterLang(appLang)]
}

// Textos de água por país (48 seleções × 12 idiomas). Pesado — importado apenas
// pelo bloco "Água em campo", que vive nas páginas de detalhe (lazy), então o
// JSON não entra no bundle inicial.

import raw from './waterTexts.json'
import { type WaterLang, waterLang } from './waterTexts'

export interface WaterTeam {
  fifa_code: string
  country: Partial<Record<WaterLang, string>>
  water_level: string
  water_level_label: Partial<Record<WaterLang, string>>
  texts: Partial<Record<WaterLang, string>>
}

const TEAMS = (raw as { teams: WaterTeam[] }).teams
const BY_CODE: Record<string, WaterTeam> = {}
for (const t of TEAMS) BY_CODE[t.fifa_code.toUpperCase()] = t

/** perfil de água de uma seleção pelo código FIFA (todas as 48 seleções) */
export function waterProfile(code: string | null | undefined): WaterTeam | undefined {
  return code ? BY_CODE[code.toUpperCase()] : undefined
}

/** escolhe um texto localizado do JSON, com fallback para inglês */
export function pickWater(field: Partial<Record<WaterLang, string>>, appLang: string): string {
  return field[waterLang(appLang)] ?? field.en ?? ''
}

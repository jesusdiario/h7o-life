// Textos de UI da campanha (botão "Doar" do navbar) e URL de doação, em 12 idiomas.
// Usado pelo Layout (bundle principal).

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

/** textos da campanha: botão "Join Our Mission" do navbar e conteúdo do modal */
interface CampaignStrings {
  /** rótulo do botão no navbar (desktop) e título do modal */
  joinMission: string
  /** rótulo curto do botão no navbar (mobile) */
  joinShort: string
  /** CTA que leva à doação (Stripe), dentro do modal */
  donateNow: string
  /** parágrafo que explica o que a H7O faz, abaixo do vídeo */
  missionText: string
}

const CAMPAIGN_I18N: Record<WaterLang, CampaignStrings> = {
  en: {
    joinMission: 'Join Our Mission',
    joinShort: 'Mission',
    donateNow: 'Donate Now',
    missionText:
      'At H7O, we are dedicated to addressing one of the world’s most urgent crises: the lack of access to clean and safe water. Our mission is simple, yet profound — to provide sustainable water solutions to underserved communities. We believe that access to clean water is a basic human right, and we are committed to ensuring that no one has to go without it.',
  },
  fr: {
    joinMission: 'Rejoignez notre mission',
    joinShort: 'Mission',
    donateNow: 'Faire un don',
    missionText:
      'Chez H7O, nous nous engageons à répondre à l’une des crises les plus urgentes au monde : le manque d’accès à une eau propre et sûre. Notre mission est simple, mais profonde : fournir des solutions d’eau durables aux communautés défavorisées. Nous croyons que l’accès à l’eau potable est un droit humain fondamental, et nous nous engageons à ce que personne n’en soit privé.',
  },
  es: {
    joinMission: 'Únete a nuestra misión',
    joinShort: 'Misión',
    donateNow: 'Donar ahora',
    missionText:
      'En H7O nos dedicamos a enfrentar una de las crisis más urgentes del mundo: la falta de acceso a agua limpia y segura. Nuestra misión es sencilla, pero profunda: brindar soluciones de agua sostenibles a comunidades desatendidas. Creemos que el acceso al agua limpia es un derecho humano fundamental, y estamos comprometidos a garantizar que nadie tenga que vivir sin ella.',
  },
  pt_PT: {
    joinMission: 'Junte-se à nossa missão',
    joinShort: 'Missão',
    donateNow: 'Doar agora',
    missionText:
      'Na H7O, dedicamo-nos a enfrentar uma das crises mais urgentes do mundo: a falta de acesso a água potável e segura. A nossa missão é simples, mas profunda — proporcionar soluções de água sustentáveis a comunidades carenciadas. Acreditamos que o acesso a água potável é um direito humano fundamental e estamos empenhados em garantir que ninguém fique privado dela.',
  },
  pt_BR: {
    joinMission: 'Junte-se à nossa missão',
    joinShort: 'Missão',
    donateNow: 'Doar Agora',
    missionText:
      'Na H7O, somos dedicados a enfrentar uma das crises mais urgentes do mundo: a falta de acesso a água limpa e segura. Nossa missão é simples, porém profunda — oferecer soluções sustentáveis de água a comunidades carentes. Acreditamos que o acesso à água limpa é um direito humano básico, e estamos comprometidos em garantir que ninguém precise viver sem ela.',
  },
  de: {
    joinMission: 'Werde Teil unserer Mission',
    joinShort: 'Mission',
    donateNow: 'Jetzt spenden',
    missionText:
      'Bei H7O widmen wir uns einer der dringendsten Krisen der Welt: dem fehlenden Zugang zu sauberem und sicherem Wasser. Unsere Mission ist einfach und doch tiefgreifend – nachhaltige Wasserlösungen für unterversorgte Gemeinschaften bereitzustellen. Wir sind überzeugt, dass der Zugang zu sauberem Wasser ein grundlegendes Menschenrecht ist, und wir setzen uns dafür ein, dass niemand darauf verzichten muss.',
  },
  nl: {
    joinMission: 'Doe mee met onze missie',
    joinShort: 'Missie',
    donateNow: 'Nu doneren',
    missionText:
      'Bij H7O zetten wij ons in voor een van de meest urgente crises ter wereld: het gebrek aan toegang tot schoon en veilig water. Onze missie is eenvoudig maar diepgaand — duurzame wateroplossingen bieden aan achtergestelde gemeenschappen. Wij geloven dat toegang tot schoon water een fundamenteel mensenrecht is, en wij zetten ons in om ervoor te zorgen dat niemand het zonder hoeft te stellen.',
  },
  cs: {
    joinMission: 'Přidejte se k naší misi',
    joinShort: 'Mise',
    donateNow: 'Darovat nyní',
    missionText:
      'Ve společnosti H7O se věnujeme řešení jedné z nejnaléhavějších krizí světa: nedostatku přístupu k čisté a bezpečné vodě. Naše poslání je jednoduché, a přesto hluboké — poskytovat udržitelná vodní řešení znevýhodněným komunitám. Věříme, že přístup k čisté vodě je základním lidským právem, a jsme odhodláni zajistit, aby o ni nikdo nepřišel.',
  },
  hr: {
    joinMission: 'Pridružite se našoj misiji',
    joinShort: 'Misija',
    donateNow: 'Doniraj odmah',
    missionText:
      'U H7O posvećeni smo rješavanju jedne od najhitnijih svjetskih kriza: nedostatka pristupa čistoj i sigurnoj vodi. Naša je misija jednostavna, ali duboka — pružiti održiva vodna rješenja zajednicama u nepovoljnom položaju. Vjerujemo da je pristup čistoj vodi temeljno ljudsko pravo i predani smo tome da nitko ne mora ostati bez nje.',
  },
  sv: {
    joinMission: 'Bli en del av vårt uppdrag',
    joinShort: 'Uppdrag',
    donateNow: 'Donera nu',
    missionText:
      'På H7O är vi engagerade i att hantera en av världens mest akuta kriser: bristen på tillgång till rent och säkert vatten. Vårt uppdrag är enkelt men ändå djupt — att tillhandahålla hållbara vattenlösningar till eftersatta samhällen. Vi tror att tillgång till rent vatten är en grundläggande mänsklig rättighet, och vi är fast beslutna att se till att ingen ska behöva vara utan det.',
  },
  no: {
    joinMission: 'Bli med på vårt oppdrag',
    joinShort: 'Oppdrag',
    donateNow: 'Doner nå',
    missionText:
      'I H7O er vi dedikert til å håndtere en av verdens mest presserende kriser: mangelen på tilgang til rent og trygt vann. Vårt oppdrag er enkelt, men dyptgripende — å tilby bærekraftige vannløsninger til underbetjente samfunn. Vi mener at tilgang til rent vann er en grunnleggende menneskerettighet, og vi er forpliktet til å sørge for at ingen må klare seg uten det.',
  },
  ar: {
    joinMission: 'انضم إلى مهمتنا',
    joinShort: 'مهمتنا',
    donateNow: 'تبرّع الآن',
    missionText:
      'في H7O، نكرّس جهودنا لمواجهة واحدة من أكثر الأزمات إلحاحًا في العالم: نقص الحصول على المياه النظيفة والآمنة. مهمتنا بسيطة لكنها عميقة — توفير حلول مياه مستدامة للمجتمعات المحرومة. نؤمن بأن الحصول على المياه النظيفة حق أساسي من حقوق الإنسان، ونلتزم بضمان ألا يُحرم منها أحد.',
  },
}

export function campaignStrings(appLang: string): CampaignStrings {
  return CAMPAIGN_I18N[waterLang(appLang)]
}

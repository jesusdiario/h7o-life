/** Ícone de gota d'água (arte colorida em public/water.svg). */
export default function WaterIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <img
      className={className}
      src={`${import.meta.env.BASE_URL}water.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      style={{ display: 'block' }}
    />
  )
}

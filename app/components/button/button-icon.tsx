import Image from 'next/image'

type ButtonIconProps = {
  icon: string
  alt: string
  width: number
  height: number
}
export function ButtonIcon({ icon, alt, width, height }: ButtonIconProps) {
  return <Image src={icon} alt={alt} width={width} height={height} />
}

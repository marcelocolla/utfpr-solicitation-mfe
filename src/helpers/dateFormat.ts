export const dataAgora = () => {
  return new Date().toLocaleDateString('fr-CA')
}

export const horaAgora = (): string => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}

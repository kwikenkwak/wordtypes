export const base = (props) => props.theme.colors.base
export const bg = (props) => props.theme.colors.bg
export const baseGraph = (props) => props.theme.colors.baseColorGraph

// Funky function factory (-:
export const clr = (color) => (props) => props.theme.colors[color]
export const bgBrightness = (props) => props.theme.background.brightness
export const acc = (props) => props.theme.colors.acc

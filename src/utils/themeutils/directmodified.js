import {
  transparentize as transparentizeP
} from 'polished'

export const transparentize = (percent, color) =>
  (props) => transparentizeP(percent, props.theme.colors[color])

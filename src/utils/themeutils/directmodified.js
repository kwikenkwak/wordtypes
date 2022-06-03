import {
  darken as darkenP, lighten as lightenP,
  transparentize as transparentizeP
} from 'polished'

export const darken = (percent, color) => (props) => darkenP(percent, props.theme.colors[color])
export const lighten = (percent, color) => (props) => lightenP(percent, props.theme.colors[color])
export const transparentize = (percent, color) =>
  (props) => transparentizeP(percent, props.theme.colors[color])
export const transDark = (percentDark, percentTrans, color) => props =>
  transparentizeP(percentTrans, darkenP(percentDark, props.theme.colors[color]))
export const transLighten = (percentLighten, percentTrans, color) => props =>
  transparentizeP(percentTrans, lightenP(percentLighten, props.theme.colors[color]))

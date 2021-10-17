import styled from 'styled-components'
import * as React from 'react'
const omit = require('lodash/omit')
import { animatePointer } from '../libs'
const quirkFixAttributes = [
  // 'align-items',
  // 'flex-direction',
  // 'justify-content',
  // 'animation',
  // 'animation-delay',
  // 'animation-direction',
  // 'animation-duration',
  // 'animation-iteration-count',
  // 'animation-name',
  // 'animation-play-state',
  // 'animation-timing-function',
  // 'azimuth',
  // 'backface-visibility',
  // 'background',
  // 'background-attachment',
  // 'background-clip',
  // 'background-color',
  // 'background-image',
  // 'background-origin',
  // 'background-position',
  // 'background-repeat',
  // 'background-size',
  // 'bleed',
  'border',
  'border-bottom',
  // 'border-bottom-color',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
  // 'border-bottom-style',
  'border-bottom-width',
  // 'border-collapse',
  // 'border-color',
  // 'border-image',
  // 'border-image-outset',
  // 'border-image-repeat',
  // 'border-image-source',
  'border-image-width',
  'border-left',
  // 'border-left-color',
  // 'border-left-style',
  'border-left-width',
  'border-radius',
  'border-right',
  // 'border-right-color',
  // 'border-right-style',
  'border-right-width',
  'border-spacing',
  // 'border-style',
  'border-top',
  // 'border-top-color',
  'border-top-left-radius',
  'border-top-right-radius',
  // 'border-top-style',
  'border-top-width',
  'border-width',
  'bottom',
  // 'box-shadow',
  // 'box-sizing',
  // 'caption-side',
  // 'clear',
  // 'clip',
  // 'color',
  // 'column-count',
  // 'column-fill',
  // 'column-gap',
  // 'column-rule',
  // 'column-rule-color',
  // 'column-rule-style',
  // 'column-rule-width',
  // 'column-span',
  // 'column-width',
  // 'columns',
  // 'content',
  // 'counter-increment',
  // 'counter-reset',
  // 'cursor',
  // 'direction',
  // 'display',
  // 'empty-cells',
  // 'float',
  'font',
  // 'font-family',
  'font-size',
  // 'font-size-adjust',
  // 'font-stretch',
  // 'font-style',
  // 'font-variant',
  // 'font-weight',
  'height',
  // 'hyphens',
  // 'image-rendering',
  'left',
  // 'letter-spacing',
  'line-height',
  // 'list-style',
  // 'list-style-image',
  // 'list-style-position',
  // 'list-style-type',
  'margin',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'margin-top',
  // 'marker-offset',
  // 'marks',
  'max-height',
  'max-width',
  'min-height',
  'min-width',
  // 'order',
  // 'opacity',
  // 'orphans',
  // 'outline',
  // 'outline-color',
  // 'outline-offset',
  // 'outline-style',
  'outline-width',
  // 'overflow',
  // 'overflow-x',
  'padding',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'padding-top',
  // 'page-break-after',
  // 'page-break-before',
  // 'page-break-inside',
  // 'perspective',
  // 'perspective-origin',
  // 'position',
  // 'quotes',
  // 'resize',
  'right',
  // 'tab-size',
  // 'table-layout',
  // 'text-align',
  // 'text-align-last',
  // 'text-decoration',
  // 'text-decoration-color',
  // 'text-decoration-line',
  // 'text-decoration-style',
  // 'text-indent',
  // 'text-shadow',
  // 'text-transform',
  'top',
  // 'transform',
  // 'transform-origin',
  // 'transform-style',
  // 'transition',
  // 'transition-delay',
  // 'transition-duration',
  // 'transition-property',
  // 'transition-timing-function',
  // 'vertical-align',
  // 'visibility',
  // 'white-space',
  // 'widows',
  'width',
  // 'word-spacing',
  // 'word-wrap',
  // 'z-index'
]

// [
//   'margin',
//   'margin-top',
//   'margin-left',
//   'margin-right',
//   'margin-bottom',
//   'padding',
//   'padding-left',
//   'padding-right',
//   'padding-bottom',
//   'padding-top',
//   'font-size',

//   'width',
//   'max-width',
//   'min-width',
//   'height',
//   'max-height',
//   'min-height',

//   'top',
//   'left',
//   'right',
//   'bottom',
//   'border',
//   'border-bottom',
//   'border-top',
//   'border-left',
//   'border-right'
// ]
const DELAY_DURATION_FOR_ANIMATION = 500

export default class UIView extends React.Component<UI.BaseProps> {
  render() {
    return (
      <Enhancer>
        <BaseView
          {...omit(this.props, 'style')}
          onClick={(e: any) => {
            // e.stopPropagation()
            if (this.props.shouldAnimate) {
              animatePointer(e, 1000)
              setTimeout(() => {
                this.props.onClick && this.props.onClick(e)
              }, DELAY_DURATION_FOR_ANIMATION)
            } else {
              this.props.onClick && this.props.onClick(e)
            }
          }}
        >
          {this.props.children}
        </BaseView>
      </Enhancer>
    )
  }
}

export const Enhancer = (props: any) => {
  const el: any = props.children

  const elProps = {
    ...omit(el.props, 'default-style', 'custom-style', 'dark-style'),
    'sf-default-style': el.props['default-style'],
    'sf-custom-style': el.props['custom-style'],
    'sf-dark-style': el.props['dark-style'],
  }
  return React.cloneElement(el, { ...sfConvertStyles(elProps) })
}

export const BaseView = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
  ${(p: any) =>
    p['sf-default-style'] &&
    fixtemplateStringStyle(p['sf-default-style'](p.theme))}
  ${(p: any) => p['sf-css']};
  ${(p: any) =>
    p['sf-custom-style'] &&
    fixtemplateStringStyle(p['sf-custom-style'](p.theme))}
  ${(p: any) =>
    p.theme.darkmode &&
    p['dark-background-level'] &&
    `background: ${
      p.theme.dark_background[p['dark-background-level']]
    } !important;`}
    ${(p: any) =>
      p.theme.darkmode &&
      p['sf-dark-style'] &&
      fixtemplateStringStyle(p['sf-dark-style'](p.theme))}
`
/**
 * CORE CSS MECHANISM
 * Do not touch any single line of this function if you DONT understand this
 * @param props
 */

const validCssProperty = [
  'align-items',
  'flex-direction',
  'justify-content',
  'animation',
  'animation-delay',
  'animation-direction',
  'animation-duration',
  'animation-iteration-count',
  'animation-name',
  'animation-play-state',
  'animation-timing-function',
  'azimuth',
  'backface-visibility',
  'background',
  'background-attachment',
  'background-clip',
  'background-color',
  'background-image',
  'background-origin',
  'background-position',
  'background-repeat',
  'background-size',
  'bleed',
  'border',
  'border-bottom',
  'border-bottom-color',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
  'border-bottom-style',
  'border-bottom-width',
  'border-collapse',
  'border-color',
  'border-image',
  'border-image-outset',
  'border-image-repeat',
  'border-image-source',
  'border-image-width',
  'border-left',
  'border-left-color',
  'border-left-style',
  'border-left-width',
  'border-radius',
  'border-right',
  'border-right-color',
  'border-right-style',
  'border-right-width',
  'border-spacing',
  'border-style',
  'border-top',
  'border-top-color',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-top-style',
  'border-top-width',
  'border-width',
  'bottom',
  'box-shadow',
  'box-sizing',
  'caption-side',
  'clear',
  'clip',
  'color',
  'column-count',
  'column-fill',
  'column-gap',
  'column-rule',
  'column-rule-color',
  'column-rule-style',
  'column-rule-width',
  'column-span',
  'column-width',
  'columns',
  'content',
  'counter-increment',
  'counter-reset',
  'cursor',
  'direction',
  'display',
  'empty-cells',
  'float',
  'font',
  'font-family',
  'font-size',
  'font-size-adjust',
  'font-stretch',
  'font-style',
  'font-variant',
  'font-weight',
  'height',
  'hyphens',
  'image-rendering',
  'left',
  'letter-spacing',
  'line-height',
  'list-style',
  'list-style-image',
  'list-style-position',
  'list-style-type',
  'margin',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'margin-top',
  'marker-offset',
  'marks',
  'max-height',
  'max-width',
  'min-height',
  'min-width',
  'order',
  'opacity',
  'orphans',
  'outline',
  'outline-color',
  'outline-offset',
  'outline-style',
  'outline-width',
  'overflow',
  'overflow-x',
  'padding',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'padding-top',
  'page-break-after',
  'page-break-before',
  'page-break-inside',
  'perspective',
  'perspective-origin',
  'position',
  'quotes',
  'resize',
  'right',
  'tab-size',
  'table-layout',
  'text-align',
  'text-align-last',
  'text-decoration',
  'text-decoration-color',
  'text-decoration-line',
  'text-decoration-style',
  'text-indent',
  'text-shadow',
  'text-transform',
  'top',
  'transform',
  'transform-origin',
  'transform-style',
  'transition',
  'transition-delay',
  'transition-duration',
  'transition-property',
  'transition-timing-function',
  'vertical-align',
  'visibility',
  'white-space',
  'widows',
  'width',
  'word-spacing',
  'word-wrap',
  'z-index',
]
export const sfConvertStyles = (props: any) => {
  const newProps = Object.assign({}, props)
  const keys = Object.keys(newProps)
  let allCss = ''
  let mobileCss = ''
  let tabletCss = ''
  let laptopCss = ''
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = props[key]

    if (key.match(/mobile/)) {
      const mobileKey = key.replace('-mobile', '')
      if (validCssProperty.indexOf(mobileKey) >= 0) {
        // handle quirkmode with mobile
        let formatValue = value
        if (quirkFixAttributes.indexOf(mobileKey) >= 0) {
          formatValue = addUnit(formatValue)
        }
        // ===== //
        const record = mobileKey + ':' + formatValue + ';'
        mobileCss += record
        delete newProps[key]
      }
    } else if (key.match(/tablet/)) {
      const tabletKey = key.replace('-tablet', '')
      if (validCssProperty.indexOf(tabletKey) >= 0) {
        // handle quirkmode
        // todo update all other screen types
        let formatValue = value
        if (quirkFixAttributes.indexOf(tabletKey) >= 0) {
          formatValue = addUnit(formatValue)
        }

        // ===== //
        const record = tabletKey + ':' + formatValue + ';'
        tabletCss += record
        delete newProps[key]
      }
    } else if (key.match(/laptop/)) {
      const laptopKey = key.replace('-laptop', '')
      if (validCssProperty.indexOf(laptopKey) >= 0) {
        // handle quirkmode
        // todo update all other screen types
        let formatValue = value
        if (quirkFixAttributes.indexOf(laptopKey) >= 0) {
          formatValue = addUnit(formatValue)
        }

        // ===== //

        const record = laptopKey + ':' + formatValue + ';'
        laptopCss += record
        delete newProps[key]
      }
    } else {
      if (validCssProperty.indexOf(key) >= 0) {
        // handle quirkmode
        let formatValue = value
        if (quirkFixAttributes.indexOf(key) >= 0) {
          formatValue = addUnit(formatValue)
        }
        const record = key + ':' + formatValue + ';'
        allCss += record
        delete newProps[key]
      }
    }
  }
  allCss = fixSafariListWrongRender(allCss)
  newProps['sf-css'] = `${allCss}${
    laptopCss &&
    '@media only screen and (max-width: 1024px) { ' + laptopCss + '}'
  }${
    tabletCss &&
    '@media only screen and (max-width: 768px) { ' + tabletCss + '}'
  }
    ${
      mobileCss &&
      '@media only screen and (max-width: 480px) { ' + mobileCss + '}'
    }
  `
  return newProps
}
function isInt(n: any) {
  return n % 1 === 0
}
const addUnit = (str: string) => {
  // toString here to make sure all the input is string type instead of number type
  if (str.toString().match(/\(/)) {
    return str
  }
  return str
    .toString()
    .split(' ')
    .map((i: any) => {
      if (!isNaN(i) && isInt(i)) {
        i = i + 'px'
      }
      return i
    })
    .toString()
    .replace(/,/g, ' ')
}

const fixtemplateStringStyle = (str: string) => {
  // TEST RESULT AFTER FIXING

  // console.log(
  //   str.replace(/:.[^{^;^:]*;/g, (res: string, pos: number) => {
  //     const isZIndex =
  //       str.charAt(pos - 3) + str.charAt(pos - 2) + str.charAt(pos - 1) == 'dex'
  //     if (isZIndex) return res
  //     return ': ' + addUnit(res.substring(2, res.length - 1)) + ';'
  //   })
  // )
  const excludedAttrs = ['z-index', '-weight']
  // actual css attrs z-index | font-weight
  return str.replace(/:.[^{^;^:]*;/g, (res: string, pos: number) => {
    // get a string of five last chars
    const k =
      str.charAt(pos - 7) +
      str.charAt(pos - 6) +
      str.charAt(pos - 5) +
      str.charAt(pos - 4) +
      str.charAt(pos - 3) +
      str.charAt(pos - 2) +
      str.charAt(pos - 1)

    // fix render safari with overflow
    if ('overflow'.indexOf(k) >= 0) {
      const val = res.substring(2, res.length - 1)
      return val == 'auto' ? ': auto; display: block;' : ': ' + val + ';'
    }
    // if that string is inside excluded attrs, do nothing
    if (excludedAttrs.indexOf(k) >= 0) return res
    // else do something
    return ': ' + addUnit(res.substring(2, res.length - 1)) + ';'
  })
}

const fixSafariListWrongRender = (str: string) => {
  if (str.indexOf('overflow:auto') >= 0) {
    return (str += 'display: block;')
  }
  return str
}

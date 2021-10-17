import * as React from 'react'
import styled from 'styled-components'
import { Enhancer, BaseView } from 'components/View'
import ThemeValueProvider from './ThemeValueProvider'

/**
 * name of icons should be taken from Google Material Icons
 * link: https://material.io/tools/icons/
 */
export default class UIIcon extends React.Component<UI.IconProps> {
  render() {
    const defaultIconType = 'material-icons'
    return (
      <ThemeValueProvider>
        {(theme: any) => {
          return (
            <Enhancer>
              <Wrapper
                className={`${
                  this.props.iconType
                    ? this.props.iconType
                    : theme.iconType || defaultIconType
                }`}
                default-style={(theme: any) => `
                  color: ${theme.primary_text};
                  width: fit-content;
                  user-select: none;
                  cursor: pointer;`}
                {...this.props}
              >
                {this.props.name}
              </Wrapper>
            </Enhancer>
          )
        }}
      </ThemeValueProvider>
    )
  }
}

const Wrapper = styled(BaseView)`
  ${(p: any) => {
    switch (p.variant) {
      case 'primary':
        return 'color: ' + p.theme.primary + ';'
      case 'accent':
        return 'color: ' + p.theme.accent + ';'
      default:
        return ''
    }
  }}

  ${(p: any) =>
    p.theme.darkmode &&
    `color: ${
      p['bright-color-level']
        ? p.theme.bright_color[p['bright-color-level']]
        : p.theme.bright_color[0]
    };`}
`

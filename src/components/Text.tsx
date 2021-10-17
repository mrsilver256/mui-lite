import * as React from 'react'
import styled from 'styled-components'
import { Enhancer, BaseView } from 'components/View'

export default class UIText extends React.Component<UI.TextProps> {
  render() {
    return (
      <Enhancer>
        <Wrapper
          {...this.props}
          default-style={(theme: any) => `color: ${theme.primary_text}`}
        >
          <span>{this.props.children}</span>
        </Wrapper>
      </Enhancer>
    )
  }
}

const Wrapper = styled(BaseView)`
  white-space: pre-wrap;
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

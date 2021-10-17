import * as React from 'react'
import UIView, { BaseView, Enhancer } from 'components/View'
import styled from 'styled-components'
const map = require('lodash/map')

export default class List extends React.Component<UI.ListProps> {
  render() {
    return (
      <Enhancer>
        <Wrapper {...this.props}>
          {map(
            this.props.items,
            (item: any, ind: number) =>
              this.props.children &&
              React.cloneElement(this.props.children(item, ind), { key: ind })
          )}
        </Wrapper>
      </Enhancer>
    )
  }
}

const Wrapper = styled(BaseView)`
  -webkit-overflow-scrolling: touch;
  ${(p: any) => {
    switch (p.variant) {
      case 'primary':
        return 'background: ' + p.theme.primary + '; color: white;'
      case 'accent':
        return 'background: ' + p.theme.accent + '; color: white;'
      default:
        return ''
    }
  }}
`

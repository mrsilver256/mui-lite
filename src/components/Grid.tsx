import * as React from 'react'
import UIView, { BaseView, Enhancer } from 'components/View'
import styled from 'styled-components'
const map = require('lodash/map')

export default class List extends React.Component<UI.GridProps> {
  render() {
    return (
      <Enhancer>
        <Wrapper
          {...this.props}
          default-style={() => `
              flex-direction: row;
              flex-wrap: wrap;
            `}
        >
          {map(
            this.props.items,
            (item: any, ind: number) =>
              this.props.children &&
              React.cloneElement(this.props.children(item, ind), {
                key: ind,
                width: this.props['column']
                  ? `${100 / (this.props['column'] || 1)}%`
                  : '',
                'width-mobile': this.props['column-mobile']
                  ? `${100 / (this.props['column-mobile'] || 1)}%`
                  : '',
                'width-tablet': this.props['column-tablet']
                  ? `${100 / (this.props['column-tablet'] || 1)}%`
                  : '',
                'width-laptop': this.props['column-laptop']
                  ? `${100 / (this.props['column-laptop'] || 1)}%`
                  : '',
              })
          )}
        </Wrapper>
      </Enhancer>
    )
  }
}

const Wrapper = styled(BaseView)`
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

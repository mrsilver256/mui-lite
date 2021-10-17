import * as React from 'react'
import styled from 'styled-components'
import { BaseView, Enhancer } from 'components/View'
import ControlTransformer from './Advanced/ControlTransformer'
// TODO understand the UIKit flow
// Update building process
// TODO Simplify the Kit
// Upgrade UI
// Learn Circle CI

export default class SwitchView extends React.Component<UI.SwitchInterface> {
  render() {
    return (
      <Enhancer>
        <BaseView {...this.props}>
          <Wrapper
            onClick={(e: any) => {
              e.preventDefault()
              this.props.onChange && this.props.onChange(!this.props.value)
            }}
            data-width={this.props.switchWidth}
            data-height={this.props.switchHeight}
          >
            <Bar
              data-value={this.props.value}
              data-background={this.props.secondaryColor}
            />
            <Control
              data-value={this.props.value}
              data-size={this.props.iconSize}
              data-background={this.props.primaryColor}
            />
          </Wrapper>
        </BaseView>
      </Enhancer>
    )
  }
}
const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  pointer-event: cursor;
  ${(p: any) =>
    p['data-width'] ? 'width: ' + p['data-width'] + ';' : 'width: 28px;'}
  ${(p: any) =>
    p['data-height'] ? 'height: ' + p['data-height'] + ';' : 'height: 20px;'}
`

const Bar = styled.div`
  border-radius: 70px;
  width: 100%;
  height: 70%;
  position: absolute;

  background: #9e9e9e;
  &[data-value='true'] {
    background: ${(p: any) =>
      p['data-background'] ? p['data-background'] : '#90caf9'};
  }
`

const Control = styled.div`
  position: absolute;
  border-radius: 50%;
  ${(p: any) =>
    p['data-size']
      ? 'width: ' + p['data-size'] + 'px; height: ' + p['data-size'] + 'px;'
      : 'width: 16px; height: 16px;'}
  box-shadow: ${(p: any) => p.theme.shadow_level_1};

  left: 0;
  background: white;
  &[data-value='true'] {
    ${(p: any) =>
      p['data-size']
        ? 'left: calc(100% - ' + p['data-size'] + 'px);'
        : ' left: calc(100% - 16px);'}
    background: ${(p: any) =>
      p['data-background'] ? p['data-background'] : p.theme.accent};
  }
  transition: 0.2s;
`

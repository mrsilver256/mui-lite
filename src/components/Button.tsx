import * as React from 'react'
import { Enhancer, BaseView, sfConvertStyles } from 'components/View'
import styled from 'styled-components'
import { animatePointer } from '../libs'

const DELAY_DURATION_FOR_ANIMATION = 500

export default class UIButton extends React.Component<UI.ButtonProps> {
  render() {
    return (
      <Enhancer>
        <Wrapper
          {...this.props}
          default-style={(theme: any) => `
              position: relative;
              overflow: hidden;
              min-height: 36px;
              box-shadow: ${theme.shadow_level_1};
              padding: 0 10;
              background: white;
              text-align: center;
              border-radius: 2px;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              user-select: none;
              min-width: 70px; 
              width: fit-content;                   
            `}
          onClick={(e: any) => {
            e.stopPropagation()
            if (this.props.shouldAnimate) {
              animatePointer(e, 1000)
              setTimeout(() => {
                this.props.onClick && this.props.onClick(e)
              }, DELAY_DURATION_FOR_ANIMATION)
            } else {
              this.props.onClick && this.props.onClick(e)
            }
            if (this.props.href) window.location.href = this.props.href
          }}
        >
          {this.props.variant == 'file' && (
            <input
              type="file"
              multiple
              style={{
                opacity: 0,
                position: 'absolute',
                cursor: 'pointer',
                top: '-35',
                height: 'calc(100% + 35px)',
                width: '100%'
              }}
            />
          )}
          {this.props.children}
        </Wrapper>
      </Enhancer>
    )
  }
}

const Wrapper = styled(BaseView)`
  ${(p: any) => {
    switch (p.variant) {
      case 'primary': {
        if (p.type == 'text')
          return (
            'background: none; box-shadow: none; color: ' +
            p.theme.primary +
            ';'
          )
        if (p.type == 'outline')
          return (
            'background: none; box-shadow: none; border: 1px solid ' +
            p.theme.primary +
            '; color: ' +
            p.theme.primary +
            ';'
          )
        return 'background: ' + p.theme.primary + '; color: white;'
      }
      case 'accent': {
        if (p.type == 'text')
          return (
            'background: none; box-shadow: none; color: ' + p.theme.accent + ';'
          )
        if (p.type == 'outline')
          return (
            'background: none; box-shadow: none; border: 1px solid ' +
            p.theme.accent +
            '; color: ' +
            p.theme.accent +
            ';'
          )
        return 'background: ' + p.theme.accent + '; color: white;'
      }
      case 'disabled': {
        if (p.type == 'text')
          return 'background: none; box-shadow: none; color: rgba(0,0,0,0.26); pointer-events: none;'
        if (p.type == 'outline')
          return 'background: none; box-shadow: none; border: 1px solid rgba(0,0,0,0.23); color: rgba(0,0,0,0.26); pointer-events: none;'
        return 'box-shadow: none; background: rgba(0,0,0,0.12); color: rgba(0,0,0,0.26); pointer-events: none;'
      }
      default: {
        if (p.type == 'text') return 'background: none; box-shadow: none;'
        if (p.type == 'outline')
          return ' background: none; box-shadow: none; border: 1px solid rgba(0,0,0,0.23);'
        return ''
      }
    }
  }}

  ${(p: any) =>
    p.theme.darkmode &&
    p.type === 'text' &&
    !p.variant &&
    `color: ${
      p['bright-color-level']
        ? p.theme.bright_color[p['bright-color-level']]
        : p.theme.bright_color[0]
    };`}

    ${(p: any) =>
      p.theme.darkmode &&
      p.type === 'outline' &&
      `color: ${
        p['bright-color-level']
          ? p.theme.bright_color[p['bright-color-level']]
          : p.theme.bright_color[0]
      } !important; border: 1px solid ${
        p['bright-color-level']
          ? p.theme.bright_color[p['bright-color-level']]
          : p.theme.bright_color[0]
      }`}
`

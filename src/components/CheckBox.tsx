import * as React from 'react'
import styled from 'styled-components'
import UIText from './Text'
import { BaseView, Enhancer } from './View'

export default class CheckBox extends React.Component<UI.CheckboxProps> {
  handleChange = (e: any) => {
    e.stopPropagation()
    if (this.props.onChange) {
      this.props.onChange(e.target.checked)
    }
  }
  render() {
    return (
      <Enhancer>
        <Wrapper
          {...this.props}
          default-style={(theme: any) => `
         position: relative;
         display: flex;
         align-items: center;
         justify-content: flex-start;
         & input[type='checkbox'] {
           -webkit-appearance: none;
           width: 16px;
           height: 16px;
           position: absolute;
           left: 3px;
           margin: 0;
           cursor: pointer;
           border: none;
           outline: none;
           background: none !important;
         }
       
         & i {
           cursor: pointer;
           color: ${theme.secondary_text};
           font-size: 22px;
         }
       
         & i.checked {
           color: ${theme.accent};
         }
       
         &[data-inverted='true'] i,
         &[data-inverted='true'] i.checked {
           color: white;
         }
       
         & input[type='checkbox']:focus {
           outline: none;
         }
        `}
        >
          {this.props.value ? (
            <i
              className="material-icons checked"
              onClick={() => {
                this.props.onChange && this.props.onChange(false)
              }}
            >
              check_box
            </i>
          ) : (
            <i
              className="material-icons"
              onClick={() => {
                this.props.onChange && this.props.onChange(true)
              }}
            >
              check_box_outline_blank
            </i>
          )}
          <UIText
            onClick={() => {
              this.props.onChange && this.props.onChange(!this.props.value)
            }}
          >
            {this.props.label}
          </UIText>
        </Wrapper>
      </Enhancer>
    )
  }
}

const Wrapper = styled(BaseView)`
  ${(p: any) =>
    p.theme.darkmode &&
    ` i { color: ${
      p['bright-color-level']
        ? p.theme.bright_color[p['bright-color-level']]
        : p.theme.bright_color[0]
    } !important;}`}
`

import * as React from 'react'
import { Enhancer, BaseView } from 'components/View'
import styled from 'styled-components'
const getOnlyNumber = (str: string) => {
  const temp = str.match(/\d+/g)
  const addedString = str.charAt(0) === '-' ? '-' : ''
  if (temp) {
    return addedString + temp.toString().replace(/,/g, '')
  } else {
    return ''
  }
}
export default class UIInput extends React.Component<UI.InputProps> {
  state = {
    isActive: false
  }

  componentDidMount() {
    if (this.props.type == 'password')
      setTimeout(() => {
        const inputs = document.querySelectorAll('input:-webkit-autofill')
        if (inputs.length > 0) {
          for (let i = 0; i < inputs.length; i++) {
            const e = inputs[i].parentElement
            e && e.setAttribute('data-active', 'true')
          }
        }
      }, 200)
  }
  render() {
    if (this.props.variant === 'multiline') {
      return (
        <Enhancer>
          <TextAreaWrapper
            {...this.props}
            default-style={(theme: any) => `
            position: relative;
            margin: 5 0;
            label {
              position: absolute;
              top: -5px;
              font-size: 10px;
              left: 5;
              color: ${theme.primary};
              background: white;
              padding: 0 1;
            }

            textarea {
              border: 1px solid ${theme.divider};
              border-radius: 3px;
              width: 100%;
              min-height: 100px;
              font-size: 14px;
              padding: 12 7;
              line-height: 23px;
              resize: none;
              font-family: Roboto !important;

              &:focus {
                outline: none !important;
                padding: 11 6;
                border: 2px solid ${theme.accent};
              }
            }
        `}
            dark-style={(theme: any) => `
            label {
              background: ${theme.dark_background[5]} !important;
            }
      `}
          >
            <label>{this.props.label}</label>
            <textarea
              placeholder={this.props.placeholder}
              value={this.props.value}
              onChange={(e: any) => {
                e.stopPropagation()
                this.props.onChange && this.props.onChange(e.target.value)
              }}
            />
          </TextAreaWrapper>
        </Enhancer>
      )
    } else
      return (
        <Enhancer>
          <Wrapper
            {...this.props}
            data-active={
              this.state.isActive ||
              !!this.props.value ||
              !this.props.label ||
              !!this.props.placeholder
            }
            default-style={(theme: any) => `
          position: relative;
          label {
            position: absolute;
            color: ${theme.secondary_text};
            pointer-events: none;
            transition: 0.3s;
            bottom: 7;
            padding-left: 2px;
          }
        
          input {                     
            height: 30px;
            border: none;
            border-bottom: 1px solid ${theme.divider};
            width: 100%;
            font-size: 14px;
            background: transparent;  
            -webkit-border-radius: 0px;
            -webkit-appearance: none;  
            &:focus {
              outline: none;
              border-bottom: 2px solid ${theme.accent} !important;
              padding-top: 1px !important;
            }
          }
          
          input::placeholder {
            opacity: 0;
            transition: 0.3s;
          }            

          &[data-active='true'] {
            label {
              color: ${theme.primary};
              font-size: 10px;
              padding-bottom: 20px;
            }

            input::placeholder {
              opacity: 1;
            }
          }
          `}
          >
            {this.props.label && (
              <label>
                {this.props.label}
                {this.props.required && <span style={{ color: 'red' }}>*</span>}
              </label>
            )}
            <input
              autoComplete={this.props.autoComplete}
              type={this.props.type === 'number' ? 'text' : this.props.type}
              placeholder={this.props.placeholder}
              value={
                this.props.value && this.props.type === 'number'
                  ? this.props.value.replace(/\s/g, '')
                  : this.props.value
              }
              onChange={(e: any) => {
                e.stopPropagation()
                if (this.props.onChange) {
                  if (this.props.type === 'number') {
                    const value = getOnlyNumber(e.target.value)
                    if (
                      (value || (value && value.charAt(0) === '0')) &&
                      !isNaN(parseInt(value))
                    ) {
                      const addedString =
                        value.charAt(0) === '0' && value.length > 1 ? '0' : ''
                      // if the value string is a number
                      this.props.onChange(
                        addedString + parseInt(value).toString()
                      )
                    } else {
                      if (e.target.value === '-') {
                        this.props.onChange('-')
                      } else {
                        this.props.onChange('')
                      }
                    }
                  } else {
                    this.props.onChange(e.target.value)
                  }
                }
              }}
              onMouseDown={(e: any) => {
                e.stopPropagation()
                this.setState({ isActive: true })
              }}
              onBlur={(e: any) => {
                e.stopPropagation()
                if (!e.target.value) {
                  this.setState({ isActive: false })
                }
              }}
            />
          </Wrapper>
        </Enhancer>
      )
  }
}
const Wrapper = styled(BaseView)`
  input {
    ${(p: any) =>
      p.theme.darkmode &&
      `color: ${
        p['bright-color-level']
          ? p.theme.bright_color[p['bright-color-level']]
          : p.theme.bright_color[0]
      } !important;`}
  }
`
const TextAreaWrapper = styled(BaseView)`
  textarea {
    ${(p: any) =>
      p.theme.darkmode &&
      `color: ${
        p['bright-color-level']
          ? p.theme.bright_color[p['bright-color-level']]
          : p.theme.bright_color[0]
      } !important;
      background: ${p.theme.dark_background[5]};`}
  }
`

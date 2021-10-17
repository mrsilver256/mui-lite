import * as React from 'react'
import UIView, { Enhancer, BaseView } from 'components/View'
import UIText from 'components/Text'
import UIIcon from 'components/Icon'
import styled from 'styled-components'

export default class Toggle extends React.Component<UI.ToggleProps> {
  render() {
    return (
      <Enhancer>
        <Wrapper
          {...this.props}
          default-style={(theme: any) => `              
          border: 1px solid ${theme.grey};
          border-radius: 3px 3px 0 0;  
          `}
        >
          <UIView
            default-style={(theme: any) => `
            background: ${this.props.headerBackground || ''};
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            min-height: 48px;
            user-select: none;
            cursor: pointer;                             
          `}
            onClick={() => {
              this.props.onChange && this.props.onChange(!this.props.isOpen)
            }}
          >
            <UIText>{this.props.label}</UIText>
            <UIIcon
              data-active={this.props.isOpen}
              name="expand_more"
              custom-style={(theme: any) => `
              transition: 0.2s;
              transform:rotate(0);
              color:${theme.secondary_text};
              &[data-active='true']{
                transform: rotate(180deg);
              }
            `}
            />
          </UIView>
          <UIView
            data-active={this.props.isOpen}
            default-style={(theme: any) => `                                    
            max-height: 0;          
            transform: scaleY(0);
            transform-origin: top;
            &[data-active='true'] {  
              overflow-y: auto;                                              
              height: auto;
              max-height: 400px;
              transform: scaleY(1);             
            }
          `}
          >
            {this.props.children}
          </UIView>
        </Wrapper>
      </Enhancer>
    )
  }
}

const Wrapper = styled(BaseView)``

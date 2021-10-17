import * as React from 'react'
import styled from 'styled-components'
import * as ReactDOM from 'react-dom'
import { Enhancer, BaseView } from 'components/View'
const omit = require('lodash/omit')

export default class Modal extends React.Component<UI.ModalProps> {
  render() {
    const content = (
      <Enhancer>
        <Wrapper
          {...omit(this.props, 'onClickOutside')}
          data-component="overlay"
          default-style={(theme: any) => `
            position: fixed;
            background: rgba(0, 0, 0, 0.7);
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
        `}
          onClick={(e: any) => {
            this.props.onClick && this.props.onClick(e)
            if (this.props.onClickOutside) {
              this.props.onClickOutside(e)
            }
          }}
        >
          {this.props.children.length == undefined
            ? React.cloneElement(this.props.children, {
                ...this.props.children.props,
                onClick: (e: any) => {
                  this.props.onClickOutside && e.stopPropagation()

                  this.props.children.props.onClick &&
                    this.props.children.props.onClick(e)
                }
              })
            : this.props.children}
        </Wrapper>
      </Enhancer>
    )
    return (
      this.props.open &&
      (this.props.portalAddress
        ? ReactDOM.createPortal(
            content,
            document.getElementById(this.props.portalAddress) as HTMLElement
          )
        : content)
    )
  }
}

const Wrapper = styled(BaseView)``

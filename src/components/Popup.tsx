import * as React from 'react'
import * as ReactDOM from 'react-dom'
import UIView from './View'

export default class Popup extends React.Component<UI.PopupProps> {
  triggerRef: any
  popupRef: any
  componentDidMount() {
    this.props.showPopup && this.update()
  }

  componentDidUpdate() {
    this.props.showPopup && this.update()
  }
  update = () => {
    const triggerDOM = ReactDOM.findDOMNode(this.triggerRef) as HTMLElement
    const triggerBox = triggerDOM.getBoundingClientRect()
    const popupDOM = ReactDOM.findDOMNode(this.popupRef) as HTMLElement
    const popupBox = popupDOM.getBoundingClientRect()

    let popupTop =
      this.props.direction === 'up'
        ? triggerBox.top - popupBox.height
        : triggerBox.top + triggerBox.height

    popupDOM.style.top = (popupTop > 0 ? popupTop : 0) + 'px'
    popupDOM.style.left = (triggerBox.left > 0 ? triggerBox.left : 0) + 'px'
    popupDOM.style.width =
      (triggerBox.width < document.body.offsetWidth
        ? triggerBox.width
        : document.body.offsetWidth) + 'px'
  }

  render() {
    const popupContent = (
      <UIView
        key="popup"
        ref={(r: any) => (this.popupRef = r)}
        default-style={(theme: any) => `
          background: white;
          position: absolute;
          box-shadow: ${theme.shadow_level_1};
          overflow: hidden;
          visibility: ${this.props.showPopup ? 'visible' : 'hidden'}
          z-index: 2;
          transition: 0.3s;
          height: auto;
        `}
        custom-style={this.props.popupStyle}
      >
        {this.props.children}
      </UIView>
    )
    return [
      React.cloneElement(this.props.trigger, {
        ref: (r: any) => (this.triggerRef = r),
        key: 'trigger'
      }),
      this.props.portalAddress
        ? ReactDOM.createPortal(
            popupContent,
            document.getElementById(this.props.portalAddress) as HTMLElement
          )
        : popupContent
    ]
  }
}

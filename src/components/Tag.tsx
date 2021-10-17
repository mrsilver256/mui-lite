import * as React from 'react'
const omit = require('lodash/omit')
export default class UITag extends React.Component<UI.TagProps> {
  render() {
    return (
      this.props.tag &&
      React.createElement(this.props.tag, omit(this.props, 'tag'))
    )
  }
}

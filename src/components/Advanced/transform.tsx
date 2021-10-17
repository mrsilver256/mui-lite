import * as React from 'react'
import ControlTransformer from './ControlTransformer'
const omit = require('lodash/omit')

export const transformControl = (Element: any) => {
  return class extends React.Component<any> {
    render() {
      return (
        <ControlTransformer
          // bind={this.props.bind}
          // bindValueKey={this.props.bindValueKey}
          // defaultValue={this.props.defaultValue}
          // handleData={this.props.handleData}
          // sync={this.props.sync}
          {...this.props}
        >
          <Element
            {...omit(
              this.props,
              'bind',
              'bindValueKey',
              'defaultValue',
              'sync',
              'handleData'
            )}
          />
        </ControlTransformer>
      )
    }
  }
}

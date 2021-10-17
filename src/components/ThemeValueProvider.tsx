import * as React from 'react'
import { withTheme } from 'styled-components'
class ThemeValueProvider extends React.Component<{
  children?: any
  theme?: any
}> {
  render() {
    return this.props.children(this.props.theme)
  }
}
export default withTheme(ThemeValueProvider)

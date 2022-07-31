import * as React from 'react'
import UI from '../../js/output'
export default class Main extends React.Component {
  state = {
    isOpen: false,
    value: [],
  }

  render() {
    return (
      <UI.Theme>
        <UI.View width="100vw" height="100vh" background="white" padding="50px">
          <UI.DatePicker />
        </UI.View>
      </UI.Theme>
    )
  }
}

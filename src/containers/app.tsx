import * as React from 'react'
import UI from 'components'

// Enable 2 lines below to test the lib
// import UI, { Brother } from '../../js/output'
// import { on, off, trigger } from '../../js/output'
// ===

export default class Main extends React.Component {
  state = {
    isOpen: false,
    value: [],
  }

  componentDidMount() {
    UI.onViewStateChanged(
      'hello',
      () => {
        console.log('hello changed')
      },
      99
    )
  }
  render() {
    return (
      <UI.View
        width="100vw"
        height="100vh"
        background="white"
        margin="0 auto"
        z-index="100"
        align-items="center"
      >
        <UI.Brother keyPair="23" defaultState={{ count: 0 }}>
          {(shareState: any, setShareState: any) => (
            <UI.View
              width="200px"
              height="200px"
              background="red"
              position="absolute"
              align-items="center"
              justify-content="center"
              color="white"
              font-size="50px"
              onClick={() => {
                setShareState({ count: shareState.count + 2 })
              }}
            >
              {shareState.count}
            </UI.View>
          )}
        </UI.Brother>
        <UI.Brother keyPair="23" defaultState={{ count: 0 }}>
          {(shareState: any, setShareState: any) => (
            <UI.View
              width="400px"
              height="500px"
              left="300px"
              background="blue"
              position="absolute"
              align-items="center"
              color="white"
              font-size="50px"
              justify-content="center"
              onClick={(e: any) => {
                setShareState({ count: shareState.count + 1 })
              }}
            >
              {shareState.count}
            </UI.View>
          )}
        </UI.Brother>
        <UI.Text
          position="absolute"
          bottom="10px"
          font-size="20px"
          color="green"
        >
          Click on red box will +2 but click on blue box will +1, their states
          are synced without using a STATE inside this Example Component
        </UI.Text>
      </UI.View>
    )
  }
}

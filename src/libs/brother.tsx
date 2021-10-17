import { useState } from 'react'

const allPairs: any = {}
/**
 * ### Remotely sync state update of multiple React Component
 * When you update a state of a wrapped component by Brother,
 * Brother will let other wrapped components which have the same `keyPair` know then update them
 * #### For usage example, please refer to Brother file in libs/brother
 */
export const Brother = (props: {
  keyPair: string
  defaultState?: {}
  children: Function
}) => {
  const [shareState, setShareState] = useState(props.defaultState)
  const keyPair = props.keyPair
  if (allPairs[keyPair] && allPairs[keyPair].length) {
    if (allPairs[keyPair].indexOf(setShareState) < 0) {
      allPairs[keyPair].push(setShareState)
    }
  } else {
    allPairs[keyPair] = [setShareState]
  }

  const syncSetState = (newState: any) => {
    for (let i = 0; i < allPairs[keyPair].length; i++) {
      allPairs[keyPair][i]((prevState: any) => {
        return { ...prevState, ...newState }
      })
    }
  }
  return props.children(shareState, syncSetState)
}

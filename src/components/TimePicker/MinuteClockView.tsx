import * as React from 'react'
import UIView from '../View'
import UIText from '../Text'
import UIList from '../List'
import { minutes, displayedMinutes } from './index'
interface Props {
  radius: number
  selectedItem: any
  onClick: (item: any) => void
}

export default class MinuteClockView extends React.Component<Props> {
  render() {
    return (
      <UIList
        items={minutes}
        children={(item: any, ind: number) => {
          const deg = 6 * ind - 90
          const tranX = Math.cos((Math.PI * deg) / 180) * this.props.radius
          const tranY = Math.sin((Math.PI * deg) / 180) * this.props.radius
          const isSame = this.props.selectedItem == item
          const isDisplay = displayedMinutes.indexOf(item) > -1
          return (
            <UIView
              position="absolute"
              width="10px"
              height="10px"
              align-items="center"
              justify-content="center"
              top="105px"
              left="105px"
              transform={`translate(${tranX}px, ${tranY}px)`}
              onClick={() => this.props.onClick(item)}
              transition="0.5s"
              cursor="pointer"
            >
              <UIText color={isSame ? 'white' : ''} transition="0.5s">
                {isDisplay ? item : ''}
              </UIText>
              {isSame && !isDisplay && (
                <UIView
                  width="4px"
                  height="4px"
                  border-radius="50%"
                  background="white"
                />
              )}
            </UIView>
          )
        }}
      />
    )
  }
}

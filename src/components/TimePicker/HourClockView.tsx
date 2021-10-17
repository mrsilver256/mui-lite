import * as React from 'react'
import UIView from '../View'
import UIText from '../Text'
import UIThemeValueProvider from '../ThemeValueProvider'
import UIList from '../List'

interface Props {
  items: any
  radius: number
  selectedItem: any
  onClick: (item: any) => void
  small?: boolean
}

export default class HourClockView extends React.Component<Props> {
  render() {
    return (
      <UIThemeValueProvider>
        {(colors: any) => (
          <UIList
            items={this.props.items}
            children={(item: any, ind: number) => {
              const deg = 30 * ind - 60
              const tranX = Math.cos((Math.PI * deg) / 180) * this.props.radius
              const tranY = Math.sin((Math.PI * deg) / 180) * this.props.radius
              const isSame = this.props.selectedItem == item
              return (
                <UIView
                  position="absolute"
                  width="30px"
                  height="30px"
                  align-items="center"
                  justify-content="center"
                  border-radius="50%"
                  top="95px"
                  left="95px"
                  transform={`translate(${tranX}px, ${tranY}px)`}
                  onClick={() => this.props.onClick(item)}
                  font-size={this.props.small ? '11px' : ''}
                  transition="0.5s"
                  cursor="pointer"
                >
                  <UIText
                    color={
                      isSame
                        ? 'white'
                        : this.props.small
                        ? colors.secondary_text
                        : ''
                    }
                    transition="0.5s"
                    dark-style={() =>
                      `opacity: ${isSame || !this.props.small ? 1 : 0.6};`
                    }
                  >
                    {item}
                  </UIText>
                </UIView>
              )
            }}
          />
        )}
      </UIThemeValueProvider>
    )
  }
}

import * as React from 'react'
import UIView from '../View'
import UIThemeValueProvider from '../ThemeValueProvider'
import { amHours, pmHours, minutes } from './index'

interface Props {
  type: string
  selectedItem: any
  small?: boolean
}

export default class ClockNeedle extends React.Component<Props> {
  render() {
    let needleDeg = 0
    if (this.props.type == 'hour') {
      let indexHour = amHours.indexOf(this.props.selectedItem)
      if (indexHour == -1) {
        indexHour = pmHours.indexOf(this.props.selectedItem)
      }
      needleDeg = 30 * indexHour - 60
    } else {
      const indexMinute = minutes.indexOf(this.props.selectedItem)
      needleDeg = 6 * indexMinute - 90
    }

    return (
      <UIThemeValueProvider>
        {(colors: any) => (
          <UIView
            position="absolute"
            top="109px"
            left="106px"
            transform={`rotate(${needleDeg}deg)`}
            transform-origin="4px 15px"
            transition="0.5s"
            margin-top="-14px"
          >
            <UIView flex-direction="row" align-items="center">
              <UIView
                height="8px"
                width="8px"
                background={colors.primary}
                border-radius="50%"
              />
              <UIView
                height="2px"
                width={this.props.small ? '41px' : '71px'}
                background={colors.primary}
                transition="0.5s"
              />
              <UIView
                width="30px"
                height="30px"
                border-radius="50%"
                background={colors.primary}
              />
            </UIView>
          </UIView>
        )}
      </UIThemeValueProvider>
    )
  }
}

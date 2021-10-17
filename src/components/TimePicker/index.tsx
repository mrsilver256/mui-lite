import * as React from 'react'
import UIView from '../View'
import UIModal from '../Modal'
import UIText from '../Text'
import UIThemeValueProvider from '../ThemeValueProvider'
import UIButton from '../Button'
import ClockNeedle from './ClockNeedle'
import HourClockView from './HourClockView'
import MinuteClockView from './MinuteClockView'
import UIIcon from '../Icon'
import UIInput from '../Input'

const generateMinutes = () => {
  const minutes = []
  for (let i = 0; i < 60; i++) {
    minutes.push(i)
  }
  return minutes
}
export const amHours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export const pmHours = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0]
export const minutes = generateMinutes()
const radius = 90
export const displayedMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
const getHour = (value: any) => {
  return value ? Number(value.split(':')[0]) : 0
}
const getMinute = (value: any) => {
  return value ? Number(value.split(':')[1]) : 0
}

export default class TimePicker extends React.Component<UI.TimePickerProps> {
  state = {
    isOpen: false,
    selectedHour: getHour(this.props.value),
    selectedMinute: getMinute(this.props.value),
    type: 'hour',
    enterType: 'clock',
  }
  setDefault = () => {
    this.setState({
      isOpen: false,
      selectedHour: getHour(this.props.value),
      selectedMinute: getMinute(this.props.value),
      type: 'hour',
      enterType: 'clock',
    })
  }
  render() {
    return (
      <UIThemeValueProvider>
        {(colors: any) => (
          <UIView>
            <UIText
              data-component="text-time"
              background="#f5f5f5"
              padding="8px"
              width="100px"
              text-align="center"
              border-radius="2px"
              cursor="pointer"
              dark-style={(theme: any) =>
                `color: ${
                  this.props.value ? colors.primary_text : colors.secondary_text
                } !important;`
              }
              color={this.props.value ? '' : colors.secondary_text}
              onClick={() =>
                this.setState({
                  isOpen: true,
                  selectedHour: getHour(this.props.value),
                  selectedMinute: getMinute(this.props.value),
                  type: 'hour',
                  enterType: 'clock',
                })
              }
            >
              {this.props.customTextTime
                ? this.props.customTextTime(this.props.value || '00:00')
                : this.props.value || '00:00'}
            </UIText>
            <UIModal
              portalAddress={this.props.portalAddress}
              open={this.state.isOpen}
              onClickOutside={() => this.setDefault()}
            >
              <UIView
                width="280px"
                background="white"
                border-radius="5px"
                dark-background-level={4}
              >
                {this.state.enterType == 'clock' && (
                  <UIView
                    flex-direction="row"
                    align-items="center"
                    justify-content="center"
                    font-size="62px"
                    padding="16px 0 20px"
                  >
                    <UIText
                      color={
                        (this.state.type == 'hour'
                          ? ''
                          : colors.secondary_text) + ' !important'
                      }
                      onClick={() => this.setState({ type: 'hour' })}
                    >
                      {('00' + this.state.selectedHour).slice(-2)}
                    </UIText>
                    <UIText color={colors.secondary_text + ' !important'}>
                      :
                    </UIText>
                    <UIText
                      color={
                        (this.state.type == 'minute'
                          ? ''
                          : colors.secondary_text) + ' !important'
                      }
                      onClick={() => this.setState({ type: 'minute' })}
                    >
                      {('00' + this.state.selectedMinute).slice(-2)}
                    </UIText>
                  </UIView>
                )}
                <UIView
                  align-items="center"
                  justify-content="center"
                  padding-bottom="15px"
                >
                  {this.state.enterType == 'clock' ? (
                    <UIView
                      position="relative"
                      height="220px"
                      width="220px"
                      align-items="center"
                      justify-content="center"
                      border-radius="50%"
                      dark-background-level={3}
                      background={colors.bright_color[4]}
                    >
                      {this.state.type == 'hour' ? (
                        <UIView>
                          <ClockNeedle
                            selectedItem={this.state.selectedHour}
                            type="hour"
                            small={
                              this.state.selectedHour > 12 ||
                              this.state.selectedHour == 0
                            }
                          />
                          <HourClockView
                            items={amHours}
                            selectedItem={this.state.selectedHour}
                            radius={radius}
                            onClick={(item: any) => {
                              this.setState({
                                selectedHour: item,
                              })
                              setTimeout(() => {
                                this.setState({ type: 'minute' })
                              }, 600)
                            }}
                          />
                          <HourClockView
                            items={pmHours}
                            selectedItem={this.state.selectedHour}
                            radius={60}
                            onClick={(item: any) => {
                              this.setState({
                                selectedHour: item,
                              })
                              setTimeout(() => {
                                this.setState({ type: 'minute' })
                              }, 600)
                            }}
                            small
                          />
                        </UIView>
                      ) : (
                        <UIView>
                          <ClockNeedle
                            selectedItem={this.state.selectedMinute}
                            type="minute"
                          />
                          <MinuteClockView
                            selectedItem={this.state.selectedMinute}
                            radius={radius}
                            onClick={(item: any) => {
                              this.setState({
                                selectedMinute: item,
                              })
                            }}
                          />
                        </UIView>
                      )}
                    </UIView>
                  ) : (
                    <UIView
                      flex-direction="row"
                      align-items="center"
                      justify-content="center"
                      padding-top="40px"
                    >
                      <UIInput
                        width="50px"
                        placeholder="00"
                        value={this.state.selectedHour.toString()}
                        onChange={(val: any) => {
                          const temp = val ? parseInt(val) : ''
                          if (val == '' || temp >= 0) {
                            if (temp < 24) this.setState({ selectedHour: temp })
                            else this.setState({ selectedHour: 23 })
                          }
                        }}
                        custom-style={() =>
                          `input{font-size: 24px; text-align: center;}`
                        }
                      />
                      <UIText padding="0 5px" font-size="20px">
                        :
                      </UIText>
                      <UIInput
                        width="50px"
                        placeholder="00"
                        value={this.state.selectedMinute.toString()}
                        onChange={(val: any) => {
                          const temp = val ? parseInt(val) : ''
                          if (val == '' || temp >= 0) {
                            if (temp < 60)
                              this.setState({ selectedMinute: temp })
                            else this.setState({ selectedMinute: 59 })
                          }
                        }}
                        custom-style={() =>
                          `input{font-size: 24px; text-align: center;}`
                        }
                      />
                    </UIView>
                  )}
                </UIView>
                <UIView
                  flex-direction="row"
                  align-items="center"
                  justify-content="space-between"
                  padding="10px 0 5px 20px"
                >
                  <UIIcon
                    name={
                      this.state.enterType == 'clock'
                        ? 'keyboard'
                        : 'watch_later'
                    }
                    color={colors.secondary_text + ' !important'}
                    onClick={() => {
                      if (this.state.enterType == 'clock')
                        this.setState({
                          enterType: 'keyboard',
                          selectedHour: '',
                          selectedMinute: '',
                        })
                      else
                        this.setState({
                          selectedHour: getHour(this.props.value),
                          selectedMinute: getMinute(this.props.value),
                          type: 'hour',
                          enterType: 'clock',
                        })
                    }}
                  />
                  <UIView flex-direction="row" align-items="center">
                    <UIButton
                      type="text"
                      onClick={() => this.setDefault()}
                      color={colors.secondary_text + ' !important'}
                    >
                      Cancel
                    </UIButton>
                    <UIButton
                      variant="primary"
                      type="text"
                      font-weight="500"
                      onClick={() => {
                        this.setState({
                          isOpen: false,
                          type: 'hour',
                          enterType: 'clock',
                        })
                        this.props.onChange &&
                          this.props.onChange(
                            ('00' + this.state.selectedHour).slice(-2) +
                              ':' +
                              ('00' + this.state.selectedMinute).slice(-2)
                          )
                      }}
                    >
                      OK
                    </UIButton>
                  </UIView>
                </UIView>
              </UIView>
            </UIModal>
          </UIView>
        )}
      </UIThemeValueProvider>
    )
  }
}

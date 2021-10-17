import * as React from 'react'
import UIView from '../View'
import UIModal from '../Modal'
import UIText from '../Text'
import UICalendar from '../Calendar'
import * as moment from 'moment'

export default class DatePicker extends React.Component<UI.DatePickerProps> {
  state = {
    isOpen: false,
    selectedDate: this.props.value || moment().format('YYYY-MM-DD'),
  }
  render() {
    return (
      <UIView
        default-style={(theme: any) => `
        & [data-component='text-date'] {
            background: #f5f5f5;
            padding: 10;
            width: 100px;
            border-radius: 2px;
            text-align: center;
            cursor: pointer;
        }
        ${
          theme.darkmode &&
          `& [data-component='text-date'] {
            background: ${theme.dark_background[2]};
          }
        `
        }
        `}
        {...this.props}
      >
        <UIText
          data-component={'text-date'}
          onClick={() => {
            this.setState({ isOpen: true })
          }}
        >
          {this.props.customTextDate
            ? this.props.customTextDate(
                this.props.value || moment().format('YYYY-MM-DD')
              )
            : moment(this.props.value || moment().format('YYYY-MM-DD')).format(
                'DD/MM/YYYY'
              )}
        </UIText>
        <UIModal
          open={this.state.isOpen}
          onClick={() => {
            this.setState({ isOpen: false })
          }}
          portalAddress={this.props.portalAddress}
        >
          <UIView
            border-radius="3px 3px 0px 0px"
            background="white"
            overflow="hidden"
            onClick={(e: any) => {
              e.stopPropagation()
            }}
          >
            <UICalendar
              value={this.props.value || this.state.selectedDate}
              onChange={(value: any) => {
                this.setState({ selectedDate: value })
              }}
              dark-background-level={4}
              customHeader={this.props.customHeader}
              customMonthLabel={this.props.customMonthLabel}
              customDayOfWeek={this.props.customDayOfWeek}
            />
            <UIView
              flex-direction="row"
              justify-content="flex-end"
              padding="15"
              dark-background-level={4}
            >
              <UIText
                variant="accent"
                width="70px"
                text-align="center"
                font-weight="500"
                cursor="pointer"
                onClick={() => {
                  this.props.onChange &&
                    this.props.onChange(this.state.selectedDate)
                  this.setState({ isOpen: false })
                }}
              >
                OK
              </UIText>
            </UIView>
          </UIView>
        </UIModal>
      </UIView>
    )
  }
}

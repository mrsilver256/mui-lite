import * as React from 'react'
import UIView from '../View'
import UIGrid from '../Grid'
import UIText from '../Text'
import ThemeValueProvider from 'components/ThemeValueProvider'
import UIIcon from 'components/Icon'
import { generateData, formatDate, isValid } from './libs'
interface Props {
  selectedMonth: string
  selectedDate: string
  selectedYear: string
  finalDate: string
  oldDate: string
  onDateChange?: any
  onMonthChange?: any
  onYearChange?: any
  isStatic?: boolean
  data: any
  customMonthLabel?: (month: string) => string
  customDayOfWeek?: string[]
}

export default class extends React.Component<Props> {
  /**
   * emptySlots explanation
   *
   *  Mon Tue Wed Thu Fri Sat Sun
   *   -   -   -   -   1   2   3
   * => Empty Slots = 4
   *  Mon Tue Wed Thu Fri Sat Sun
   *   -   -   -   1   2   3   4
   * => Empty Slots = 3
   *
   * We first build an array includes empty slots so that grid render will match the day of the calendar
   */
  generateDates = () => {
    let emptySlots =
      new Date(
        this.props.selectedYear + '-' + this.props.selectedMonth + '-01'
      ).getDay() - 1
    emptySlots = (emptySlots + 7) % 7
    const dates: any = []
    if (emptySlots > 0)
      for (let i = 0; i < emptySlots; i++) {
        dates.push(-1)
      }
    for (let i = 0; i < this.props.data.days.length; i++) {
      dates.push(this.props.data.days[i])
    }
    return dates
  }
  render() {
    const { selectedYear, selectedMonth, selectedDate } = this.props
    return (
      <ThemeValueProvider>
        {(theme: any) => (
          <UIView>
            <UIView
              flex-direction="row"
              justify-content="space-between"
              align-items="center"
              padding="13 10"
            >
              <UIIcon
                name="chevron_left"
                font-size="20"
                onClick={() => {
                  if ((parseInt(this.props.selectedMonth) - 1) % 12 == 0) {
                    const previousYear = formatDate(
                      (parseInt(this.props.selectedYear) - 1).toString()
                    )
                    this.props.onMonthChange && this.props.onMonthChange('12')
                    this.props.onYearChange &&
                      this.props.onYearChange(previousYear)
                  } else {
                    const previousMonth = formatDate(
                      (parseInt(this.props.selectedMonth) - 1).toString()
                    )
                    this.props.onMonthChange &&
                      this.props.onMonthChange(previousMonth)
                  }
                }}
              />
              <UIText>
                {this.props.customMonthLabel
                  ? `${this.props.customMonthLabel(this.props.selectedMonth)} ${
                      this.props.isStatic ? this.props.selectedYear : ''
                    }`
                  : `Tháng ${this.props.selectedMonth} ${
                      this.props.isStatic ? this.props.selectedYear : ''
                    }`}
              </UIText>
              <UIIcon
                name="chevron_right"
                font-size="20"
                onClick={() => {
                  if ((parseInt(this.props.selectedMonth) + 1) % 12 == 1) {
                    const nextYear = formatDate(
                      (parseInt(this.props.selectedYear) + 1).toString()
                    )
                    this.setState({
                      selectedMonth: 1,
                      selectedYear: nextYear
                    })
                    this.props.onMonthChange && this.props.onMonthChange('01')
                    this.props.onYearChange && this.props.onYearChange(nextYear)
                  } else {
                    const nextMonth = formatDate(
                      (parseInt(this.props.selectedMonth) + 1).toString()
                    )
                    this.props.onMonthChange &&
                      this.props.onMonthChange(nextMonth)
                  }
                }}
              />
            </UIView>
            <UIView
              width="100%"
              align-items="center"
              data-component="calendar-body"
            >
              <UIGrid
                data-component="date-header"
                column={7}
                padding="0 10"
                width="300px"
                items={
                  this.props.customDayOfWeek
                    ? this.props.customDayOfWeek
                    : ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
                }
              >
                {item => (
                  <UIText color={theme.divider} text-align="center">
                    {item}
                  </UIText>
                )}
              </UIGrid>
              <UIView min-height="250px" width="300px" justify-content="center">
                <UIGrid
                  data-component="date-content"
                  column={7}
                  padding="0 10"
                  width="300px"
                  items={this.generateDates()}
                >
                  {item => (
                    <UIText
                      cursor="pointer"
                      text-align="center"
                      padding="12"
                      data-selected={
                        this.props.selectedYear ===
                          this.props.finalDate.split('-')[0] &&
                        this.props.selectedMonth ===
                          this.props.finalDate.split('-')[1] &&
                        this.props.selectedDate === formatDate(item.toString())
                      }
                      data-old={
                        this.props.selectedYear ===
                          this.props.oldDate.split('-')[0] &&
                        this.props.selectedMonth ===
                          this.props.oldDate.split('-')[1] &&
                        item == this.props.oldDate.split('-')[2] &&
                        this.props.oldDate.split('-')[2] !==
                          this.props.selectedDate
                      }
                      custom-style={theme => `
                        &[data-selected='true'] {
                            background: ${theme.accent};
                            border-radius: 50%;
                            color: white;
                            box-shadow: ${theme.shadow_level_2};
                        }
                        &[data-old='true'] span {
                          color: ${theme.primary};
                          font-weight: 500;
                          margin-bottom: -5px;
                          border-bottom: 3px solid ${theme.primary};
                        }
                    `}
                      onClick={() => {
                        this.props.onDateChange &&
                          this.props.onDateChange(formatDate(item.toString()))
                      }}
                    >
                      {isValid(selectedYear, selectedMonth, item.toString())
                        ? item
                        : ''}
                    </UIText>
                  )}
                </UIGrid>
              </UIView>
            </UIView>
          </UIView>
        )}
      </ThemeValueProvider>
    )
  }
}

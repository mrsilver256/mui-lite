import * as React from 'react'
import UIView from '../View'
import UIText from '../Text'
import UISelect from '../Select/Select'
import ThemeValueProvider from 'components/ThemeValueProvider'
interface Props {
  selectedDate: string
  selectedYear: string
  selectedMonth: string
  data: any
  onYearChange?: any
  finalDate: string
  customHeader?: (date: string) => string
}

export default class extends React.Component<Props> {
  render() {
    return (
      <ThemeValueProvider>
        {(theme: any) => (
          <UIView
            data-component="header"
            padding="0 15"
            background={theme.primary}
          >
            <UISelect
              options={this.props.data.years.map((d: any) => {
                return { label: d.toString(), value: d.toString() }
              })}
              height="30px"
              padding="0px"
              value={this.props.selectedYear}
              onChange={value => {
                this.props.onYearChange && this.props.onYearChange(value)
              }}
              border="none"
              margin="18px 0 0px"
              selectedItemView={(item: any) => (
                <UIText color="white" font-size="15" cursor="pointer">
                  {item.label}
                </UIText>
              )}
              customViewItem={item => (
                <UIText padding="5" font-size="15" cursor="pointer">
                  {item.label}
                </UIText>
              )}
              custom-style={theme => `
                  & [data-component='select-popup'] {
                      height: 200px;
                      display: block;
                  }
                  & [data-component='selected-value'] {
                      color: white;
                      font-size: 16;
                      opacity: 0.7;
                  }
    
                  & [data-component='right-icon'] {
                      display: none;
                  }
              `}
            />
            <UIText
              font-size="30"
              color="white"
              padding="0 0 10px 0"
              cursor="pointer"
            >
              {this.props.customHeader
                ? this.props.customHeader(this.props.finalDate)
                : this.props.data.dayInWeek[
                    new Date(this.props.finalDate).getDay()
                  ] +
                  ', ' +
                  this.props.finalDate.split('-')[2] +
                  ', Th' +
                  this.props.finalDate.split('-')[1]}
            </UIText>
          </UIView>
        )}
      </ThemeValueProvider>
    )
  }
}

import * as React from 'react'
import UIGrid from 'components/Grid'
import { Enhancer } from 'components/View'
import UICheckBox from 'components/CheckBox'

export default class GridMultipleSelect extends React.Component<UI.GridMultipleSelectProps> {
  handleChange = (nextValue: boolean, item: any) => {
    if (!this.props.onChange) return
    if (nextValue) {
      this.props.onChange(
        this.props.value ? [...this.props.value, item] : [item]
      )
    } else {
      this.props.value &&
        this.props.onChange(
          this.props.value.filter((i) => i.value !== item.value)
        )
    }
  }
  render() {
    return (
      <Enhancer>
        <UIGrid items={this.props.options} {...this.props}>
          {(item: any) => {
            const selectedValues =
              (this.props.value &&
                this.props.value.filter((o) => o.value === item.value)) ||
              null
            return (
              <UICheckBox
                label={item.label}
                flex-direction="row"
                justify-content="center"
                data-component="ui-checkbox"
                value={!!(selectedValues && selectedValues.length)}
                onChange={(checked: boolean) => {
                  this.handleChange(checked, item)
                }}
              />
            )
          }}
        </UIGrid>
      </Enhancer>
    )
  }
}

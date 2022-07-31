import * as React from 'react'
import styled from 'styled-components'
import UIList from 'components/List'
import UIView, { Enhancer, BaseView } from 'components/View'
import UIIcon from 'components/Icon'
import ThemeValueProvider from 'components/ThemeValueProvider'
import UIText from 'components/Text'

export default class Select extends React.Component<UI.MultipleSelectWithSearchProps> {
  componentDidUpdate() {
    if (!this.props.isNotScroll && this.state.showPopup) {
      let selectedItem =
        this.props.options &&
        this.props.options.find(
          (o) => o[this.props.valueKey || 'value'] == this.props.value
        )
      if (selectedItem) {
        let el1 = document.querySelector('[data-component="select-popup"]')
        let el2 = Array.from(el1 ? el1.querySelectorAll('div') : []).find(
          (el: any) =>
            el.textContent == selectedItem[this.props.labelKey || 'label']
        )
        // console.log('jsdklf', el2)
        // el2 && el2.scrollIntoView()
      }
    }
  }
  state = {
    showPopup: false,
  }
  handleChange = (item: any) => {
    this.props.onChange &&
      this.props.onChange(item[this.props.valueKey || 'value'])
    this.setState({ showPopup: false })
  }
  handleClickOutside = (e: any) => {
    if (this.state.showPopup) {
      const isClickedInsidePopup = e.target.closest(
        '[data-component="select-popup"]'
      )
      if (!isClickedInsidePopup) {
        e.preventDefault()
        e.stopPropagation()
        setTimeout(() => {
          this.setState({ showPopup: false })
        }, 10)
      }
    }
  }
  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside, true)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside, true)
  }
  render() {
    const selectedItem =
      this.props.options &&
      this.props.options.filter(
        (o) => o[this.props.valueKey || 'value'] === this.props.value
      )[0]
    return (
      <Enhancer>
        <Wrapper
          {...this.props}
          data-plain={this.props.plain}
          default-style={(theme: any) => `
          & [data-component='list-item']:hover {
            color: ${theme.primary};
          }
          width: 100%;
          padding: 7px 2px;
          border: 1px solid ${theme.divider};
          box-sizing: border-box;
          border-radius: 3px;
          margin: 5px 0px;
          position: relative;
          &[data-plain='true'] {
            border: none;
            padding: 0;
            margin: 0;
          }
        `}
        >
          {this.props.label ? (
            <UIView
              default-style={(theme: any) => `
                position: absolute;
                margin-top: -14px;
                font-size: 10px;
                color: ${theme.primary};
                background: white;
                flex-direction: row;
          `}
              dark-style={(theme: any) => `
          background: ${theme.dark_background[4]}
        `}
            >
              {this.props.label}
              {this.props.required && <span style={{ color: 'red' }}>*</span>}
            </UIView>
          ) : null}
          <UIView
            default-style={(theme: any) => `
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          min-height: 28px;
          cursor: pointer;
          i {
            color: ${theme.secondary_text};
          }
          padding-left: 2px;
          `}
            onClick={() => {
              this.setState({ showPopup: !this.state.showPopup })
            }}
            data-component="selected-value"
          >
            {selectedItem ? (
              this.props.selectedItemView ? (
                this.props.selectedItemView(selectedItem)
              ) : (
                <UIView cursor="pointer">
                  <UIText>
                    {selectedItem[this.props.labelKey || 'label']}
                  </UIText>
                </UIView>
              )
            ) : (
              <UIView />
            )}

            <ThemeValueProvider>
              {(theme: any) => (
                <UIIcon
                  data-component="right-icon"
                  color={theme.secondary_text}
                  name="arrow_drop_down"
                />
              )}
            </ThemeValueProvider>
          </UIView>
          {this.state.showPopup ? (
            <UIView
              max-height-mobile="150px"
              default-style={(theme: any) => `
                background: white;
                position: absolute;
                z-index: 2;
                width: 100%;
                box-shadow: ${theme.shadow_level_3};
                padding: 5px;
                box-sizing: border-box;
                left: 0;
                overflow: auto;
                -webkit-overflow-scrolling: touch;
                margin-top: 30px;
                max-height: 200px;
                `}
              dark-style={(theme: any) => `
                  background: ${
                    theme.dark_background[
                      this.props['dark-background-level']
                        ? this.props['dark-background-level']
                        : 0
                    ]
                  };
                  box-shadow: ${theme.dark_shadow_level_2};
                  
                `}
              data-component="select-popup"
              custom-style={this.props.popupStyle}
            >
              <UIList items={this.props.options}>
                {(item) =>
                  React.cloneElement(
                    this.props.customViewItem ? (
                      this.props.customViewItem(item)
                    ) : (
                      <UIView cursor="pointer" padding="5">
                        <UIText>{item[this.props.labelKey || 'label']}</UIText>
                      </UIView>
                    ),
                    {
                      'data-component': 'list-item',
                      onClick: (e: any) => {
                        e.stopPropagation()
                        this.handleChange(item)
                      },
                    }
                  )
                }
              </UIList>
            </UIView>
          ) : null}
        </Wrapper>
      </Enhancer>
    )
  }
}

export class MultipleSelect extends Select {
  state = {
    showPopup: false,
  }

  render() {
    return (
      <Enhancer>
        <Wrapper
          {...this.props}
          default-style={(theme: any) => `
            & [data-component='list-item'] {
              padding: 0px;
            }
            `}
        >
          {this.props.label ? (
            <UIView
              default-style={(theme: any) => `
            position: absolute;
            margin-top: -5px;
            margin-left: 5px;
            font-size: 10px;
            color: ${theme.primary};
            background: white;
          `}
              dark-style={(theme: any) => `
          background: ${theme.dark_background[4]}
        `}
            >
              {this.props.label}
            </UIView>
          ) : null}
          <UIView
            default-style={(theme: any) => `
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          min-height: 28px;
          cursor: pointer;
          flex-direction: row;
          i {
            color: ${theme.secondary_text};
          }
          padding-left: 2px;
          border: 1px solid ${theme.divider};
          border-radius: 4px;
          `}
            onClick={() => {
              this.setState({ showPopup: !this.state.showPopup })
            }}
          >
            <UIView
              default-style={(theme: any) => `
              flex-direction: row;
              min-height: 46px;
              padding-top: 5px;
            `}
            >
              {this.props.options &&
                this.props.options
                  .filter((item: any) =>
                    Array.isArray(this.props.value)
                      ? this.props.value.indexOf(item.value) >= 0
                      : item.value === this.props.value
                  )
                  .map((item, ind) => (
                    <UIView
                      default-style={(theme: any) => `
                  padding: 3px 5px;
                  background: ${theme.grey};
                  border-radius: 2px;
                  margin: 5px 2px;
                  line-height: 28px;
                  `}
                      key={ind}
                    >
                      {item.label}
                    </UIView>
                  ))}
            </UIView>
            <i className="material-icons">arrow_drop_down</i>
          </UIView>
          {this.state.showPopup ? (
            <UIView
              default-style={(theme: any) => `
            background: white;
            position: absolute;
            z-index: 2;
            box-shadow: ${theme.shadow_level_3};
            padding: 5px;
            box-sizing: border-box;
            left: 0;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            margin: 40 10;
            width: calc(100% - 20px);
            `}
              data-component="select-popup"
            >
              <UIList items={this.props.options}>
                {(item) => (
                  <UIView
                    default-style={(theme: any) => `
                    &[data-selected='true'] {
                      border-left: 3px solid ${theme.accent};
                      color: ${theme.primary_text} !important;
                    }
                    padding: 5px;
                    &[data-selected='false'] {
                      border-left: 0px solid ${theme.accent};
                      color: ${theme.primary_text} !important;
                    }
                    transition: 0.3s;
                    `}
                    data-selected={
                      (Array.isArray(this.props.value)
                        ? this.props.value
                        : [this.props.value]
                      ).indexOf(item.value) >= 0
                    }
                    onClick={(e: any) => {
                      const temp: any[] = Array.isArray(this.props.value)
                        ? this.props.value.slice(0)
                        : [this.props.value]
                      if (temp.indexOf(item.value) < 0) {
                        temp.push(item.value)
                      } else {
                        temp.splice(temp.indexOf(item.value), 1)
                      }
                      this.props.onChange && this.props.onChange(temp)
                    }}
                  >
                    {this.props.customViewItem &&
                      this.props.customViewItem(item)}
                  </UIView>
                )}
              </UIList>
            </UIView>
          ) : null}
        </Wrapper>
      </Enhancer>
    )
  }
}

const Wrapper = styled(BaseView)``

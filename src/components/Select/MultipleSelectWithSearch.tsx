import * as React from 'react'
import styled from 'styled-components'
import UIList from 'components/List'
import Select from 'components/Select/Select'
import UIView, { Enhancer, BaseView } from 'components/View'
import UIIcon from 'components/Icon'
import UIText from 'components/Text'
import UIInput from 'components/Input'

const filterByLabel = (filterKey: string, items: any[]) => {
  return items.filter((item: any) => {
    return (
      (item.label || '').toLowerCase().indexOf(filterKey.toLowerCase()) > -1
    )
  })
}

export default class MultipleSelectWithSearch extends Select {
  state = {
    showPopup: false,
    searchKey: '',
  }

  render() {
    return (
      <Enhancer>
        <Wrapper
          {...this.props}
          default-style={(theme: any) => `
              position: relative;
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
              console.log('open/close')
            }}
          >
            <UIView
              default-style={(theme: any) => `
                flex-direction: row;
                min-height: 46px;
                padding-top: 5px;
                flex-wrap: wrap;
              `}
              data-component="selected-items"
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
                      dark-style={(theme: any) => `
                      background: ${theme.dark_background[3]}
                    `}
                      key={ind}
                    >
                      <UIText>{item.label}</UIText>
                    </UIView>
                  ))}
            </UIView>
            <UIIcon name="arrow_drop_down"></UIIcon>
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
                margin: 40 0;
                width: 100%;
              `}
              data-component="select-popup"
              dark-style={(theme: any) => `
                background: ${
                  theme.dark_background[
                    this.props['dark-background-level']
                      ? this.props['dark-background-level']
                      : 0
                  ]
                } !important;
              `}
            >
              <UIView
                default-style={(theme: any) => `
                  width: 100%;
                  align-items: center;
                  flex-direction: row;
                  justify-content: flex-end;
                  height: 40px;
                  margin: 5px 0px;
                  padding: 0px 5px;
                `}
              >
                <UIInput
                  width="100%"
                  value={this.state.searchKey}
                  onChange={(value: string) => {
                    this.setState({ searchKey: value })
                  }}
                  default-style={(theme: any) => `
                    width: 100%;
                    margin: 5px 0px;
                  `}
                />
                <UIIcon
                  name="done_all"
                  default-style={(theme: any) => `
                    color: ${theme.accent};
                    position: absolute;
                    padding: 10px 5px 10px 10px;
                  `}
                  onClick={(e: any) => {
                    e.stopPropagation()
                    let result: any = []
                    const temp: any[] = Array.isArray(this.props.value)
                      ? this.props.value.slice(0)
                      : [this.props.value]
                    const options: any[] = this.props.options
                      ? this.props.options.slice(0)
                      : []
                    if (temp.length < options.length) {
                      result = options.map((item: any) => item.value)
                    } else {
                      result = []
                    }
                    this.props.onChange && this.props.onChange(result)
                  }}
                />
              </UIView>
              <UIList
                items={
                  this.props.handleSearch
                    ? this.props.handleSearch(
                        this.props.options || [],
                        this.state.searchKey
                      )
                    : filterByLabel(
                        this.state.searchKey,
                        this.props.options || []
                      )
                }
                max-height-mobile="150px"
                default-style={(theme: any) => `
                  box-sizing: border-box;
                  overflow: auto;
                  -webkit-overflow-scrolling: touch;
                  width: 100%;
                  max-height: 200px;
                `}
              >
                {(item) => (
                  <UIView
                    default-style={(theme: any) => `
                      flex-direction: row;
                      justify-content: space-between;
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
                    {this.props.customViewItem ? (
                      this.props.customViewItem(item)
                    ) : (
                      <UIText>{item.label}</UIText>
                    )}
                    {(Array.isArray(this.props.value)
                      ? this.props.value
                      : [this.props.value]
                    ).indexOf(item.value) >= 0 ? (
                      <UIIcon
                        name="done"
                        default-style={(theme: any) => `
                          color: ${theme.secondary_text}
                          font-size: 18px;
                          padding: 0px 10px;
                        `}
                      />
                    ) : (
                      <UIView
                        default-style={(theme: any) => `
                          width: 24px;
                          height: 24px;
                        `}
                      ></UIView>
                    )}
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

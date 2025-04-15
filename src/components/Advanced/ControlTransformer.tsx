import * as React from 'react'
import { trigger } from '../../libs/events'
import { forceUpdateViewByKey } from '../Theme'
interface ControlProps {
  children: any
  bind?: string
  defaultValue?: any
  bindValueKey?: string // instead of value as usual, sometimes, controls have another key value like "isOpen"
  handleData?: Function
  sync?: boolean
}

export default class ControlTransformer extends React.Component<ControlProps> {
  constructor(props: ControlProps) {
    super(props)
    if (this.props.bind) {
      if (window.prefs.hasOwnProperty([this.props.bind])) {
        if (!this.props.sync) {
          // throw new Error('key duplicated::' + this.props.bind)
          console.error('key duplicated::' + this.props.bind)
        }
        window.prefs[this.props.bind].instances.push(this)
      } else {
        const instance = this

        window.prefs[this.props.bind] = new Proxy(
          {
            value: '',
            instances: [instance]
          },
          {
            set: (obj, prop, value) => {
              if (this.props.bind) {
                trigger('ui-changed||' + this.props.bind, value)
              }
              return Reflect.set(obj, prop, value)
            }
          }
        )
      }
    }
  }
  componentDidMount() {
    if (this.props.defaultValue && this.props.bind) {
      if (!window.prefs[this.props.bind].value) {
        window.prefs[this.props.bind].value = this.props.defaultValue
        forceUpdateViewByKey(this.props.bind)
      }
    }
  }

  componentWillUnmount() {
    if (this.props.bind) {
      const index = window.prefs[this.props.bind].instances.indexOf(this)
      window.prefs[this.props.bind].instances.splice(index, 1)
    }
  }
  render() {
    const bind = this.props.bind
    if (!bind) {
      return this.props.children
    }

    const bindValueKey = this.props.bindValueKey || 'value'
    const receivedValue = window.prefs[bind].value
    return React.cloneElement(this.props.children, {
      [bindValueKey]: receivedValue
        ? this.props.handleData
          ? this.props.handleData(receivedValue)
          : receivedValue
        : '',
      onChange: (value: any) => {
        if (this.props.bind && window.prefs[this.props.bind]) {
          window.prefs[this.props.bind].value = value
          window.prefs[this.props.bind].instances.forEach((ins: any) => {
            ins.forceUpdate()
          })
        }

        if (this.props.children.props.onChange) {
          console.warn(
            'It is not recommended to have onChange with bind feature'
          )
          this.props.children.props.onChange(value)
        }
      }
    })
  }
}

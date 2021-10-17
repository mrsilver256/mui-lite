import Button from './Button'
import Theme, {
  getViewState,
  setViewState,
  onViewStateChanged,
  removeViewStateChangeListener,
  forceUpdateViewByKey,
} from './Theme'
import ThemeValueProvider from './ThemeValueProvider'
import Input from './Input'
import View from './View'
import Icon from './Icon'
import Switch from './Switch'
import Text from './Text'
import Grid from './Grid'
import List from './List'
import CheckBox from './CheckBox'
import Select from './Select/Select'
import GridMultipleSelect from './Select/GridMultipleSelect'
import MultipleSelect from './Select/MultipleSelect'
import MultipleSelectWithSearch from './Select/MultipleSelectWithSearch'
import Modal from './Modal'
import Toggle from './Toggle'
import Calendar from './Calendar'
import DatePicker from './Calendar/DatePicker'
import Popup from './Popup'
import Tag from './Tag'
import { transformControl } from './Advanced/transform'
import TimePicker from './TimePicker'
import { Brother } from '../libs/brother'
import { on, off, trigger } from '../libs/events'

const list: any = {
  Button,
  Theme,
  ThemeValueProvider,
  Grid,
  List,
  View,
  Icon,
  Text,
  Switch,
  Input,
  Select,
  MultipleSelect,
  MultipleSelectWithSearch,
  CheckBox,
  GridMultipleSelect,
  Modal,
  Toggle,
  Calendar,
  DatePicker,
  Popup,
  Tag,
  TimePicker,
}
const UI: any = {}
const keys = Object.keys(list)
for (let i = 0; i < keys.length; i++) {
  const keyString = keys[i].toString()
  UI[keyString] = transformControl(list[keyString])
}
UI.getViewState = getViewState
UI.setViewState = setViewState
UI.onViewStateChanged = onViewStateChanged
UI.removeViewStateChangeListener = removeViewStateChangeListener
UI.forceUpdateViewByKey = forceUpdateViewByKey
UI.Brother = Brother
UI.on = on
UI.off = off
UI.trigger = trigger
// export = UI
export default UI

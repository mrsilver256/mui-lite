import * as React from 'react'
import UIView from 'components/View'
import ThemeValueProvider from 'components/ThemeValueProvider'
import UIInput from 'components/Input'
import UIModal from 'components/Modal'
import UIButton from 'components/Button'
export default class AddDialog extends React.Component {
  render() {
    return (
      <ThemeValueProvider>
        {(theme: any) => (
          <UIView
            width="300"
            height="500"
            background="white"
            box-shadow={theme.shadow_level_3}
            shouldAnimate
            custom-style={() => `
              z-index: 2;
            `}
          >
            <UIInput label="hello world" width-mobile="100"></UIInput>
            <UIButton shouldAnimate>OK</UIButton>
          </UIView>
        )}
      </ThemeValueProvider>
    )
  }
}

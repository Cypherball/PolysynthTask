import React from 'react'
import { Button, Radio } from '@mui/material'

function CustomRadioButton(props) {
  const renderRadioButton = (isChecked = false) => (
    <Button
      sx={{
        borderRadius: 100,
      }}
      disabled={props.disabled}
      variant={isChecked ? 'contained' : 'outlined'}>
      {props.label}
    </Button>
  )

  return (
    <Radio
      {...props}
      checkedIcon={renderRadioButton(true)}
      icon={renderRadioButton(false)}
      sx={{
        m: 0,
        pr: 1,
      }}
    />
  )
}

export default CustomRadioButton

import React, { memo } from 'react'
import { InputAdornment, TextField } from '@mui/material'

function AmountInput(props) {
  return (
    <TextField
      variant="standard"
      label="Amount"
      autoComplete="off"
      fullWidth
      InputProps={
        !!props.amountType && {
          endAdornment: (
            <InputAdornment position="start">{props.amountType}</InputAdornment>
          ),
        }
      }
      {...props}
      onChange={e => {
        if (/^\d{0,}\.?(\d{1,8})?$/.test(e.target.value)) {
          // check if input is in decimal format; max precision is 8
          props.onChange(e)
        }
      }}
    />
  )
}

AmountInput.defaultProps = {
  amountType: '',
}

export default memo(AmountInput)

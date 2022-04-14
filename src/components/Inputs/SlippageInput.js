import React, { memo } from 'react'
import {
  InputAdornment,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import CustomRadioButton from '../radio/CustomRadioButton.js'

function SlippageInput(props) {
  const hasError = parseFloat(props.value) > 5.0

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Typography color={'text.secondary'} variant="body1">
          Slipppage Tolerance
        </Typography>
        <Typography variant="body1">{`${props.value}%`}</Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <RadioGroup
          value={props.value}
          onChange={(_, val) => props.onChange(val)}
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <CustomRadioButton
              disabled={props.disabled}
              value={0.1}
              label="0.1%"
            />
            <CustomRadioButton
              disabled={props.disabled}
              value={0.5}
              label="0.5%"
            />
            <CustomRadioButton disabled={props.disabled} value={1} label="1%" />
          </div>
        </RadioGroup>
        <TextField
          id="input-custom-slippage"
          placeholder="Others"
          variant="outlined"
          color="primary"
          focused
          value={props.value}
          disabled={props.disabled}
          onChange={e => {
            // whitespace not allowed
            if (!e.target.value.trim()) props.onChange(e.target.value.trim())
            else if (/^\d+\.?(\d{1,3})?$/.test(e.target.value)) {
              // check if input is in decimal format; max precision is 3
              props.onChange(e.target.value)
            }
          }}
          size="small"
          fullWidth
          sx={{
            borderRadius: 100,
            borderWidth: 1,
            pl: 1,
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">{'%'}</InputAdornment>,
          }}
          // error feedbacks
          error={hasError}
          helperText={hasError ? 'Slippage must be 5.0% or less' : null}
        />
      </div>
    </div>
  )
}

SlippageInput.defaultProps = {
  disabled: false,
  value: '',
}

export default memo(SlippageInput)

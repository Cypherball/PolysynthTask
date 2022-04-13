import React from 'react'
import {
  InputAdornment,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import CustomRadioButton from '../radio/CustomRadioButton'

function SlippageInput(props) {
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
        <Typography
          color={'text.secondary'}
          variant="body1">{`${props.value}%`}</Typography>
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
            <CustomRadioButton value={0.1} label="0.1%" />
            <CustomRadioButton value={0.5} label="0.5%" />
            <CustomRadioButton value={1} label="1%" />
          </div>
        </RadioGroup>
        <TextField
          id="input-custom-slippage"
          placeholder="Others"
          variant="outlined"
          color="primary"
          focused
          value={props.value}
          onChange={e => {
            // whitespace not allowed
            if (!e.target.value.trim()) props.onChange(e.target.value.trim())
            else if (/^\d+\.?(\d{1,3})?$/.test(e.target.value)) {
              // check if input is in decimal format; max precision is 3
              props.onChange(e.target.value)
            }
          }}
          //focused
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
        />
      </div>
    </div>
  )
}

export default SlippageInput

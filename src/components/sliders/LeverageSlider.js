import React, { memo } from 'react'
import { Slider, Typography } from '@mui/material'

const minVal = 1
const maxVal = 10
const step = 1

function LeverageSlider(props) {
  return (
    <div style={{ margin: '16px 0px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Typography color={'text.secondary'} variant="body1">
          Leverage
        </Typography>
        <Typography variant="body1">{`${props.value}x`}</Typography>
      </div>
      <Slider
        aria-label="Leverage"
        //getAriaValueText={props.value}
        valueLabelDisplay="auto"
        step={step}
        min={minVal}
        max={maxVal}
        {...props}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Typography
          color={'text.secondary'}
          variant="caption">{`${minVal}x`}</Typography>
        <Typography
          color={'text.secondary'}
          variant="caption">{`${maxVal}x`}</Typography>
      </div>
    </div>
  )
}

export default memo(LeverageSlider)

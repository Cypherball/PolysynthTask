import React, { useState, useEffect } from 'react'
import { Container, CssBaseline, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import AmountInput from '../components/Inputs/AmountInput'
import LeverageSlider from '../components/sliders/LeverageSlider'
import SlippageInput from '../components/Inputs/SlippageInput'

import { sleep } from '../utils'

const INPUT_ID_USDP = 'input-amount-USDP'
const INPUT_ID_ETH = 'input-amount-eth'

function Home() {
  const [loading, setLoading] = useState(false)

  const [amountUSDP, setAmountUSDP] = useState('')
  const [amountETH, setAmountETH] = useState('')
  // id to figure out the last interacted amount input text field by user
  const [lastAmountInputId, setAmountInputId] = useState('')

  const [leverage, setLeverage] = useState(1)
  const [slippage, setSlippage] = useState(0.1)

  useEffect(() => {
    // check if user's last input was for USDP or ETH
    if (lastAmountInputId === INPUT_ID_USDP) {
      // calculate equivalent ETH for given leveraged USDP
      setAmountETH(
        Number(
          ((parseFloat(amountUSDP) * 1000) / parseInt(leverage)).toFixed(8), // to fixed for max precision of 8
        ), // cast to number to remove trailing zeros
      )
    } else if (lastAmountInputId === INPUT_ID_ETH) {
      // calculate equivalent USDP for given leveraged ETH
      setAmountUSDP(
        Number(
          ((parseFloat(amountETH) * parseInt(leverage)) / 1000).toFixed(8),
        ),
      )
    }
  }, [amountUSDP, amountETH, lastAmountInputId, leverage])

  const placeOrder = async () => {
    setLoading(true)
    await sleep(2000)
    setLoading(false)
  }

  return (
    <>
      <CssBaseline />
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          background:
            'linear-gradient(135deg, rgba(51,0,61,1) 0%, rgba(13,11,61,1) 50%, rgba(0,38,55,1) 100%)',
        }}>
        <Container
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Typography variant="h2" component={'h1'} align="center">
            Polysynth
          </Typography>
          <Container
            maxWidth="sm"
            style={{
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'center',
              // alignItems: 'center',
            }}>
            <div style={{ marginTop: 24 }}>
              <AmountInput
                id={INPUT_ID_USDP}
                label="Amount"
                value={amountUSDP}
                onChange={e => {
                  setAmountInputId(e.target.id)

                  setAmountUSDP(e.target.value)
                }}
                amountType={'USDP'}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <AmountInput
                id={INPUT_ID_ETH}
                label="Amount"
                value={amountETH}
                onChange={e => {
                  setAmountInputId(e.target.id)
                  if (!e.target.value.trim()) setAmountETH('')
                  else setAmountETH(e.target.value)
                }}
                amountType={'ETH'}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <LeverageSlider
                value={leverage}
                onChange={(_, val) => {
                  setLeverage(val)
                }}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <SlippageInput
                value={slippage}
                onChange={val => setSlippage(val)}
              />
            </div>
            <div style={{ marginTop: 24 }}>
              <LoadingButton
                disabled={
                  !amountETH ||
                  !amountUSDP ||
                  !leverage ||
                  !slippage ||
                  parseFloat(slippage) > 5
                }
                loading={loading}
                loadingPosition="start"
                fullWidth
                variant="contained"
                size="large"
                onClick={placeOrder}>
                Place Market Order
              </LoadingButton>
            </div>
          </Container>
        </Container>
      </Container>
    </>
  )
}

export default Home

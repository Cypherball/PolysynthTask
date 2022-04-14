import React, { useState, useEffect, useCallback } from 'react'
import {
  Alert,
  Container,
  CssBaseline,
  Snackbar,
  Typography,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import AmountInput from '../components/Inputs/AmountInput.js'
import SlippageInput from '../components/Inputs/SlippageInput.js'
import LeverageSlider from '../components/Sliders/LeverageSlider.js'
import OrderHistoryTable from '../components/Tables/OrderHistoryTable.js'
import { generateUniqueInt, sleep } from '../utils/index.js'

const INPUT_ID_USDP = 'input-amount-USDP'
const INPUT_ID_ETH = 'input-amount-eth'

const ORDER_HISTORY_LOCAL_STORAGE_ID = 'OrderHistory'

const DEFAULT_TOAST_CONFIG = {
  visible: false,
  severity: 'info',
  message: 'Default Message',
}

function Home() {
  const [loading, setLoading] = useState(false)
  const [toastConfig, setToastConfig] = useState(DEFAULT_TOAST_CONFIG)

  const [amountUSDP, setAmountUSDP] = useState('')
  const [amountETH, setAmountETH] = useState('')
  // id to figure out the last interacted amount input text field by user
  const [lastAmountInputId, setAmountInputId] = useState('')

  const [leverage, setLeverage] = useState(1)
  const [slippage, setSlippage] = useState(0.1)

  const [orderHistory, setOrderHistory] = useState([])

  useEffect(() => {
    // Run this effect once during first render
    hydrateOrderHistory()
  }, [])

  useEffect(() => {
    // Run this effect whenever a value from dependency array changes
    recalculateAmounts()
  }, [amountUSDP, amountETH, lastAmountInputId, leverage])

  const hydrateOrderHistory = () => {
    // reload order history from local storage if present
    try {
      let orders = localStorage.getItem(ORDER_HISTORY_LOCAL_STORAGE_ID)
      if (!orders) return
      orders = JSON.parse(orders)
      if (Array.isArray(orders)) setOrderHistory(orders)
    } catch (err) {
      // remove corrupted data if exists
      localStorage.removeItem(ORDER_HISTORY_LOCAL_STORAGE_ID)
      console.error(err, 'Hydrate Order History')
    }
  }

  const recalculateAmounts = () => {
    // check if user's last input was for USDP or ETH
    if (lastAmountInputId === INPUT_ID_USDP) {
      // calculate equivalent ETH for given leveraged USDP
      setAmountETH(calculateEth())
    } else if (lastAmountInputId === INPUT_ID_ETH) {
      // calculate equivalent USDP for given leveraged ETH
      setAmountUSDP(calculateUsdp())
    }
  }

  const calculateEth = useCallback(() => {
    if (!amountUSDP) return ''
    const eth = (parseFloat(amountUSDP) * 1000) / parseInt(leverage)
    // to fixed for max precision of 8
    return Number(eth.toFixed(8)) // cast to number to remove trailing zeros
  }, [amountUSDP, leverage])

  const calculateUsdp = useCallback(() => {
    if (!amountETH) return ''
    const usdp = (parseFloat(amountETH) * parseInt(leverage)) / 1000
    // to fixed for max precision of 8
    return Number(usdp.toFixed(8)) // cast to number to remove trailing zeros
  }, [amountETH, leverage])

  const placeOrder = async () => {
    setLoading(true)
    try {
      // create an order object
      const newOrder = [
        {
          id: generateUniqueInt(),
          usdp: amountUSDP,
          eth: amountETH,
          leverage,
          slippage,
          placedAt: new Date().getTime(),
        },
      ]
      // mock loading state for 2s as if performing an API call
      await sleep(2000)
      // set order history
      setOrderHistory(_orders => {
        const orders = [...newOrder, ..._orders]
        // serialize and persist order history
        localStorage.setItem(
          ORDER_HISTORY_LOCAL_STORAGE_ID,
          JSON.stringify(orders),
        )
        return orders
      })
      //clear inputs
      setAmountETH('')
      setAmountUSDP('')
      // show success
      setToastConfig({
        visible: true,
        severity: 'success',
        message: `Successfully placed an order!`,
      })
    } catch (err) {
      console.error(err, 'placeOrder')
      // show success
      setToastConfig({
        visible: true,
        severity: 'error',
        message: `Oops, there was an error placing your order`,
      })
    } finally {
      setLoading(false)
    }
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
          sx={{
            py: 10,
          }}
          style={{
            minHeight: '100vh',
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
                value={leverage}
                onChange={(_, val) => {
                  setLeverage(val)
                }}
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <SlippageInput
                disabled={loading}
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
                fullWidth
                variant="contained"
                size="large"
                onClick={placeOrder}>
                Place Market Order
              </LoadingButton>
            </div>

            <div style={{ marginTop: 24 }}>
              <Typography variant="h4">Order History</Typography>
              <OrderHistoryTable
                data={orderHistory}
                onClearClicked={() => {
                  // clear order history and remove from local storage
                  setOrderHistory([])
                  localStorage.removeItem(ORDER_HISTORY_LOCAL_STORAGE_ID)
                }}
              />
            </div>
          </Container>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={toastConfig.visible}
            onClose={() => {
              setToastConfig(config => ({ ...config, visible: false }))
            }}
            autoHideDuration={3000}>
            <Alert severity={toastConfig.severity} sx={{ width: '100%' }}>
              {toastConfig.message}
            </Alert>
          </Snackbar>
        </Container>
      </Container>
    </>
  )
}

export default Home

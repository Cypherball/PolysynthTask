import React, { memo } from 'react'
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const dateFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
}

const columns = [
  { id: 'usdp', label: 'USDP', minWidth: 150, align: 'center' },
  { id: 'eth', label: 'ETH', minWidth: 150, align: 'center' },
  {
    id: 'leverage',
    label: 'Leverage',
    minWidth: 100,
    align: 'center',
    format: value => `${value.toLocaleString('en-US')}x`,
  },
  {
    id: 'slippage',
    label: 'Slippage',
    minWidth: 100,
    align: 'center',
    format: value => `${value.toLocaleString('en-US')}%`,
  },
  {
    id: 'placedAt',
    label: 'Order Time',
    minWidth: 250,
    align: 'center',
    format: value =>
      `${new Date(value).toLocaleDateString('en-US', dateFormatOptions)}`,
  },
]

function OrderHistoryTable(props) {
  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ height: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map(column => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button
        sx={{ float: 'right', mt: 1, color: 'white' }}
        onClick={props.onClearClicked}>
        Clear History
      </Button>
    </div>
  )
}

OrderHistoryTable.defaultProps = {
  data: [],
  onClearClicked: null,
}

export default memo(OrderHistoryTable)

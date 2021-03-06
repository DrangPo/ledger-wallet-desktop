// @flow

import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import get from 'lodash/get'

import Box from 'components/base/Box'
import Text from 'components/base/Text'

import { formatBTC } from 'helpers/format'

import type { Transaction as TransactionType } from 'types/common'

const DATE_COL_SIZE = 250
const AMOUNT_COL_SIZE = 150

const Cap = styled(Text).attrs({
  fontSize: 0,
  color: 'mouse',
})`
  text-transform: uppercase;
  letter-spacing: 1px;
`

const Body = styled(Box)``

const HeaderCol = ({ size, children, ...props }: { size?: number, children: any }) => (
  <Cell size={size} {...props}>
    <Cap>{children}</Cap>
  </Cell>
)

HeaderCol.defaultProps = {
  size: undefined,
}

const TransactionRaw = styled(Box).attrs({
  horizontal: true,
  align: 'center',
  py: 2,
})`
  &:nth-child(odd) {
    background: ${p => p.theme.colors.cream};
  }
`

const Cell = styled(Box).attrs({
  px: 2,
  horizontal: true,
  align: 'center',
})`
  width: ${p => (p.size ? `${p.size}px` : '')};
`

const Transaction = ({ tx }: { tx: TransactionType }) => {
  const time = moment(tx.time * 1e3)
  return (
    <TransactionRaw>
      <Cell size={DATE_COL_SIZE} justify="space-between">
        <Box>
          <Text>{time.format('DD/MM/YYYY')}</Text>
          <Cap>{time.format('HH:mm')}</Cap>
        </Box>
        <Cap>{tx.balance > 0 ? 'From' : 'To'}</Cap>
      </Cell>
      <Cell
        grow
        shrink
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          display: 'block',
        }}
      >
        {tx.balance > 0 ? get(tx, 'inputs.0.prev_out.addr') : get(tx, 'out.0.addr')}
      </Cell>
      <Cell size={AMOUNT_COL_SIZE} justify="flex-end">
        <Text color={tx.balance > 0 ? 'green' : void 0}>{formatBTC(tx.balance)}</Text>
      </Cell>
    </TransactionRaw>
  )
}

export default ({ transactions }: { transactions: Array<TransactionType> }) => (
  <Box flow={2}>
    <Box horizontal>
      <HeaderCol size={DATE_COL_SIZE}>{'Date'}</HeaderCol>
      <HeaderCol grow>{'Address'}</HeaderCol>
      <HeaderCol size={AMOUNT_COL_SIZE} justify="flex-end">
        {'Amount'}
      </HeaderCol>
    </Box>
    <Body>{transactions.map(t => <Transaction key={t.hash} tx={t} />)}</Body>
  </Box>
)

import { ONE_BIPS } from 'app/constants'
import { Percent } from '@cronaswap/core-sdk'
import React from 'react'
import { warningSeverity } from 'app/functions/prices'

const SEVERITY = {
  0: 'text-green-special',
  1: 'text-gray-800 dark:text-gray-50',
  2: 'text-yellow',
  3: 'text-red',
  4: 'text-red',
}

export default function FormattedPriceImpact({ priceImpact }: { priceImpact?: Percent }) {
  return (
    <div className={`text-sm font-extrabold transition-all ${SEVERITY[warningSeverity(priceImpact)]}`}>
      {priceImpact ? `${priceImpact.multiply(-1).toFixed(2)} %` : '-'}
    </div>
  )
}

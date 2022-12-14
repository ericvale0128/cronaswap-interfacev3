import React from 'react'
import Image from 'next/image'
import { formatBalance, formatNumber, formatNumberScale } from '../../functions/format'
import { useTokenStatsModalToggle } from '../../states/application/hooks'
import TokenStatsModal from '../../modals/TokenStatsModal'
import { ChainId } from '@cronaswap/core-sdk'
import { useCronaUsdcPrice } from 'app/features/invest/hooks'

const supportedTokens = {
  CRONA: {
    name: 'CronaSwap Token',
    symbol: 'CRONA',
    icon: '/mstile-70x70.png',
    address: {
      [ChainId.CRONOS]: '0xadbd1231fb360047525BEdF962581F3eee7b49fe',
      [ChainId.CRONOS_TESTNET]: '0x7Ac4564724c99e129F79dC000CA594B4631acA81',
    },
  },
}

interface TokenStatsProps {
  token: string
}

const TokenStatusInner = ({ token, price }) => {
  const toggleModal = useTokenStatsModalToggle()
  return (
    <div
      className="flex items-center px-2 py-2 text-sm text-gray-800 transition-all rounded-lg shadow-md bg-gray-50 dark:bg-gray-800 dark:text-gray-50 hover:opacity-80"
      onClick={toggleModal}
    >
      {token.icon && (
        <Image
          src={token['icon']}
          alt={token['symbol']}
          width="24px"
          height="24px"
          objectFit="contain"
          className="rounded-full"
        />
      )}
      <div className="pl-2 pr-1 font-extrabold transition-all text-gray-800/80 dark:text-gray-50/80">
        {formatNumberScale(price, true)}
      </div>
    </div>
  )
}

const TokenStats = ({ token, ...rest }: TokenStatsProps) => {
  const selectedToken = supportedTokens[token]
  const cronaPrice = useCronaUsdcPrice()

  return (
    <>
      <TokenStatusInner token={selectedToken} price={formatBalance(cronaPrice ? cronaPrice : '0')} />
      <TokenStatsModal token={selectedToken} price={formatBalance(cronaPrice ? cronaPrice : 0)} />
    </>
  )
}

export default TokenStats

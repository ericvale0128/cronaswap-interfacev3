import { ChainId, Currency, NATIVE, WNATIVE } from '@cronaswap/core-sdk'

import { tryParseAmount } from '../functions/parse'
import { useActiveWeb3React } from '../services/web3'
import { useCurrencyBalance } from '../states/wallet/hooks'
import { useMemo } from 'react'
import { useTransactionAdder } from '../states/transactions/hooks'
import { useWETH9Contract } from './useContract'
import { maxAmountSpend } from 'app/functions'

export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP,
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE }
/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
export default function useWrapCallback(
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
  typedValue: string | undefined
): {
  wrapType: WrapType
  execute?: undefined | (() => Promise<{ tx: string; error: string }>)
  inputError?: string
} {
  const { chainId, account } = useActiveWeb3React()
  const wethContract = useWETH9Contract()
  const balance = maxAmountSpend(useCurrencyBalance(account ?? undefined, inputCurrency))
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()

  return useMemo(() => {
    if (!wethContract || !chainId || !inputCurrency || !outputCurrency) return NOT_APPLICABLE
    const weth = WNATIVE[chainId]
    if (!weth) return NOT_APPLICABLE

    const hasInputAmount = Boolean(inputAmount?.greaterThan('0'))
    const sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount)

    if (inputCurrency.isNative && weth.equals(outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
              try {
                const txReceipt = await wethContract.deposit({
                  value: `0x${inputAmount.quotient.toString(16)}`,
                })
                addTransaction(txReceipt, {
                  summary: `Wrap ${inputAmount.toSignificant(6)} ${NATIVE[chainId].symbol} to ${WNATIVE[chainId].symbol
                    }`,
                })
                return { tx: txReceipt, error: undefined }
              } catch (error) {
                console.error('Could not deposit', error)
                return { tx: undefined, error: error?.message }
              }
            }
            : undefined,
        inputError: sufficientBalance
          ? undefined
          : hasInputAmount
            ? `Insufficient ${NATIVE[chainId].symbol} balance`
            : `Enter ${NATIVE[chainId].symbol} amount`,
      }
    } else if (weth.equals(inputCurrency) && outputCurrency.isNative) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
              try {
                const txReceipt = await wethContract.withdraw(`0x${inputAmount.quotient.toString(16)}`)
                addTransaction(txReceipt, {
                  summary: `Unwrap ${inputAmount.toSignificant(6)} ${WNATIVE[chainId].symbol} to ${NATIVE[chainId].symbol
                    }`,
                })
                return { tx: txReceipt, error: undefined }
              } catch (error) {
                console.error('Could not withdraw', error)
                return { tx: undefined, error: error?.message }
              }
            }
            : undefined,
        inputError: sufficientBalance
          ? undefined
          : hasInputAmount
            ? `Insufficient ${WNATIVE[chainId].symbol} balance`
            : `Enter ${WNATIVE[chainId].symbol} amount`,
      }
    } else {
      return NOT_APPLICABLE
    }
  }, [wethContract, chainId, inputCurrency, outputCurrency, inputAmount, balance, addTransaction])
}

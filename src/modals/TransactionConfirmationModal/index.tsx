import { AlertTriangle } from 'react-feather'
import { ChainId, Currency } from '@cronaswap/core-sdk'
import React, { FC } from 'react'
import { Trans, t } from '@lingui/macro'

import Button from 'app/components/Button'
import CloseIcon from 'app/components/CloseIcon'
import ExternalLink from 'app/components/ExternalLink'
import Image from 'app/components/Image'
import Lottie from 'lottie-react'
import Modal from 'app/components/Modal'
import ModalHeader from 'app/components/ModalHeader'
import { RowFixed } from 'app/components/Row'
import { getExplorerLink } from 'app/functions/explorer'
import loadingRollingCircleDark from 'app/animations/loading-rolling-circle-dark.json'
import loadingRollingCircleLight from 'app/animations/loading-rolling-circle-light.json'
import { useActiveWeb3React } from 'app/services/web3'
import useAddTokenToMetaMask from 'app/hooks/useAddTokenToMetaMask'
import { useLingui } from '@lingui/react'
import { CheckIcon } from '@heroicons/react/outline'

interface ConfirmationPendingContentProps {
  onDismiss: () => void
  pendingText: string
}

export const ConfirmationPendingContent: FC<ConfirmationPendingContentProps> = ({ onDismiss, pendingText }) => {
  const { i18n } = useLingui()
  return (
    <div>
      <div className="flex justify-end">
        <CloseIcon onClick={onDismiss} />
      </div>
      <div className="w-24 pb-4 m-auto">
        <Lottie animationData={loadingRollingCircleLight} className="flex dark:hidden" autoplay loop />
        <Lottie animationData={loadingRollingCircleDark} className="hidden dark:flex" autoplay loop />
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="text-lg font-extrabold text-gray-800 dark:text-gray-50 transition-all">{i18n._(t`Waiting for Confirmation`)}</div>
        <div className="font-bold">{pendingText}</div>
        <div className="text-sm font-bold text-gray-800/80 dark:text-gray-50/50 transition-all">{i18n._(t`Confirm this transaction in your wallet`)}</div>
      </div>
    </div>
  )
}

interface TransactionSubmittedContentProps {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
  currencyToAdd?: Currency | undefined
  inline?: boolean // not in modal
}

export const TransactionSubmittedContent: FC<TransactionSubmittedContentProps> = ({
  onDismiss,
  chainId,
  hash,
  currencyToAdd,
}) => {
  const { i18n } = useLingui()
  const { library } = useActiveWeb3React()
  const { addToken, success } = useAddTokenToMetaMask(currencyToAdd)
  return (
    <div>
      <div className="flex justify-end">
        <CloseIcon onClick={onDismiss} />
      </div>
      <div className="w-24 pb-4 m-auto">
        <CheckIcon
          strokeWidth={2}
          width={80}
          height={80}
          className="p-2 border-4 text-green-special border-green-special rounded-2xl"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="text-lg font-bold">{i18n._(t`Transaction Submitted`)}</div>
        {chainId && hash && (
          <ExternalLink href={getExplorerLink(chainId, hash, 'transaction')}>
            <div className="font-bold text-base text-blue-special">View on explorer</div>
          </ExternalLink>
        )}
        {currencyToAdd && library?.provider?.isMetaMask && (
          <Button color="gradient" onClick={addToken} className="w-auto px-8 mt-4 font-extrabold">
            {!success ? (
              <RowFixed className="mx-auto space-x-2 items-center text-sm">
                <span>{i18n._(t`Add ${currencyToAdd.symbol} to MetaMask`)}</span>
                <Image
                  src="/images/wallets/metamask.png"
                  alt={i18n._(t`Add ${currencyToAdd.symbol} to MetaMask`)}
                  width={18}
                  height={18}
                  className="ml-1 rounded-none"
                />
              </RowFixed>
            ) : (
              <RowFixed>
                {currencyToAdd.symbol} {i18n._(t`added`)}
                {/* <CheckCircle className="ml-1.5 text-2xl text-green" size="16px" /> */}
              </RowFixed>
            )}
          </Button>
        )}
        {/* <Button color="gradient" className="font-extrabold" onClick={onDismiss} style={{ margin: '20px 0 0 0' }}>
          Close
        </Button> */}
      </div>
    </div>
  )
}

interface ConfirmationModelContentProps {
  title: string
  onDismiss: () => void
  topContent: () => React.ReactNode
  bottomContent: () => React.ReactNode
}

export const ConfirmationModalContent: FC<ConfirmationModelContentProps> = ({
  title,
  bottomContent,
  onDismiss,
  topContent,
}) => {
  return (
    <div className="grid gap-3">
      <ModalHeader title={title} onClose={onDismiss} />
      {topContent()}
      {bottomContent()}
    </div>
  )
}

interface TransactionErrorContentProps {
  message: string
  onDismiss: () => void
}

export const TransactionErrorContent: FC<TransactionErrorContentProps> = ({ message, onDismiss }) => {
  const { i18n } = useLingui()

  return (
    <div className="grid gap-6">
      <div>
        <div className="flex justify-between">
          <div className="text-base font-extrabold text-gray-800 dark:text-gray-50">{i18n._(t`Error`)}</div>
          <CloseIcon onClick={onDismiss} />
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <AlertTriangle className="text-red" style={{ strokeWidth: 1.5 }} size={64} />
          <div className="font-bold text-red">{message}</div>
        </div>
      </div>
      <div>
        <Button color="gradient" size="lg" className="font-extrabold" onClick={onDismiss}>
          Dismiss
        </Button>
      </div>
    </div>
  )
}

interface ConfirmationModalProps {
  isOpen: boolean
  onDismiss: () => void
  hash: string | undefined
  content: () => React.ReactNode
  attemptingTxn: boolean
  pendingText: string
  currencyToAdd?: Currency | undefined
}

const TransactionConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  onDismiss,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd,
}) => {
  const { chainId } = useActiveWeb3React()

  if (!chainId) return null

  // confirmation screen
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90}>
      {attemptingTxn ? (
        <div className="mb-6">
          <ConfirmationPendingContent onDismiss={onDismiss} pendingText={pendingText} />
        </div>
      ) : hash ? (
        <div className="mb-6">
          <TransactionSubmittedContent
            chainId={chainId}
            hash={hash}
            onDismiss={onDismiss}
            currencyToAdd={currencyToAdd}
          />
        </div>
      ) : (
        content()
      )}
    </Modal>
  )
}

export default TransactionConfirmationModal

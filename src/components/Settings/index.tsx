import { ChainId, Percent } from '@cronaswap/core-sdk'
import React, { useRef, useState } from 'react'
import { useExpertModeManager, useUserSingleHopOnly, useUserTransactionTTL } from 'app/states/user/hooks'
import { useModalOpen, useToggleSettingsMenu } from 'app/states/application/hooks'

import { CogIcon } from '@heroicons/react/outline'
import { ApplicationModal } from 'app/states/application/actions'
import Button from '../Button'
import Modal from '../Modal'
import ModalHeader from '../ModalHeader'
import QuestionHelper from '../QuestionHelper'
import Toggle from '../Toggle'
import TransactionSettings from '../TransactionSettings'
import Typography from '../Typography'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from 'app/services/web3'
import { useLingui } from '@lingui/react'
import { useOnClickOutside } from 'app/hooks/useOnClickOutside'

export default function SettingsTab({ placeholderSlippage }: { placeholderSlippage?: Percent }) {
  const { i18n } = useLingui()

  const node = useRef<HTMLDivElement>(null)
  const open = useModalOpen(ApplicationModal.SETTINGS)
  const toggle = useToggleSettingsMenu()

  const [expertMode, toggleExpertMode] = useExpertModeManager()

  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()

  // show confirmation view before turning on
  const [showConfirmation, setShowConfirmation] = useState(false)

  useOnClickOutside(node, open ? toggle : undefined)

  return (
    <div className="relative flex" ref={node}>
      <div
        className="flex items-center justify-center w-8 h-8 transition-all rounded cursor-pointer text-gray-800 hover:text-gray-800/80 active:text-gray-800 dark:text-white dark:hover:text-white/80 dark:active:text-white/80"
        onClick={toggle}
        id="open-settings-dialog-button"
      >
        <CogIcon className="w-[26px] h-[26px] transform rotate-90 " />
      </div>
      {open && (
        <div className="absolute top-4 right-3 z-50 -mr-2.5 min-w-20 md:m-w-22 md:-mr-5 bg-white dark:bg-gray-800 border-2 border-[#D7D7FF] dark:border-[#2D2C2C] rounded-3xl w-64 shadow-lg">
          <div className="p-4 space-y-2">
            <Typography className="pb-2 font-bold transition-all border-b-2 text-gray-800 dark:text-white border-b-gray-800/20 dark:border-b-white/20">
              {i18n._(t`Transaction Settings`)}
            </Typography>

            <TransactionSettings placeholderSlippage={placeholderSlippage} />

            <Typography className="pt-4 pb-2 font-bold transition-all border-b-2 text-gray-800 dark:text-white border-b-gray-800/20 dark:border-b-white/20">
              {i18n._(t`Interface Settings`)}
            </Typography>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Typography variant="xs" className="transition-all text-gray-800 dark:text-white">
                  {i18n._(t`Toggle Expert Mode`)}
                </Typography>
                <QuestionHelper
                  text={i18n._(t`Bypasses confirmation modals and allows high slippage trades. Use at your own risk.`)}
                />
              </div>
              <Toggle
                id="toggle-expert-mode-button"
                isActive={expertMode}
                toggle={
                  expertMode
                    ? () => {
                      toggleExpertMode()
                      setShowConfirmation(false)
                    }
                    : () => {
                      toggle()
                      setShowConfirmation(true)
                    }
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Typography variant="xs" className="transition-all text-gray-800 dark:text-white">
                  {i18n._(t`Disable Multihops`)}
                </Typography>
                <QuestionHelper text={i18n._(t`Restricts swaps to direct pairs only.`)} />
              </div>
              <Toggle
                id="toggle-disable-multihop-button"
                isActive={singleHopOnly}
                toggle={() => (singleHopOnly ? setSingleHopOnly(false) : setSingleHopOnly(true))}
              />
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={showConfirmation} onDismiss={() => setShowConfirmation(false)}>
        <div className="space-y-4">
          <ModalHeader title={i18n._(t`Are you sure?`)} onClose={() => setShowConfirmation(false)} />
          <Typography variant="base">
            {i18n._(t`Expert mode turns off the confirm transaction prompt and allows high slippage trades
                                that often result in bad rates and lost funds.`)}
          </Typography>
          <Typography variant="sm" className="font-medium">
            {i18n._(t`ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.`)}
          </Typography>
          <Button
            color="red"
            size="lg"
            onClick={() => {
              // if (window.prompt(i18n._(t`Please type the word "confirm" to enable expert mode.`)) === 'confirm') {
              //   toggleExpertMode()
              //   setShowConfirmation(false)
              // }
              toggleExpertMode()
              setShowConfirmation(false)
            }}
          >
            <Typography variant="sm" id="confirm-expert-mode">
              {i18n._(t`Turn On Expert Mode`)}
            </Typography>
          </Button>
        </div>
      </Modal>
    </div>
  )
}

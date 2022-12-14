import { Popover, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

import ExternalLink from '../ExternalLink'
import { I18n } from '@lingui/core'
import Image from 'next/image'
import { classNames } from '../../functions/styling'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import NavLink from '../NavLink'

const items = (i18n: I18n) => [
  {
    name: i18n._(t`Docs`),
    description: i18n._(t`Documentation for users of CronaSwap.`),
    href: 'https://docs.cronaswap.org',
    external: true,
  },
  {
    name: i18n._(t`Medium`),
    description: i18n._(t`News for users of CronaSwap.`),
    href: 'https://cronaswap.medium.com',
    external: true,
  },
  {
    name: i18n._(t`Twitter`),
    description: i18n._(t`Follow our official Twitter.`),
    href: 'https://twitter.com/cronaswap',
    external: true,
  },
  {
    name: i18n._(t`Telegram`),
    description: i18n._(t`Join the community on Telegram.`),
    href: 'https://t.me/cronaswap',
    external: true,
  },
  {
    name: i18n._(t`Discord`),
    description: i18n._(t`Join the community on Discord.`),
    href: 'https://discord.gg/YXxega5vJG',
    external: true,
  },
  {
    name: i18n._(t`GitHub`),
    description: i18n._(t`CronaSwap is a supporter of Open Source.`),
    href: 'https://github.com/cronaswap',
    external: true,
  },
  {
    name: i18n._(t`Audit`),
    description: i18n._(t`CronaSwap audit by Certik.`),
    href: 'https://docs.cronaswap.org/security-audits',
    external: true,
  },
  {
    name: i18n._(t`Vesting`),
    description: i18n._(t`Daily unlocks from the vesting period.`),
    href: '/vesting',
    external: false,
  },
]

export default function Menu() {
  const { i18n } = useLingui()
  const solutions = items(i18n)
  const isDesktop = window.innerWidth > 1024

  return (
    <Popover className="relative ml-auto md:m-0">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              'text-gray-800 dark:text-gray-50',
              'outline-none focus:outline-none hover:opacity-60 opacity-100 transition-all flex items-center justify-center'
            )}
          >
            <svg
              width="16px"
              height="16px"
              className="inline-flex items-center w-5 h-5 ml-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Popover.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className={`absolute z-50 px-2 mt-3 transform -translate-x-full bottom-12 lg:top-12 left-full sm:px-0 ${isDesktop ? '' : 'overflow-y-scroll max-h-[480px]'
                }`}
            >
              <div className="overflow-hidden rounded-xl shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6 px-5 py-6 bg-gray-50/80 dark:bg-gray-800/90 sm:gap-8 sm:p-8">
                  {solutions.map((item) =>
                    item.external ? (
                      <ExternalLink
                        key={item.name}
                        href={item.href}
                        className="block p-3 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-gray-800/10 dark:hover:bg-gray-50/5"
                      >
                        <p className="text-base font-extrabold text-gray-800 dark:text-gray-50">{item.name}</p>
                        <p className="mt-1 text-sm text-gray-800/60 dark:text-gray-50/60">{item.description}</p>
                      </ExternalLink>
                    ) : (
                      <NavLink key={item.name} href={item.href}>
                        <a className="block p-3 -m-3 transition duration-150 ease-in-out rounded-md hover:bg-dark-800">
                          <p className="text-base font-extrabold text-gray-800 dark:text-gray-50">{item.name}</p>
                          <p className="mt-1 text-sm text-gray-800/60 dark:text-gray-50/60">{item.description}</p>
                        </a>
                      </NavLink>
                    )
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

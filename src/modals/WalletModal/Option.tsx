import Image from 'next/image'
import React from 'react'

export default function Option({
  link = null,
  clickable = true,
  size,
  onClick = null,
  color,
  header,
  subheader = null,
  icon,
  active = false,
  id,
}: {
  link?: string | null
  clickable?: boolean
  size?: number | null
  onClick?: null | (() => void)
  color: string
  header: React.ReactNode
  subheader: React.ReactNode | null
  icon: string
  active?: boolean
  id: string
}) {
  const content = (
    <div
      onClick={onClick}
      className={`flex items-center justify-between w-full px-5 py-3 rounded-2.5xl cursor-pointer transition-all ${!active
        ? 'bg-gray-50 opacity-70 hover:opacity-90 dark:bg-gray-800'
        : 'bg-gray-50 opacity-90 hover:opacity-100 dark:bg-gray-800'
        }`}
    >
      <div>
        <div className="flex items-center text-base font-bold dark:font-normal">
          {active && <div className="w-4 h-4 mr-4 rounded-full" style={{ background: color }} />}
          {header}
        </div>
        {subheader && <div className="mt-2.5 text-xs">{subheader}</div>}
      </div>
      <Image src={icon} alt={'Icon'} width="32px" height="32px" />
    </div>
  )
  if (link) {
    return <a href={link}>{content}</a>
  }

  return !active ? (
    content
  ) : (
    <div className="w-full p-px rounded-2.5xl bg-gradient-to-r from-blue to-pink">{content}</div>
  )
}

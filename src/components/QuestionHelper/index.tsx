import React, { FC, useCallback, useState } from 'react'
import { QuestionMarkCircleIcon as SolidQuestionMarkCircleIcon } from '@heroicons/react/solid'
import Tooltip from '../Tooltip'

const QuestionHelper: FC<{ text?: any }> = ({ children, text }) => {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  if (children) {
    return (
      <Tooltip text={text} show={show}>
        <div
          className="flex items-center justify-center outline-none"
          onClick={open}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          {children}
        </div>
      </Tooltip>
    )
  }

  return (
    <Tooltip text={text} show={show}>
      <div
        className="flex items-center justify-center -mt-[1px] ml-1 transition-all outline-none cursor-help hover:text-primary"
        onClick={open}
        onMouseEnter={open}
        onMouseLeave={close}
      >
        <SolidQuestionMarkCircleIcon width={16} height={16} />
      </div>
    </Tooltip>
  )
}

export default QuestionHelper

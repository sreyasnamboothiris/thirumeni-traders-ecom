import { router } from '@inertiajs/react'
import ButtonBorderIcon from './ButtonBorderIcon'
import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'

interface Properties {
  link?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown
}

export default function BackButton({ onClick, link }: Properties) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (link != null) {
      router.get(link)
      return
    }
    if (onClick != null) {
      onClick(e)
    }
  }

  return (
    <ButtonBorderIcon
      onClick={handleClick}
      type='danger'
    >
      <ArrowLeftIcon className='h-6 w-6' />
    </ButtonBorderIcon>
  )
}

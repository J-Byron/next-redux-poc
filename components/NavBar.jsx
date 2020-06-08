import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Link from 'next/link'

function HomeButton() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '30px',
        left: '30px'
      }}
    >
      <Link href='/' passHref>
        <IconButton component='a'>
          <HomeIcon />
        </IconButton>
      </Link>

      <Link href='/lorem' passHref>
        <Button component='a'>
          <span> LOREM </span>
        </Button>
      </Link>
    </div>
  )
}

export default HomeButton

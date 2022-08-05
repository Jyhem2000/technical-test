import Link from 'next/link'
import type { FC } from 'react'
import Logo from '../assets/lbc-logo.webp'
import Image from 'next/image'
import { Button } from '@mui/material'


const Home: FC = () => {
  return (
    <>
      <Image src={Logo} alt='Leboncoin Frontend Team' width={400} height={125} layout='fixed' />
      <div className='actions'>
        <Link href='/conversationList'>
          <a className='btn'><Button variant='outlined'>View conversations</Button></a>
        </Link>
      </div>
    </>
  )
}


export default Home

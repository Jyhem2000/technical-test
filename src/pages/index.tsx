import Link from 'next/link'
import type { FC } from 'react'
import Logo from '../assets/lbc-logo.webp'
import Image from 'next/image'
import { Button } from '@mui/material'
import { PATH_CONVERSATION_LIST } from '../utils/constants'


const Home: FC = () => {
  return (
    <>
      <Image src={Logo} alt='Leboncoin Frontend Team' width={400} height={125} layout='fixed' />
      <div className='actions'>
        <Link href={PATH_CONVERSATION_LIST}>
          <a className='btn'><Button variant='outlined'>View conversations</Button></a>
        </Link>
      </div>
    </>
  )
}


export default Home

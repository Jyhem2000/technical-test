import type { FC, ReactElement } from 'react'
import Head from 'next/head'

const Header: FC = (): ReactElement => {
  return (
    <>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr"></meta>
      </Head>
    </>
  )
}

export default Header

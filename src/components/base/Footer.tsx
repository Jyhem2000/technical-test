import type { FC, ReactElement } from 'react'

const Footer: FC = (): ReactElement => {
  return (
    <footer className="footer">
      &copy; leboncoin - {new Date().getFullYear()}
    </footer>
  )
}

export default Footer

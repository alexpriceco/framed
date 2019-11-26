import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styled from 'styled-components'

type LayoutProps = {
  title?: string
}

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Layout: React.FunctionComponent<LayoutProps> = ({ children, title }) => (
  <StyledLayout>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <style jsx global>{`
      body { 
        background: #000;
        font: 11px menlo;
        color: #fff;
        margin: 0;
        padding: 0;
        min-width: 100vw;
        min-height: 100vh;
      }
    `}</style>
    
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/new">
          <a>Add new...</a>
        </Link>{' '}
        |{' '}
      </nav>
    </header>
    {children}
  </StyledLayout>
)

export default Layout
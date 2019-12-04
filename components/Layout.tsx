import * as React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

type LayoutProps = {
  title?: string
}

const StyledLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
`

const Layout: React.FunctionComponent<LayoutProps> = ({ children, title }) => (
  <StyledLayout>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css?family=DM+Sans:400,500&display=swap');
      
      body { 
        background: #000;
        font-family: 'DM Sans', sans-serif;
        font-size: 11px;
        color: #fff;
        margin: 0;
        padding: 0;
        min-width: 100vw;
        min-height: 100vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }

      h1 {
        font-family: DM Sans;
        font-style: normal;
        font-weight: 500;
        font-size: 48px;
        line-height: 140%;
        letter-spacing: 0.02em;
        margin: 0;
        margin-bottom: 1em;
      }

      h2 {
        font-style: normal
        font-weight: 500;
        font-size: 32px;
        line-height: 140%;
        letter-spacing: 0.02em;
        margin: 0;
        margin-bottom: 0.5em;
      }

      p, span {
        font-family: DM Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 140%;
        letter-spacing: 0.02em;
        margin: 0;
        margin-bottom: 1em;
        opacity: 0.75;
      }
    `}</style>
    
    {children}
  </StyledLayout>
)

export default Layout
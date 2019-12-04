import { Component } from 'react'
import moment from 'moment'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Button from '../components/Button'

type Props = {
  author: string,
  publishDate: string,
  description: string,
  source: string,
}

type FramedProps = {
  src: string,
}

const FramedContent = styled.img<FramedProps>`
`

const FrameSection = styled.section`
  width: 60vw;
  margin-left: 10vw;

  > * {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
  }
`

const MetaDataSection = styled.section`
  width: 20vw;
`;

class Frame extends Component<Props> {
  static defaultProps = {
    author: 'Alex',
    publishDate: moment(new Date('Jan 4, 2019')).format('MMM D, YYYY'),
    description: 'This is a shot of a classic Porsche, taken by Severin D. in Switzerland, and sourced from Unsplash.',
    source: 'https://images.unsplash.com/photo-1567542770707-9398afccb7a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
  }

  render() {
    const { author, publishDate, source, description } = this.props
    
    return (
      <Layout>
        <MetaDataSection>
          <h2>Frame title</h2>
          <p style={{ opacity: 0.5, marginBottom: '0.5em' }}>{author} / {publishDate}</p>
          <p style={{ marginBottom: '2em' }}>{description}</p>

          <Button onClick={() => console.log('Handle commenting...')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '12px' }}>
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            Comment
          </Button>
        </MetaDataSection>
        <FrameSection>
          <FramedContent src={source} />
        </FrameSection>
      </Layout>
    )
  }
}

export default Frame
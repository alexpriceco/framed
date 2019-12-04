import { Component } from 'react'
import moment from 'moment'
import Head from 'next/head'
import Layout from '../../components/Layout'
import Button from '../../components/Button'

import {
  CommentSection,
  MetaDataSection,
  FrameSection,
  FramedContent,
} from './styles'

const initialState = {
  commenting: false,
  commentSent: false,
  canSendFeedback: false,
  comment: '',
  author: 'Alex',
  title: 'Schweiz-Porsche',
  publishDate: new Date('Jan 4, 2019'),
  description: 'This is a shot of a classic Porsche, taken by Severin D. in Switzerland, and sourced from Unsplash.',
  source: ['https://images.unsplash.com/photo-1567542770707-9398afccb7a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80']
}

type State = Readonly<typeof initialState>

class Frame extends Component {
  readonly state: State = initialState

  handleCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const comment = e.target.value;
    const canSendFeedback = comment.length > 4
    this.setState({ comment, canSendFeedback })
  }

  getCommentSection() {
    const { commenting, commentSent, comment, canSendFeedback } = this.state
    
    if (commenting) {
      return (
        <CommentSection>
          <textarea
            autoFocus
            value={comment}
            onChange={(e) => this.handleCommentChange(e)}
          />
          <div>
            <Button onClick={() => this.setState({ commenting: false })}>
              Cancel
            </Button>
            <Button
              onClick={() => this.setState({ commenting: false, commentSent: true })}
              disabled={!canSendFeedback}
              isLight
            >
              Send feedback
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
        </CommentSection>
      )
    } else if (commentSent) {
      return (
        <span style={{ opacity: 1 }}>Comment successfully sent.</span>
      )
    }

    return (
      <Button onClick={() => this.setState({ commenting: true })}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '12px' }}>
        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      Comment
    </Button>
    )
  }

  render() {
    const { author, publishDate, source, description, title } = this.state
    const formattedDate =  moment(publishDate).format('MMM D, YYYY')
    
    return (
      <Layout>
        <Head><title>Framed | {title}</title></Head>
        <MetaDataSection>
          <h2>{title}</h2>
          <p>{author} / {formattedDate}</p>
          <p>{description}</p>

          {this.getCommentSection()}
        </MetaDataSection>
        <FrameSection>
          <FramedContent src={source[0]} />
        </FrameSection>
      </Layout>
    )
  }
}

export default Frame
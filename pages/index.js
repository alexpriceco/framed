import { Component } from 'react'
import Head from 'next/head'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import config from '../config/firebase-api-key.js'
import firebase from 'firebase/app'
require('firebase/firestore')
require('firebase/auth')

if (!firebase.apps.length) {
  console.log(
    '%cCreating a new firebase instance...',
    'color: grey; font-style: italic'
  )

  console.debug(config)
  firebase.initializeApp(config)
}

export default class Index extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      posts: [{
        title: '',
        description: '',
        postDate: '',
        color1: '#EFEFF1',
        color2: '#DEDEE0',
        imageURL: ''
      }],

      i: 0,
      progressTime: 10,
      baseURL: 'mineralsoft',
      startShow: false,
      loaded: false
    }
  }

  componentDidMount () {
    this.getDataFromFirebase()
    // .then((data) => {
    //   this.setState({
    //     loading: false,
    //     data
    //   })
    // }).catch((error) => {
    //   this.setState({
    //     loading: false,
    //     error
    //   })
    // })

    let timeout = setTimeout(() => {
      this.setState({ startShow: true })
    }, 350)

    let interval = setInterval(() => {
      const i = this.state.i === this.state.posts.length - 1
        ? 0 : this.state.i + 1

      this.setState({ i })
    }, this.state.progressTime * 1000)

    this.setState({ interval, timeout })
  }

  async getDataFromFirebase () {
    const collection = firebase.firestore().collection(this.state.baseURL)
    collection.orderBy('postDate').limit(3).get().then(snapshot => {
      let posts = []
      snapshot.forEach(post => {
        posts.push(post.data())
      })

      this.setState({ posts })
    })
  }

  componentWillUnmount () {
    clearInterval(this.state.interval)
    clearTimeout(this.state.timeout)
  }

  render () {
    const { posts, i, progressTime } = this.state

    return (
      <div>
        <Head>
          <title>Framed</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        </Head>
        <div className='root'>
          <ReactCSSTransitionGroup
            className='content'
            transitionName={{
              enter: 'enter',
              leave: 'leave'
            }}
            transitionEnterTimeout={1500}
            transitionLeaveTimeout={500}
            component='div'
          >
            <div key={posts[i].imageURL} />
            {/* <img  src={posts[i].imageURL} /> */}
          </ReactCSSTransitionGroup>

          <div className='meta'>
            <ReactCSSTransitionGroup
              className='description'
              transitionName={{
                enter: 'enter',
                leave: 'leave'
              }}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
              component='div'
            >
              <div key={new Date().toISOString()}>
                <h1>{posts[i].title}</h1>
                <h2>{posts[i].description}</h2>
              </div>
            </ReactCSSTransitionGroup>

            <ReactCSSTransitionGroup
              className='progress'
              transitionName={{
                enter: 'enter',
                leave: 'leave'
              }}
              transitionEnterTimeout={350}
              transitionLeaveTimeout={350}
              component='div'
            >
              <div className='percent' key={`indicator-${i}`} />
            </ReactCSSTransitionGroup>

            <div className='shared-via'>
              <h2>Posted {
                posts[i].postDate ? posts[i].postDate.toLocaleTimeString('en-US', {
                  month: 'long',
                  day: 'numeric'
                }).split(',')[0] : ''
              } in #design on</h2> {SlackIcon}
            </div>
          </div>
          <style jsx>{`
            .meta {
              background: #FFFFFF;
              height: 100vh;
              width: 30vw;
              min-width: 600px;
              position: absolute;
              right: 0;
              top: 0;
              box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
              padding: 50px 100px;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
            }

            .shared-via {
              text-align: center;
            }

            .shared-via * {
              display: inline-block;
              vertical-align: bottom;
              margin: 12px 0;
            }

            .shared-via h2 {
              color: #B3B5B9;
              line-height: 24px;
            }
          `}</style>
          <style global jsx>{`
            body {
              background: black;
              padding: 0;
              margin: 0;
            }

            h1 {
              font-family: 'Roboto', sans-serif;
              font-style: normal;
              font-weight: normal;
              line-height: normal;
              font-size: 32px;
              color: #181D23;
            }

            h2 {
              font-family: 'Roboto', sans-serif;
              font-style: normal;
              font-weight: normal;
              line-height: 35px;
              font-size: 24px;
              color: #77797F;
              margin: 12px 0;
            }

            .content {
              position: relative;
              background: black;
              width: 70vw;
              height: 100vh;
              background: linear-gradient(45deg, blue, orange);
              background-size: 200% 200%;
              animation: gradient-animation ${progressTime / 2}s ease infinite;
            }

            @keyframes gradient-animation {
              0% { background-position: 0% 50% }
              50% { background-position: 100% 50% }
              100% { background-position: 0% 50% }
            }

            .content div {
              position: absolute;
              top: 100px;
              left: 100px;
              height: calc(100vh - 200px);
              width: 100vh;
              background-color: black;
              border-radius: 3px;
              transform: translateX(0);
              opacity: 1;
              transition:
                transform ${progressTime - 1}s linear,
                opacity 0.5s ease;
            }

            .content > div.leave {
              transition: all 0.5s ease;
              transform: translateX(0);
              opacity: 1;
            }

            .content > div.leave.leave-active {
              transform: translateX(25%);
              opacity: 0;
            }

            .content > div.enter {
              transform: translateX(calc(-100% - 100px));
              opacity: 0;
            }

            .content > div.enter.enter-active {
              transition: all 1s ease 0.5s;
              transform: translateX(-50%);
              opacity: 1;
            }

            .description {
              flex-grow: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding-bottom: 100px;
            }

            .description > div {
              transition: all 500ms ease;
              position: absolute;
              left: 100px;
              top: 50%;
              transform: translate(0, calc(-50% - 50px));
              width: calc(100% - 200px);
            }

            .description > .enter {
              opacity: 0.01;
              transition-delay: 150ms;
              transform: translate(-25px, calc(-50% - 50px));
              -webkit-transform: translate(-25px, calc(-50% - 50px));
            }

            .description > .enter.enter-active {
              opacity: 1;
              transform: translate(0, calc(-50% - 50px));
              -webkit-transform: translate(0, calc(-50% - 50px));
            }

            .description > .leave {
              opacity: 1;
              transition: all 300ms ease;
              transform: translate(0, calc(-50% - 50px));
              -webkit-transform: translate(0, calc(-50% - 50px));
            }

            .description > .leave.leave-active {
              opacity: 0.01;
              transform: translate(25px, calc(-50% - 50px));
              -webkit-transform: translate(25px, calc(-50% - 50px));
            }

            .meta .progress {
              background: #efeff1;
              width: calc(100% - 40px);
              border-radius: 5px;
              height: 10px;
              margin: 20px;
              position: relative;
              overflow: hidden;
              z-index: 1;
            }

            .meta .progress .percent {
              position: absolute;
              left: 0;
              top: 0;
              height: 10px;
              margin: 0;
              background-color: #B3B5B9;
              border-radius: 5px;
              width: 100%;
              animation-name: progress-animation;
              animation-duration: ${progressTime - 0.35}s;
              animation-timing-function: linear;
              animation-direction: both;
              transition: all 1s ease;
            }

            .progress > .percent.leave {
              opacity: 1;
            }

            .progress > .percent.leave.leave-active {
              opacity: 0;
            }

            @keyframes progress-animation {
              from { transform: translateX(-100%); }
              to { transform: translateX(0); }
            }
          `}</style>
        </div>
      </div>
    )
  }
}

const SlackIcon =
  <svg width='85' height='24' viewBox='0 0 85 24' fill='none' xmlns='http://www.w3.org/2000/svg' style={{ margin: '8px 4px' }}>
    <path d='M9.73146 0.987524C10.4717 1.31017 10.5286 1.55691 9.94024 2.65771C9.35188 3.79647 9.20004 3.85341 8.47882 3.56872C7.56781 3.17015 6.39109 2.88546 5.63191 2.88546C4.39825 2.88546 3.56316 3.32199 3.56316 4.00525C3.56316 6.22584 10.6615 5.03014 10.6615 9.77498C10.6615 12.1664 8.61168 13.7607 5.53702 13.7607C3.92377 13.7607 1.93093 13.2292 0.545438 12.527C-0.13782 12.1854 -0.175781 11.9766 0.41258 10.8378C0.925024 9.83192 1.09584 9.73702 1.83603 10.0407C3.01276 10.5531 4.49315 10.9517 5.49906 10.9517C6.63782 10.9517 7.37802 10.4962 7.37802 9.81294C7.37802 7.64929 0.14687 8.67418 0.14687 4.08117C0.14687 1.63282 2.17767 0.000596057 5.23335 0.000596057C6.67578 -0.0183833 8.47882 0.418142 9.73146 0.987524Z' transform='translate(28.4822 5.60016)' fill='#B3B5B9' />
    <path d='M3.2265 0.950823V18.6396C3.2265 18.9053 2.94181 19.19 2.54324 19.19H0.683254C0.284686 19.19 0 18.9053 0 18.6396V0.950823C0 0.0777711 0.246732 0.00185346 1.61325 0.00185346C3.16956 -0.0171259 3.2265 0.0967504 3.2265 0.950823Z' transform='translate(40.719)' fill='#B3B5B9' />
    <path d='M11.6723 5.29539V12.9061C11.6723 13.3047 11.3876 13.5894 10.9891 13.5894H9.14807C8.73052 13.5894 8.42685 13.2857 8.46481 12.8682L8.48379 12.0521C7.47788 13.1529 6.05443 13.7412 4.63097 13.7412C1.85998 13.7412 0 12.128 0 9.73657C0 7.19333 2.10672 5.4662 5.25729 5.4662C6.453 5.4662 7.5538 5.67497 8.44583 6.05456V5.18151C8.44583 3.77703 7.34503 2.94194 5.46607 2.94194C4.59302 2.94194 3.51119 3.28357 2.65712 3.79601C1.99284 4.1756 1.841 4.13764 1.11978 3.0748C0.417546 2.01195 0.436525 1.80318 1.11978 1.36665C2.41038 0.531558 4.17547 0.000135635 5.78872 0.000135635C9.3948 -0.0188438 11.6723 1.95501 11.6723 5.29539ZM3.09364 9.6986C3.09364 10.6096 3.85282 11.217 5.02954 11.217C6.43401 11.217 7.70563 10.5337 8.44583 9.39494V8.19923C7.70563 7.91454 6.79462 7.76271 5.99749 7.76271C4.25139 7.76271 3.09364 8.57882 3.09364 9.6986Z' transform='translate(45.5017 5.60065)' fill='#B3B5B9' />
    <path d='M11.046 1.04387C11.7293 1.44243 11.7482 1.65121 11.008 2.78997C10.3058 3.8718 10.1919 3.92874 9.45174 3.54915C8.88235 3.24548 7.99032 2.99874 7.23114 2.99874C4.89668 2.99874 3.34037 4.53607 3.34037 6.85156C3.34037 9.26194 4.89668 10.8752 7.23114 10.8752C8.04726 10.8752 9.05317 10.5715 9.71745 10.1919C10.4007 9.79337 10.5336 9.83133 11.2548 10.8752C11.9001 11.8431 11.8811 12.0709 11.3117 12.4884C10.2678 13.2097 8.63562 13.7601 7.19319 13.7601C2.88487 13.7601 0 10.9891 0 6.85156C0 2.73303 2.88486 0 7.23114 0C8.52174 0.0189794 10.0781 0.474485 11.046 1.04387Z' transform='translate(58.7493 5.56281)' fill='#B3B5B9' />
    <path d='M11.9001 17.518C12.4315 18.2012 12.2227 18.448 10.8752 18.9414C9.50868 19.4349 9.31888 19.4159 8.82542 18.7706L4.9726 13.6272L3.24548 15.2974V18.6378C3.24548 18.9035 2.96079 19.1882 2.56222 19.1882H0.683259C0.284692 19.1882 0 18.9035 0 18.6378V0.94897C0 0.0759176 0.246732 0 1.61325 0C3.16956 0 3.2265 0.113876 3.2265 0.94897V11.008L8.50277 5.94055C9.09113 5.39015 9.41378 5.42811 10.4387 6.11136C11.5774 6.85156 11.6723 7.06033 11.1219 7.59176L7.19319 11.4256L11.9001 17.518Z' transform='translate(71.978 0.00183105)' fill='#B3B5B9' />
    <path d='M3.34037 0H0V3.2265H3.34037V0Z' transform='translate(9.77344 11.1501) rotate(-18.5183)' fill='#B3B5B9' />
    <path d='M3.34037 0H0V3.2265H3.34037V0Z' transform='translate(9.77344 11.1501) rotate(-18.5183)' fill='#B3B5B9' />
    <path d='M22.7455 8.60586C20.2972 0.44472 16.767 -1.45322 8.60586 0.995122C0.44472 3.44346 -1.45322 6.97363 0.995122 15.1348C3.44346 23.2959 6.97363 25.1939 15.1348 22.7455C23.2959 20.2972 25.1939 16.767 22.7455 8.60586ZM18.627 13.9011L17.0896 14.4136L17.6211 16.0078C17.8298 16.6531 17.4882 17.3554 16.8429 17.5641C16.7101 17.6021 16.5582 17.6401 16.4254 17.6211C15.9319 17.6021 15.4574 17.2794 15.2866 16.786L14.7552 15.1917L11.5856 16.2546L12.117 17.8488C12.3258 18.4941 11.9842 19.1964 11.3389 19.4051C11.206 19.4431 11.0542 19.4811 10.9213 19.4621C10.4279 19.4431 9.9534 19.1204 9.78258 18.627L9.25116 17.0327L7.71383 17.5452C7.58097 17.5831 7.42914 17.6211 7.29628 17.6021C6.80282 17.5831 6.32833 17.2605 6.15752 16.767C5.94874 16.1217 6.29037 15.4195 6.93567 15.2107L8.473 14.6982L7.44812 11.6426L5.91079 12.155C5.77793 12.193 5.62609 12.2309 5.49324 12.2119C4.99977 12.193 4.52529 11.8703 4.35447 11.3769C4.1457 10.7316 4.48733 10.0293 5.13263 9.82054L6.66996 9.3081L6.13854 7.71383C5.92976 7.06853 6.27139 6.36629 6.91669 6.15752C7.56199 5.94874 8.26423 6.29037 8.473 6.93567L9.00443 8.52994L12.174 7.4671L11.6426 5.87283C11.4338 5.22753 11.7754 4.52529 12.4207 4.31652C13.066 4.10774 13.7683 4.44937 13.977 5.09467L14.5085 6.68894L16.0458 6.1765C16.6911 5.96772 17.3933 6.30935 17.6021 6.95465C17.8109 7.59995 17.4692 8.30219 16.8239 8.51096L15.2866 9.02341L16.3115 12.0791L17.8488 11.5666C18.4941 11.3579 19.1964 11.6995 19.4051 12.3448C19.6139 12.9901 19.2723 13.6923 18.627 13.9011Z' transform='translate(0 0.259338)' fill='#B3B5B9' />
  </svg>

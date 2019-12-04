import { Component } from 'react'
import Layout from '../components/Layout'
import Button from '../components/Button'
import firebase, { provider } from '../components/Firebase'

class Index extends Component {
  componentDidMount() {
    const user = firebase.auth().currentUser
    if (user && user.email) {
      console.info('User is logged in as ', user.displayName)
    }
  }
  
  signInWithGoogle() {
    firebase.auth().signOut().then(() => {
      console.info('Sign out successful')
    }).catch((error) => {
      console.error(error)
    });

    firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user
      console.log(result, user)
    }).catch((error) => {
      console.error(error.code, error.message)
    })
  }

  render() {
    return (
      <Layout title="Framed">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ width: '50%', textAlign: 'center' }}>Get the latest design mocks, customer quotes, and more.</h1>
          <Button onClick={() => this.signInWithGoogle()} isLight>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '12px' }}>
              <path d="M19.6032 10.2297C19.6032 9.54989 19.548 8.86644 19.4305 8.19769H9.99817V12.0485H15.3996C15.1755 13.2905 14.4553 14.3891 13.4007 15.0873V17.5859H16.6232C18.5155 15.8442 19.6032 13.2721 19.6032 10.2297Z" fill="#4285F4"/>
              <path d="M9.99814 20C12.6952 20 14.9697 19.1145 16.6268 17.5859L13.4043 15.0873C12.5078 15.6972 11.3503 16.0426 10.0018 16.0426C7.39296 16.0426 5.18094 14.2826 4.38726 11.9162H1.06189V14.492C2.75948 17.8688 6.21714 20 9.99814 20Z" fill="#34A853"/>
              <path d="M4.38362 11.9162C3.96473 10.6743 3.96473 9.32942 4.38362 8.08746V5.51167H1.06192C-0.356415 8.33732 -0.356415 11.6664 1.06192 14.492L4.38362 11.9162Z" fill="#FBBC04"/>
              <path d="M9.99814 3.95738C11.4238 3.93533 12.8017 4.4718 13.8343 5.45655L16.6893 2.60151C14.8815 0.903916 12.4821 -0.029393 9.99814 2.50153e-06C6.21714 2.50153e-06 2.75948 2.13118 1.06189 5.51167L4.38359 8.08745C5.17359 5.71744 7.38928 3.95738 9.99814 3.95738Z" fill="#EA4335"/>
            </svg>
            Login with Google
          </Button>
        </div>
      </Layout>
    )
  }
}

export default Index
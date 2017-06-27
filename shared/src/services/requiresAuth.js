import React from 'react'

/**
 * @Component: React Component which should render if authenticated
 * @redirectPath: String which resolves to a path the user will be redirected to,
 * using an anchor tag
 * @instantRedirect: Boolean where if it's truthy, the user is instantly redirected
 * to the redirect path on unauthentication
**/

export default function requiresAuth(Component, tokenKey, redirectPath, instantRedirect) {
  const notLoggedIn = (
    <div style={{padding: 16}}>
      <p>{redirectPath ? 'Du er ikke logget inn.' : 'Ingen tilgang'}</p>
      {redirectPath ? <p><a href={redirectPath}>Logg inn</a> for å fortsette</p> : null}
    </div>
  )

  class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props)
      this.token = localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey)
      if (!this.token && instantRedirect) {
        this.redirect()
      }
    }

    redirect() {
      window.location.replace(redirectPath)
    }

    logout() {
      this.token = null
      if (instantRedirect) {
        this.redirect()
      }
    }

    render() {
      return (
        <div>
          { this.token
              ? <Component {...this.props}/>
              : notLoggedIn
          }
        </div>
      )
    }
  }

  return AuthenticatedComponent
}

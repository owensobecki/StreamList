
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

function Login({ onLogin }) {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>StreamList</h1>
        <h2>Welcome Back</h2>
        <p>Sign in with Google to access your watchlist.</p>

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (credentialResponse.credential) {
              const userData = jwtDecode(credentialResponse.credential)

              onLogin({
                name: userData.name,
                email: userData.email,
                picture: userData.picture,
              })
            }
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      </div>
    </div>
  )
}

export default Login

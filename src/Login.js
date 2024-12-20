import './App.css'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
// import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const history = useHistory()

  // const navigate = useNavigate()

  const handleChangeUsername = event => {
    setUsername(event.target.value)
  }

  const handleChangePassword = event => {
    setPassword(event.target.value)
  }

  const handleSuccess = jwtToken => {
    setIsError(false)
    setErrorMsg('')
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.push('/')
    // navigate('/')
  }

  const handleFailure = errorMsg => {
    setIsError(true)
    setErrorMsg(errorMsg)
    // setUsername('')
    // setPassword('')
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    try {
      const url = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      // console.log(data)
      if (response.ok === true) {
        handleSuccess(data.jwt_token)
      } else {
        handleFailure(data.error_msg)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>USERNAME</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={handleChangeUsername}
          />
        </div>
        <div>
          <label htmlFor='password'>PASSWORD</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
        {isError && <p>{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login

import React, { useState } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

const LoginForm = () => {
  const [login, setlogin] = useState("")
  const [password, setpassword] = useState("")
  const [auth, setauth] = useState(false)

  const submit = async () => {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    var raw = JSON.stringify({login, password})

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    const f = await fetch(window.URL+"auth", requestOptions)
    const result = await f.json()
    if(result.UserToken){
      localStorage.setItem("UserToken", result.UserToken)
      alert("Успешно")
      setauth(true)
    }else{
      alert(result.message)
    }
  }

  if(auth){
    return <Redirect to="/dashboard" />
  }

  return <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <center>
        <Header as='h2' style={{ color: "#0057b6" }}>
          Войти в аккаунт
        </Header>
      </center>
      <Form size='large'>
        <Segment>
          <div style={{
            margin: 10
          }}>
            <input name="last_name" type="text" placeholder="Логин"
              onChange={(e) => setlogin(e.currentTarget.value)}
            />
          </div>
          <div style={{
            margin: 10
          }}>
            <input name="last_name" type="password" placeholder="Пароль"
              onChange={(e) => setpassword(e.currentTarget.value)}
            />
          </div>
          <Button fluid size='large' style={{
            background: "#0057b6",
            color: "#fff"
          }}
            disabled={!(
              login &&
              password
            )}
            onClick={submit}
          >
            Вход
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
}

export default LoginForm
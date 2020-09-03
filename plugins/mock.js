let MockAdapter = require("axios-mock-adapter");
const atob = require('atob')

export default ({app: { $axios }}) => {
  let mock = new MockAdapter($axios)

  mock.onPost('/login').reply((config) => {
    const data = JSON.parse(config.data)

    let userName = data.email.replace(/@.*$/, '')
    let token = btoa(JSON.stringify({name: userName, email: data.email}))
    let user = {
      email: data.email,
      name: userName
    }

    return [200, { user, token }]
  })

  mock.onGet('/whoami').reply( (config) => {
    if(!config || !config.headers || !config.headers.Authorization || !config.headers.Authorization.length) {
      return [200, {
        status: 'Unauthorized'
      }];
    }

    const token = config.headers.Authorization.split(' ')[1]

    const user = JSON.parse(atob(token))

    return [200, {
      user: {
        email: user.email,
        name: user.name
      }
    }]
  })
}

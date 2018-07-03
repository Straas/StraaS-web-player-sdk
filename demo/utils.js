/* eslint-disable no-console, quotes, no-fallthrough */
window.env = env
window.getConfig = getConfig
window.renderClient = renderClient
window.renderDist = renderSDK
window.testOk = testOk

window.StraaS = (window.StraaS || {})

window.config = window.getConfig()
window.renderDist()
window.renderClient()

logMessage(`
  在網址以 QueryString 指定 iframeHost 例如 "iframeHost=http://app-dev.straas.io:3000"
  可以讓你測試不同環境的 iframe script。
`)

logMessage(`
  在網址以 QueryString 指定 version 例如 "version=1.0.0"
  可以讓你測試不同版本的 player-sdk 與 iframe.js。
`)

function renderSDK() {
  const dist = document.createElement('script')
  dist.id = 'dist'

  if (!document.querySelector('#dist')) {
    dist.src = window.config.distScriptSrc
    document.body.appendChild(dist)
  }
}

function renderClient() {
  if (!window.config.target) {
    logMessage(`
      在網址以 QueryString 方式標記你要加載的範本，語法 "?target=" 例如 "?target=liveend"
      target 可選參數：{events, liveend, ...}
      更多可選詳見 demo 目錄下子目錄。
    `)
    return
  }

  window.axios.get(`./${window.config.target}/index.html`)
    .then(res => {
      document.querySelector('#view').innerHTML = res.data
    })
    .then(() => window.axios.get(`./${window.config.target}/index.es.js`))
    .then(res => {
      logCode(res.data)
      const foo = window.babel(res.data)

      const script = document.createElement('script')
      script.innerHTML = foo.code

      document.querySelector('#view').appendChild(script)
    })
    .catch(console.error.bind(console))
}

function getConfig() {
  const qsConfig = window.Qs.parse(location.search.replace(/[?]/, ''))
  const defaultEnv = 'production'
  const state = {
    version: qsConfig.version || null,
    target: qsConfig.target,
    env: qsConfig.env || defaultEnv,
    iframeHost: qsConfig.iframeHost || null,
  }

  window.StraaS.iframeHost = state.iframeHost

  switch (qsConfig.env) {
    case 'development':
      state.distScriptSrc = `../../../dist/${state.version}/player-sdk.js`
      break
    case 'staging':
      state.distScriptSrc = 'https://app.straas.net/sdk//player-sdk.js'
      break
    default:
      logMessage(`
        在網址以 QueryString 方式標記你要加載的環境，語法 "?env=" 例如 "?env=development"}
        env 可選參數：{development, production, staging}
        若沒有選取環境，默認為 production
      `)
    case 'production':
      state.distScriptSrc = 'https://app.straas.net/sdk//player-sdk.js'
      break
  }

  return state
}

function testOk(context) {
  const testsExists = !!document.querySelector('#tests')
  if (!testsExists) {
    const div = document.createElement('div')
    div.id = 'tests'
    document.body.appendChild(div)
  }

  const span = document.createElement('span')
  span.classList.add(context)
  span.innerHTML = `${context} ok`
  document.querySelector('#tests').appendChild(span)
}

function env(env) {
  const qsConfig = window.Qs.parse(location.search.replace(/[?]/, ''))
  qsConfig.env = env

  location.search = window.Qs.stringify(qsConfig)
}

function element(html, elementType = 'div') {
  const el = document.createElement(elementType)
  el.innerHTML = html
  return el
}

function logCode(html) {
  const el = element(html, 'pre')
  el.classList.add('alert')
  el.classList.add('alert-info')

  document.querySelector('#logs').appendChild(el)
}

function logMessage(message) {
  const messageTrimmed = message
    .replace(/[\n]/g, '<br>')
    .replace(/<br><br>/, '')
    .replace(/^(?:<br>)/, '')
    .replace(/([\s]{2,}|[\t]*)/g, '')

  const el = element(messageTrimmed)
  el.classList.add('alert')
  el.classList.add('alert-warning')

  document.querySelector('#logs').appendChild(el)
}

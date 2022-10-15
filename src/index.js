import './global.css'
import App from './app'

if (module.hot) {
  // This is for hot reloading used in DEV
  module.hot.accept()
}
ReactDOM.render(<App />, document.getElementById('app'))

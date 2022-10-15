import Questions from './components/QuestionsComponent'
import Welcome from './components/Welcome'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/questions" exact component={Questions} />
          <Route path="/" exact component={Welcome} />
        </Switch>
      </div>
    </Router>
  )
}

export default App

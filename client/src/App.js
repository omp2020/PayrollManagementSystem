import "./App.css"
import Login from "./components/Login"
import Admin from "./components/admin/Admin"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ChangePassword from "./components/ChangePassword"
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/employee">
            <Admin />
          </Route>
          <Route path="/changePassword">
            <ChangePassword />
          </Route>
          <Route path="*">
            <h1>404 Page Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App

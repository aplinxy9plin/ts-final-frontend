import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// screens
import VacanciesList from './screens/VacanciesList'
import Login from './screens/Login'
import AddVacancy from "./screens/AddVacancy";
import Dashboard from './screens/Dashboard';
import Dashboard2 from './screens/Dashboard2';
import Dashboard3 from './screens/Dashboard3';
import Dashboard4 from './screens/Dashboard4';
import Users from './screens/Users';

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/add_vacancy">
            <AddVacancy />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/dash2">
            <Dashboard2 />
          </Route>
          <Route path="/dash3">
            <Dashboard3 />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Dashboard4 />
          </Route>
          {/* <Route path="/">
            <VacanciesList />
          </Route> */}
        </Switch>
    </Router>
  )
}
import { Route } from 'react-router-dom'
import React from 'react'

// Top Level Containers
import Home from './app/containers/home'
import Dashboard from './app/containers/Dashboard'

import Register from './agents/containers/Register'
import SignIn from './agents/containers/SignIn'
import LogOut from './agents/containers/LogOut'

import TaskWorker from './tasks/containers/TaskWorker'

import {
  SignOut
} from 'dogstack-agents/components'
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated,
  UserIsAuthenticatedOrHome
} from 'dogstack-agents/hoc'
import {
  getIsAuthenticated,
  getIsNotAuthenticated
} from 'dogstack-agents/getters'

export default [
  {
    name: 'home',
    path: '/',
    exact: true,
    Component: Home,
    selector: getIsNotAuthenticated,
    navigation: {
      title: 'app.home',
      icon: 'fa fa-home'
    }
  },
  {
    name: 'dashboard',
    path: '/',
    exact: true,
    Component: Dashboard,
    selector: getIsAuthenticated,
    navigation: {
      title: 'app.dashboard',
      icon: 'fa fa-dashboard'
    }
  },
  {
    name: 'signIn',
    path: '/sign-in',
    Component: UserIsNotAuthenticated(SignIn),
    navigation: {
      title: 'agents.signIn',
      selector: getIsNotAuthenticated,
      icon: 'fa fa-sign-in'
    }
  },
  {
    name: 'logOut',
    navigation: {
      Component: LogOut,
      selector: getIsAuthenticated,
      icon: 'fa fa-sign-out'
    }
  },
  {
    name: 'register',
    path: '/register',
    Component: UserIsNotAuthenticated(Register),
    navigation: {
      title: 'agents.register',
      selector: getIsNotAuthenticated,
      icon: 'fa fa-heart'
    }
  },
  {
    name: 'task',
    path: '/tasks/:taskPlanId',
    Component: UserIsAuthenticated(TaskWorker)
  }
]

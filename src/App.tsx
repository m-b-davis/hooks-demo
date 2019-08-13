import React from 'react';
import './App.css';

import { useRoutes, HookRouter, usePath } from 'hookrouter';
import { StateClassComponent } from './state/StateClassComponent';
import { LifeCycleWrapper } from './lifecycle/LifeCycleWrapper';

import { Sidebar } from './components/Sidebar';
import { Paper, makeStyles, Typography } from '@material-ui/core';
import { LifeCycleClassComponent } from './lifecycle/LifeCycleClassComponent';

type SuperRoute = {
  name: string;
  path: string;
  render: () => React.ReactNode;
} 

const defaultRoute = { name: 'Home', path: '*', render: () => <div>Open the sidebar to start</div> };

export const routes = [
  { name: 'State - Class Component', path: '/state/class', render: () => <StateClassComponent /> },
  { name: 'Lifecycle - Class Component', path: '/lifecycle/class', render: () => <LifeCycleWrapper child={LifeCycleClassComponent} /> },
  // { name: 'State - Functional Component', path: '/state/fc', render: () => <StateFunctionalComponent /> },
  // { name: 'Lifecycle - Functional Component', path: '/lifecycle/fc', render: () => <LifeCycleWrapper child={LifeCycleFunctionalComponent} /> },

  defaultRoute,
];

const deriveHookRouterRoutes = (routes: SuperRoute[]): HookRouter.RouteObject => {
  return routes.reduce((acc, next) => ({
    ...acc,
    [next.path]: next.render 
  }), {});
}

const useStyles = makeStyles({
  page: {
    width: '768px',
    margin: 'auto',
    padding: '1rem',
  },
});
    
const App = () => {
  const hookRoutes = deriveHookRouterRoutes(routes);
  const routeResult = useRoutes(hookRoutes);
  const classes = useStyles();

  const currentPath = usePath();
  const { name: title } = routes.find(route => currentPath === route.path) || defaultRoute;

  return (
    <div>
      <Sidebar />
      <Paper className={classes.page}>
        <Typography variant="h3" gutterBottom>{title}</Typography>
        {routeResult || <p>Route not found!</p>}
      </Paper>
    </div>
  );
}

export default App;

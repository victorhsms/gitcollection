import React from 'react';
import { Route as Switch, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Repo } from '../pages/Repo';

export const Routes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route element={ <Dashboard /> } path="/" />
      <Route element={ <Repo /> } path="/repositories/:repository" />
    </Switch>
  );
};



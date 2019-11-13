import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import NewStudent from '~/pages/Students/NewStudent';
import EditStudent from '~/pages/Students/EditStudent';

import Plan from '~/pages/Plan/';
import NewPlan from '~/pages/Plan/NewPlan';
import EditPlan from '~/pages/Plan/EditPlan';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/student/new" component={NewStudent} isPrivate />
      <Route path="/student/:id/edit" component={EditStudent} isPrivate />

      <Route path="/plans" exact component={Plan} isPrivate />
      <Route path="/plan/new" component={NewPlan} isPrivate />
      <Route path="/plan/:id/edit" component={EditPlan} isPrivate />
    </Switch>
  );
}

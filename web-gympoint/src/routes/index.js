import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Students from '~/pages/Students';
import NewStudent from '~/pages/Students/NewStudent';
import EditStudent from '~/pages/Students/EditStudent';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/student/new" component={NewStudent} isPrivate />
      <Route path="/student/:id/edit" component={EditStudent} isPrivate />
    </Switch>
  );
}

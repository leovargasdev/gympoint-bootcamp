import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Student';
import NewStudent from '~/pages/Student/NewStudent';
import EditStudent from '~/pages/Student/EditStudent';

import Plan from '~/pages/Plan/';
import NewPlan from '~/pages/Plan/NewPlan';
import EditPlan from '~/pages/Plan/EditPlan';

import Enrollment from '~/pages/Enrollment/';
import NewEnrollment from '~/pages/Enrollment/NewEnrollment';
// import EditEnrollment from '~/pages/Enrollment/EditEnrollment';

import HelpOrder from '~/pages/HelpOrder';

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

      <Route path="/enrollments" exact component={Enrollment} isPrivate />
      <Route path="/enrollment/new" component={NewEnrollment} isPrivate />
      {/* <Route path="/enrollment/:id/edit" component={EditEnrollment} isPrivate /> */}

      <Route path="/help-orders" exact component={HelpOrder} isPrivate />
    </Switch>
  );
}

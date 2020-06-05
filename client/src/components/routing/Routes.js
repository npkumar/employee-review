import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import EmployeeForm from '../employee/EmployeeForm';
import Employees from '../employees/Employees';
import Employee from '../employee/Employee';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import Reviews from '../reviews/Reviews';
import Review from '../review/Review';
import UpdateReviewForm from '../reviews/UpdateReviewForm';

const Routes = () => (
  <section className="container">
    <Alert />
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />

      <Route exact path="/employees" component={Employees} />
      <Route exact path="/employee/:id" component={Employee} />
      <PrivateRoute exact path="/create-employee" component={EmployeeForm} />
      <PrivateRoute exact path="/edit-employee/:id" component={EmployeeForm} />

      <PrivateRoute exact path="/reviews" component={Reviews} />
      <PrivateRoute exact path="/reviews/:id" component={Review} />
      <PrivateRoute exact path="/edit-review/:id" component={UpdateReviewForm} />
      <Route component={NotFound} />
    </Switch>
  </section>
);

export default Routes;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import EmployeeAbout from './EmployeeAbout';
import { getEmployeeById } from '../../actions/employee';

const Employee = ({ getEmployeeById, employee: { employee }, auth, match }) => {
  useEffect(() => { getEmployeeById(match.params.id) }, [getEmployeeById, match.params.id]);

  return (
    <>
      {employee === null ? (
        <Spinner />
      ) : (
        <>
          <Link to="/employees" className="btn btn-success">
            Back To Employees
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === employee.user._id && (
              <Link to={`/edit-employee/${employee.user._id}`} className="btn btn-dark ml-3">
                Edit Employee
              </Link>
            )}
          <div className="my-3">
            <EmployeeAbout employee={employee} />
          </div>
        </>
      )}
    </>
  );
};

Employee.propTypes = {
  getEmployeeById: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  employee: state.employee,
  auth: state.auth
});

export default connect(mapStateToProps, { getEmployeeById })(Employee);

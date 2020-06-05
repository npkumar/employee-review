import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import EmployeeItem from './EmployeeItem';
import { getEmployees } from '../../actions/employee';

const Employees = ({ getEmployees, employee: { employees, loading } }) => {
  useEffect(() => { getEmployees() } , [getEmployees]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h4 className='text-secondary'>Employees</h4>
          <div>
            {employees.length > 0 ? (
              employees.map(employee => (
                <EmployeeItem key={employee._id} employee={employee} />
              ))
            ) : (
              <h4>No employees!</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

Employees.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employee: state.employee
});

export default connect(
  mapStateToProps,
  { getEmployees }
)(Employees);

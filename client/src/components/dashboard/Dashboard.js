import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentEmployee, deleteAccount } from '../../actions/employee';

const Dashboard = ({
  getCurrentEmployee,
  deleteAccount,
  auth: { user },
  employee: { employee }
}) => {
  useEffect(() => {
    getCurrentEmployee();
  }, [getCurrentEmployee]);

  return (
    <div className="container">
      <p className="row">
        <span className="lead"><i className="fas fa-user" /> Hello {user && user.name}</span>
      </p>
      {employee !== null ? (
        <div className="row">
          <div>
            <Link to={`/edit-employee/${employee.user._id}`} className='btn btn-secondary'>
              <i className='fas fa-pen text-white' /> Edit
            </Link>
          </div>

          <div className="ml-3">
            <button className="btn btn-danger" onClick={() => deleteAccount(employee.user._id)}>
              <i className="fas fa-trash" /> Delete
            </button>
          </div>
        </div>
      ) : (
        <>
          <p>Setup employee profile</p>
          <Link to="/create-employee" className="btn btn-secondary my-3">
            Create Employee
          </Link>
        </>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentEmployee: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  employee: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  employee: state.employee
});

export default connect(mapStateToProps, { getCurrentEmployee, deleteAccount })(
  Dashboard
);

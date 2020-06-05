import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEmployee, getEmployeeById } from '../../actions/employee';

const initialState = {
  department: '',
  bio: '',
  userId: ''
};

const EmployeeForm = ({
  employee: { employee, loading },
  createEmployee,
  getEmployeeById,
  history,
  match
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!employee) getEmployeeById(match.params.id);
    if (!loading && employee) {
      setFormData({
        department: employee.department,
        bio: employee.bio,
        userId: employee.user._id
      });
    }
  }, [employee, getEmployeeById, loading, match.params.id]);

  const {
    department,
    bio
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createEmployee(formData, history, employee ? true : false);
  };

  return (
    <>
      <h4 className="text-secondary">Edit Employee Profile</h4>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Department"
            name="department"
            value={department}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="About you"
            name="bio"
            value={bio}
            onChange={onChange}
          />
        </div>

        <input type="submit" className="btn btn-secondary my-3" />
        <Link className="btn btn-success my-3 ml-2" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

EmployeeForm.propTypes = {
  createEmployee: PropTypes.func.isRequired,
  getEmployeeById: PropTypes.func.isRequired,
  employee: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employee: state.employee
});

export default connect(mapStateToProps, { createEmployee, getEmployeeById })(
  EmployeeForm
);

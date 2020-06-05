import React from 'react';
import PropTypes from 'prop-types';

const EmployeeAbout = ({
  employee: {
    bio,
    department,
    user: { name }
  }
}) => (
  <>
    <div className='profile-top bg-light text-dark rounded p-2'>
      <h1>{name}</h1>
      <p className='lead'>
        {department && <span>{department}</span>}
      </p>
      <p>{bio && <span>{bio}</span>}</p>
    </div>
  </>
);

EmployeeAbout.propTypes = {
  employee: PropTypes.object.isRequired
};

export default EmployeeAbout;

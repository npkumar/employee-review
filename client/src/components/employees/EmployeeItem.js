import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount } from '../../actions/employee';

const EmployeeItem = ({
  deleteAccount,
  auth: { user },
  employee: {
    user: { _id, name },
    department
  }
}) => {
  return (
    <div className="card w-100 my-3">
      <div className="card-body">
        <h5 className="card-title">{name} {department && <span> | {department}</span>}</h5>
        <div className="card-text">
          <div className="row">
            <div className="col">
              <Link to={`/employee/${_id}`} className='btn btn-secondary'>
              <i className="fas fa-search" />
              </Link>
              { user && user.isAdmin && (
                <>
                  <Link to={`/edit-employee/${_id}`} className="btn btn-dark ml-3">
                  <i className="fas fa-pen" />
                  </Link>
                  <button className="btn btn-danger ml-3" onClick={() => deleteAccount(_id)}>
                    <i className="fas fa-trash" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EmployeeItem.propTypes = {
  employee: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteAccount })(
  EmployeeItem
);
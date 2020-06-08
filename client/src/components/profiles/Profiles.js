import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Spinner from '../layout/Spinner';
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className = 'large text-primary'>Member</h1>
          <p className = 'lead'>
            <i class="fa fa-connectdevelop" aria-hidden="true" />
            Browse and Follow with Member
          </p>
          <div className="profiles">
            {
              profiles.length > 0 ? (
                profiles.map(profile => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ): (
                <h4>No Profiles Found...</h4>
              )
            }
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired, // snippet ptfr
  profile: PropTypes.object.isRequired // snippet ptor
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)

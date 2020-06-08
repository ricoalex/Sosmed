import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteComment } from '../../actions/post'

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
  <div class='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
            <img className='round-img' src={avatar} alt='' />
            <h3>{name}</h3>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p>
            Post on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={e=> deleteComment(postId, _id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fa fa-times' />
          </button>
        )}
      </div>
  </div>
)

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem);

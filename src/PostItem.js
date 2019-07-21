import React from "react";
import PropTypes from 'prop-types';
import "./PostItem.css";
import like from "./images/like-default.png";

function PostItem(props) {
  const handleClick = () => {
    props.onVote(props.post.id);
  };
  const { post } = props;
  return (
    <li className='item'>
      <div className='title'>
        {post.title}
      </div>
      <div>
        创建人：<span>{post.author}</span>
      </div>
      <div>
        创建时间：<span>{post.date}</span>
      </div>
      <div className='like'>
         <span><img alt='vote' src={like} onClick={handleClick} /></span>
         <span>{post.vote}</span>
      </div>
    </li>
  );
}

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string,
    vote: PropTypes.number
  }).isRequired,
  onVote: PropTypes.func.isRequired
}

export default PostItem;

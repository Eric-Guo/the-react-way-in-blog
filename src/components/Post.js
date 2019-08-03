import React, { Component } from "react";
import PostView from "./PostView";
import { get } from "../utils/request";
import url from "../utils/url";
import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      editing: false
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.refreshPost = this.refreshPost.bind(this);
  }

  componentDidMount() {
    this.refreshPost();
  }

  // 获取帖子详情
  refreshPost() {
    const postId = this.props.match.params.id;
    get(url.getPostById(postId)).then(data => {
      if (!data.error && data.length === 1) {
        this.setState({
          post: data[0]
        });
      }
    });
  }

  // 让帖子处于编辑态
  handleEditClick() {
    this.setState({
      editing: true
    });
  }

  render() {
    const { post } = this.state;
    const { userId } = this.props;
    if (!post) {
      return null;
    }
    const editable = userId === post.author.id;
    return (
      <div className="post">
          <PostView
            post={post}
            editable={editable}
            onEditClick={this.handleEditClick}
          />
      </div>
    );
  }
}

export default Post;

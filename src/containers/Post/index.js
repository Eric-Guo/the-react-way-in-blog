import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PostEditor from "./components/PostEditor";
import PostView from "./components/PostView";
import CommentList from "./components/CommentList";
import { getLoggedUser } from "../../redux/modules/auth";
import { actions as postActions } from "../../redux/modules/posts";
import { actions as commentActions } from "../../redux/modules/comments";
import { actions as uiActions, isEditDialogOpen } from "../../redux/modules/ui";
import { getPostDetail, getCommentsWithAuthors } from "../../redux/modules";
import "./style.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handlePostSave = this.handlePostSave.bind(this);
    this.handlePostCancel = this.handlePostCancel.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  componentDidMount() {
    const postId = this.props.match.params.id;
    this.props.fetchPost(postId);
    this.props.fetchComments(postId);
  }

  // 让帖子处于编辑态
  handleEditClick() {
    this.props.openEditDialog();
  }

  // 保存帖子
  handlePostSave(data) {
    const id = this.props.match.params.id;
    this.props.updatePost(id, data);
  }

  // 取消编辑帖子
  handlePostCancel() {
    this.props.closeEditDialog();
  }

  // 提交新建的评论
  handleCommentSubmit(content) {
    const postId = this.props.match.params.id;
    const comment = {
      author: this.props.userId,
      post: postId,
      content: content
    };
    this.props.createComment(comment);
  }

  render() {
    const { post, comments, user, isEditDialogOpen } = this.props;
    if (!post) {
      return null;
    }
    const editable = (post.author === null || (post.author && user.userId === post.author.id));
    return (
      <div className="post">
        {isEditDialogOpen ? (
          <PostEditor
            post={post}
            onSave={this.handlePostSave}
            onCancel={this.handlePostCancel}
          />
        ) : (
          <PostView
            post={post}
            editable={editable}
            onEditClick={this.handleEditClick}
          />
        )}
        <CommentList
          comments={comments}
          editable={Boolean(user.userId)}
          onSubmit={this.handleCommentSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: getLoggedUser(state),
    post: getPostDetail(state, props.match.params.id),
    comments: getCommentsWithAuthors(state, props.match.params.id),
    isEditDialogOpen: isEditDialogOpen(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(postActions, dispatch),
    ...bindActionCreators(commentActions, dispatch),
    ...bindActionCreators(uiActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);

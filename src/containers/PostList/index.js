import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PostsView from "./components/PostsView";
import PostEditor from "../Post/components/PostEditor";
import { post } from "../../utils/request";
import url from "../../utils/url";
import { getLoggedUser } from "../../redux/modules/auth";
import { actions as postActions } from "../../redux/modules/posts";
import { actions as uiActions, isAddDialogOpen } from "../../redux/modules/ui";
import { getPostListWithAuthors } from "../../redux/modules";
import "./style.css";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newPost: false
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllPosts();  // 获取帖子列表
  }

  // 保存帖子
  handleSave(data) {
    // 当前登录用户的信息和默认的点赞数，同帖子的标题和内容，共同构成最终待保存的帖子对象
    const postData = { ...data, author: this.props.userId, vote: 0 };
    post(url.createPost(), postData).then(data => {
      if (!data.error) {
        // 保存成功后，刷新帖子列表
        this.props.fetchAllPosts();
      }
    });
  }

  // 取消新建帖子
  handleCancel() {
    this.setState({
      newPost: false
    });
  }

  // 新建帖子
  handleNewPost() {
    this.props.openAddDialog();
  }

  render() {
    const { posts, user, isAddDialogOpen } = this.props;
    return (
      <div className="postList">
        <div>
          <h2>话题列表</h2>
          {user.userId ? (
            <button onClick={this.handleNewPost}>发帖</button>
          ) : null}
        </div>
        {isAddDialogOpen ? (
          <PostEditor onSave={this.handleSave} onCancel={this.handleCancel} />
        ) : null}
        <PostsView posts={posts}/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: getLoggedUser(state),
    posts: getPostListWithAuthors(state),
    isAddDialogOpen: isAddDialogOpen(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(postActions, dispatch),
    ...bindActionCreators(uiActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);

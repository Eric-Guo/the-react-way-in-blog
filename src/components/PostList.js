import React, { Component } from "react";
import { get } from "../utils/request";
import url from "../utils/url";
import PostItem from "./PostItem";
import "./PostList.css";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
    this.refreshPostList = this.refreshPostList.bind(this);
  }

  componentDidMount() {
    this.refreshPostList();
  }

  // 获取帖子列表
  refreshPostList() {
    // 调用后台API获取列表数据，并将返回的数据设置到state中
    get(url.getPostList()).then(data => {
      if (!data.error) {
        this.setState({
          posts: data
        });
      }
    });
  }

  render() {
    const { userId } = this.props;
    return (
      <div className="postList">
        <div>
          <h2>帖子列表</h2>
           {/* 只有在登录状态，才显示发帖按钮 */}
          {userId ? <button>发帖</button> : null}
          <ul>
            {this.state.posts.map(item =>
              <PostItem
                key = {item.id}
                post = {item}
              />
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default PostList;

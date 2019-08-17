import { combineReducers } from "redux";
import { get } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";

const initialState = {
  byId: {},
  allIds: []
};

// action types
export const types = {
  CREATE_POST: "POSTS/CREATE_POST",         //新建帖子
  UPDATE_POST: "POSTS/UPDATE_POST",         //修改帖子
  FETCH_ALL_POSTS: "POSTS/FETCH_ALL_POSTS"  //获取帖子列表
};

// action creators
export const actions = {
  // 获取帖子列表
  fetchAllPosts: () => {
    return (dispatch, getState) => {
      if (shouldFetchAllPosts(getState())) {
        dispatch(appActions.startRequest());
        return get(url.getPostList()).then(data => {
          dispatch(appActions.finishRequest());
          if (!data.error) {
            const { posts, postsIds, authors } = convertPostsToPlain(data);
            dispatch(fetchAllPostsSuccess(posts, postsIds, authors));
          } else {
            dispatch(appActions.setError(data.error));
          }
        });
      }
    };
  }
};

// 获取帖子列表成功
const fetchAllPostsSuccess = (posts, postIds, authors) => ({
  type: types.FETCH_ALL_POSTS,
  posts,
  postIds,
  users: authors
});

const shouldFetchAllPosts = state => {
  return !state.posts.allIds || state.posts.allIds.length === 0;
};

const convertPostsToPlain = posts => {
  let postsById = {};
  let postsIds = [];
  let authorsById = {};
  posts.forEach(item => {
    postsById[item.id] = { ...item, author: item.author.id };
    postsIds.push(item.id);
    if (!authorsById[item.author.id]) {
      authorsById[item.author.id] = item.author;
    }
  });
  return {
    posts: postsById,
    postsIds,
    authors: authorsById
  };
};

// reducers
const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case types.FETCH_ALL_POSTS:
      return action.postIds;
    default:
      return state;
  }
};

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case types.FETCH_ALL_POSTS:
      return action.posts;
    default:
      return state;
  }
};

const reducer = combineReducers({
  allIds,
  byId
});

export default reducer;

// selectors
export const getPostIds = state => state.posts.allIds;

export const getPostById = (state, id) => state.posts.byId[id];

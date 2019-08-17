import { types as postTypes } from "./posts";

const initialState = {};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 获取评论列表和帖子列表时，更新列表数据中包含的所有作者信息
    case postTypes.FETCH_ALL_POSTS:
      return { ...state, ...action.users };
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getUserById = (state, id) => {
  return state.users[id];
};

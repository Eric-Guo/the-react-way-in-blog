import { types as postTypes } from "./posts";

const initialState = {
  addDialogOpen: false,
  editDialogOpen: false
};

// action types
export const types = {
  OPEN_ADD_DIALOG: "UI/OPEN_ADD_DIALOG",    // 打开新建帖子状态
  CLOSE_ADD_DIALOG: "UI/CLOSE_ADD_DIALOG",  // 关闭新建帖子状态
};

// action creators
export const actions = {
  // 打开新建帖子的编辑框
  openAddDialog: () => ({
    type: types.OPEN_ADD_DIALOG
  }),
  // 关闭新建帖子的编辑框
  closeAddDialog: () => ({
    type: types.CLOSE_ADD_DIALOG
  }),
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_ADD_DIALOG:
      return { ...state, addDialogOpen: true };
    case types.CLOSE_ADD_DIALOG:
    case postTypes.CREATE_POST:
      return { ...state, addDialogOpen: false };
    case postTypes.UPDATE_POST:
      return { ...state, editDialogOpen: false };
    default:
      return state;
  }
};

export default reducer;

// selectors
export const isAddDialogOpen = state => {
  return state.ui.addDialogOpen;
};

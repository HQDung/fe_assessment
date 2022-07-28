export const initialState = {
  posts: [],
  categories: {},
  getPostsLoading: false,
  getPostsError: undefined
};

export default function appReducer(state = initialState, { type, data }) {
  switch (type) {
    case "GET_POSTS_REQUEST": {
      return {
        ...state,
        getPostsLoading: true,
        getPostsError: undefined
      };
    }
    case "GET_POSTS_SUCCESS": {
      const { categories, posts } = data;
      return {
        ...state,
        getPostsLoading: false,
        posts,
        categories
      };
    }
    case "GET_POSTS_FAILED": {
      return {
        ...state,
        getPostsLoading: false,
        getPostsError: data
      };
    }
    default:
      return state;
  }
}
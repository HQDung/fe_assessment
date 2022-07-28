import * as postServices from "../services/post";

export const getPosts = () => async dispatch => {
  try {
    dispatch({ type: "GET_POSTS_REQUEST" });
    const response = await postServices.getposts();
    const json = await response.json();
    let postsCategories = [], posts = [];
    json.posts.forEach(p => {
      postsCategories.push(p.categories);
      const postCategories = p.categories.map(c => c.name);
      p.categories = postCategories;
      posts.push(p)
    });
    const categories = postsCategories.flat().reduce((value, acc) => {
      const cateName = acc.name.trim();
      if (!value.includes(cateName))
        value.push(cateName);
      return value
    }, [])
    dispatch({ type: "GET_POSTS_SUCCESS", data: { categories, posts } })
  } catch (err) {
    dispatch({
      type: "GET_POSTS_FAILED",
      data: err
    });
  }
}
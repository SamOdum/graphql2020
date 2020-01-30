const postsData = [{
  id: 1,
  createdOn: 10-01-2020,
  tags: ['tech', 'coding', 'beginner', 'graphql,'],
  title: 'The first post in a long line of posts',
  body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aspernatur porro error? Reiciendis autem possimus, quidem officiis nisi cumque libero voluptas? Iure ducimus id impedit deserunt sunt recusandae officiis magnam?Nemo neque corrupti itaque excepturi soluta illo ad laudantium, esse magni voluptas blanditiis ea nihil expedita eligendi eveniet atque veniam nam harum maxime accusantium temporibus fugiat quaerat. Et, eos adipisci.',
}];
function validatePost(post) {
  if (!(post.title && post.body)) {
    throw new Error('Post must have a title and a body');
  }
}
// get all posts
function getAll() {
  return postsData;
}
// save a new post
function save(post) {
  validatePost(post);
  const newPost = post;
  const lastPost = postsData[postsData.length - 1] || { id: 0 };
  const lastPostId = lastPost.id;
  newPost.id = lastPostId + 1;
  postsData.push(post);
  return post;
}

// get post by id
function getById(postId) {
  const post = postsData.filter(item => item.id === postId);
  if (post.length === 0) {
    throw new Error(`Post id: ${postId} not found`);
  }
  return post[0];
}

// delete post by id
function deleteById(postId) {
  const postIndex = postsData.findIndex(item => item.id === postId);
  if (postIndex === -1) {
    throw new Error(`Post id: ${postId} not found`);
  }
  postsData.splice(postIndex, postIndex + 1);
  return { id: postId };
}

module.exports = {
  getAll,
  save,
  getById,
  deleteById,
};
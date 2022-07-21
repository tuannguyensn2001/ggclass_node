const { emitToRoom } = require("../socket");

exports.getNewPost = (post) => {
  console.log(post);
  const { classId } = post;
  emitToRoom(`class-${classId}-newsfeed`, "create-post", post);
};

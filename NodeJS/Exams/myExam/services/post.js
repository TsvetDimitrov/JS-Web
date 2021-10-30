const Post = require('../models/Post');
const User = require('../models/User');


async function createPost(postData, userId) {
    const post = new Post(postData);
    const user = await User.findById(userId);

    user.myPosts.push(post);
    await post.save();
    await user.save();
    return post;
}

async function getAllPosts() {
    const posts = await Post.find({}).lean();

    return posts;
}

async function getPostById(id) {
    const post = await Post.findById(id).lean();

    return post;
}

async function editPost(id, postData) {
    const post = await Post.findById(id);

    post.keyword = postData.keyword;
    post.title = postData.title;
    post.location = postData.location;
    post.dateCreated = postData.dateCreated;
    post.imageUrl = postData.imageUrl;
    post.description = postData.description;
    return post.save();
}

async function deletePost(id) {
    return Post.findByIdAndDelete(id);
}

async function getUserPosts(ids) {
    return await Post.find({ '_id': { $in: ids } }).lean();
}


async function downVote(postId, userId) {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (user._id == post.owner) {
        throw new Error('You cannot vote your own post!');
    }
    post.totalLikes -= 1;
    post.votesOnPost.push(user);

    return post.save();
}


async function upvote(postId, userId) {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (user._id == post.owner) {
        throw new Error('You cannot vote your own post!');
    }
    post.totalLikes += 1;
    post.votesOnPost.push(user);

    return post.save();
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    editPost,
    deletePost,
    getUserPosts,
    downVote,
    upvote
}
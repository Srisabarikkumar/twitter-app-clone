import Notification from "../models/notification.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate({
      path: "user",
      select: "-password"
    })
    .populate({
      path: "comments.user",
      select: "-password"
    });

    if (posts.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    const following = user.following;

    const followingPosts = await Post.find({ user: { $in: following } })
    .sort({ createdAt: -1 })
    .populate({
      path: "user",
      select: "-password"
    })
    .populate({
      path: "comments.user",
      select: "-password"
    });

    res.status(200).json(followingPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (!text && !img) {
      return res.status(400).json({ error: "Post must have text or image" });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newPost = new Post({
      user: userId,
      text,
      img,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: "User not found" });

    const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 })
    .populate({
      path: "user",
      select: "-password"
    })
    .populate({
      path: "comments.user",
      select: "-password"
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id.toString();

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Unlike the post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

      const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
      res.status(200).json(updatedLikes);
    } else {
      // Like the post
      post.likes.push(userId)
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();
      
      const likeNotification = new Notification({
        type: "like",
        from: userId,
        to: post.user,
      });

      await likeNotification.save();
      const updatedLikes = post.likes;
      res.status(200).json(updatedLikes);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLikedPosts = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
    .populate({
      path: "user",
      select: "-password"
    })
    .populate({
      path: "comments.user",
      select: "-password"
    });

    res.status(200).json(likedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });   
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { text } = req.body;

    const userId = req.user._id.toString();

    if (!text) return res.status(400).json({ error: "Text field is required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = {
      text,
      user: userId,
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete this post" });
    }

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
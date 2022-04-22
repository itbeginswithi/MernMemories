import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPost = async (req, res) => {
    const {id} = req.params;
    
    try { 
        const post = await PostMessage.findById(id)
        return res.status(200).json(post)
    }catch(error){ 
        res.status(404).json({message: error})
    }
}
  
export const getPosts = async (req, res, next) => {
    const {page} = req.query;
    
    try { 
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT; //getting the start index of every page
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex); //newest post first
        return res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})
    }catch(error){ 
        res.status(404).json({message: error})
    }
}

export const createPost = async (req, res, next) => {
    //with post req u have access to the request.body thanks to body-parser
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
        await newPost.save()
        res.status(201).json(newPost);
    }catch(error){
        res.status(409).json({message: error.message})
    }
}

export const updatePost = async (req, res) => { 
    const {id: _id} = req.params;
    const post = req.body;

    //I like
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post with that id")
    
    //true to receive the updated version of the post
    //calls to the server must be rpeceded by an await
    const updatedPost =  await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true})
    res.json(updatedPost)
}

export const deletePost = async (req, res) => { 
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post with that id")
    
    await PostMessage.findByIdAndDelete(_id)
    res.json({message: 'Post deleted successfully'})
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}

export const getPostsBySearch = async (req, res) => { 
    console.log('hi')
    const {searchQuery, tags} = req.query;
    console.log(searchQuery, tags)

    try {
        const title = new RegExp(searchQuery, 'i'); // Test test TEST -> test
        const data = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json(data)
    } catch (error) {
        res.status(404).json({error: error})
    }
}


export const commentPost = async (req, res) => { 
    const {id} = req.params;
    const {value} = req.body;

    const post = await PostMessage.findById(id);
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.status(200).json(updatedPost);
}
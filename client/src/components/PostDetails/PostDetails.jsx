import React from "react";
import {Typography, Paper, CircularProgress, Divider} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {useParams, useNavigate} from 'react-router-dom';

import useStyles from "./styles";
import { useEffect } from "react";
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from './CommentSection/CommentSection';

const PostDetails = () => {
  const classes = useStyles();
  const {post, posts, isLoading} = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams(); 
  
  useEffect(() => {
    dispatch(getPost(id));
  }, [id])

  // useEffect(() => {
  //   if(post){ 
  //     dispatch(getPostsBySearch({search: '', tags: post?.tags.join(',')}));
  //   }
  //   console.log(post);
  // }, [post])


  const openPost = (id) => {
    navigate(`/posts/${id}`);
  }

  
  if(isLoading) return (
    <Paper className={classes.loadingPaper} elevation={6}>
      <CircularProgress size="7em"/>
    </Paper>
  ) 
  
  if(!post) return null;

  const recommendedPosts = posts.filter(({_id}) => _id !== post._id);

  return (
    <Paper style={{padding: '20px', borderRadius: '15px'}}>
      <div className={classes.card}>
        <div className={classes.section}> 
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags?.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post}/>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider/>
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({title, message, name, selectedFile, _id, likes}) => (
              <div style={{margin: '20px', cursor: 'pointer'}} onClick={() => openPost(_id)} key={_id}>
                <Typography variant="h6" gutterBottom>{title}</Typography>
                <Typography variant="subtitle2" gutterBottom>{name}</Typography>
                <Typography variant="subtitle2" gutterBottom>{message}</Typography>
                <Typography variant="subtitle1" gutterBottom>{likes.length}</Typography>
                <img src={selectedFile} width="200px"/>
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;

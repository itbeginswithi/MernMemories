import React from "react";
import { useSelector } from "react-redux";
import {Grid, CircularProgress, Container} from '@material-ui/core';

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({currentId, setCurrentId}) => {
  const {posts, isLoading} = useSelector((state) => state.posts)
  const classes = useStyles();  
 
  if(!posts.length && !isLoading) return 'No posts';

  return (
    isLoading ? <CircularProgress style={{margin: '0 auto'}}/> : (
      <Grid container className={classes.mainContainer} spacing={3} alignItems="stretch">
        {
          posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Post post={post} currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          ))
        }
      </Grid>
    )
  );
};

export default Posts;

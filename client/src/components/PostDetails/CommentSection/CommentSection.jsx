import React, {useState, useRef} from 'react';
import {Typography, TextField, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';

import useStyles from './styles';
import {commentPost} from '../../../actions/posts'
import { Paper } from '@material-ui/core';

const CommentSection = ({post}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));
  const commentsRef = useRef();

  const handleSubmit = async (e) => { 
    // e.preventDefault();
    const finalComment = `${user.result.name}: ${comment}`
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComment('');  
    setComments(newComments);
    commentsRef.current.scrollIntoView({behavior: 'smooth'})
  }

  
  return (
    <div>
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography variant="h6" gutterBottom>
                    Comments
                </Typography>
                {comments.map((comment, index) => (
                    <Typography key={index}><strong>{comment.split(': ')[0]}</strong> {comment.split(':')[1]}</Typography>
                ))}
                <div ref={commentsRef}/>
            </div>

            <div style={{minWidth: "70%"}}>
            {user?.result?.name ? (
                <>
                    <Typography variant="h6" gutterBottom>
                        Write a comment
                    </Typography>
                    <TextField
                        label="Comment"
                        multiline
                        variant="outlined"
                        minRows={4}
                        fullWidth
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    /> 
                    <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} color="primary" variant="contained" onClick={handleSubmit}>
                        Comment
                    </Button>
                    </> 
            ) : (
                <Paper className={classes.signinPaper} elevation={3}>
                    <Typography variant="body1">Sign in to write a comment</Typography>
                </Paper>
            )
        }
        </div>
        </div>
    </div>
  )
}

export default CommentSection
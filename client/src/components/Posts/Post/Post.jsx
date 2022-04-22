import React, {useState} from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button, 
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import useStyles from "./styles";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);

  const openPost = () => { 
    navigate(`${post._id}`)
  }
  const userId = user?.result?.googleId || user?.result?._id
  const hasLikedPost = post.likes.find((like) => like === userId);


  const handleLike = () => { 
    dispatch(likePost(post._id)) 
    if(hasLikedPost){
      setLikes(post.likes.filter(id => id !== userId))
    }else{ 
      setLikes([...likes, userId])
    }
  }
  
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  return (
    <Card className={classes.card} raised elevation={6}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.tite}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
          <Button style={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag, i) => `#${tag} `)}
          </Typography>
        </div>
        <ButtonBase className={classes.cardAction} onClick={openPost} component="span">
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post.title}
          </Typography>
        </ButtonBase>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
            {post.message.length < 250 ? post.message : post.message.slice(0, 250) + '...'}
          </Typography>
        </CardContent> 
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={handleLike} disabled={!user?.result}>
            <Likes/>
          </Button>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize="small"/> Delete
            </Button>
          )}
        </CardActions>
    </Card>
  );
};
      
export default Post;

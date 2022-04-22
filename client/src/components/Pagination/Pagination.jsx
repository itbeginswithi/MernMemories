import React, {useEffect} from "react";
import { Paper } from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {getPosts} from '../../actions/posts'
 
import useStyles from "./styles";

const Paginate = ({page}) => {
  const {numberOfPages}  = useSelector(state => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();
  
  useEffect(() => { 
    if(page) dispatch(getPosts(page))
  }, [page])

  return (
    <Paper className={classes.paper} elevation={6}>
      <Pagination
        classes={{ ul: classes.ul }} 
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        count={numberOfPages}
        renderItem={(item) => {
          return (
            <PaginationItem
              {...item}
              component={Link}
              to={`/posts?page=${item.page}`}
            />
          );
        }}
      />
    </Paper>
  );
};

export default Paginate;

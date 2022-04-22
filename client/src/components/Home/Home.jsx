import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Form, Posts } from "../index";
import {getPostsBySearch} from '../../actions/posts';
import { Container, Grid, Grow, AppBar, TextField, Button } from "@material-ui/core";
// import ChipInput from 'material-ui-chip-input';
import {useNavigate, useLocation} from 'react-router-dom';
import useStyles from './styles';
import { Pagination } from "../";

//* To know on which page we are currently on 
//* and what search term we are looking for
const useQuery = () => { 
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState('') 
  const [tags, setTags] = useState([])
  const classes = useStyles();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const searchPost = () => { 
    if(search.trim() || tags){
      dispatch(getPostsBySearch({search, tags: tags.join(',')}))
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    }else{ 
      navigate('/')
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13){
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appSearchBar} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {/* <ChipInput 
                style={{margin: '10px 0'}}
                value={tags.map(t => t)}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              /> */}
              <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Pagination page={page}/>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;

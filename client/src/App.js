import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
 
import {Navbar, Home, Auth, PostDetails} from "./components";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Navigate to='/posts' replace/>}/>
          <Route path="/posts" exact element={<Home/>}/>
          <Route path="/posts/search" exact element={<Home/>}/>
          <Route path="/posts/:id" element={<PostDetails/>}/>
          <Route path="/auth" exact element={!user ? <Auth/> : <Navigate to="/posts" />}/>
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
import { Box, Card, CardContent, CardMedia, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetching blog posts from the server
    axios
      .get("http://localhost:3001/posts") // Adjust the endpoint as per your API
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/posts/${id}") // Delete endpoint
      .then(() => {
        setPosts(posts.filter(post => post.id !== id)); // Update state after deletion
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: "white" }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">BlogApp</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 2 }}>
        {posts.map((post) => (
          <Card key={post.id} sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image={post.img_url}
              alt={post.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.content}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: 1 }}>
              <Button variant="contained" color="error" onClick={() => handleDelete(post.id)}>
                DELETE
              </Button>
              <Button variant="contained" color="primary">
                UPDATE
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
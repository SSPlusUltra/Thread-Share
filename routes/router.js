const express = require('express')
const router =express.Router()
const schemas = require('../models/schemas')

router.post('/subreddits', async(req,res)=>{
    const { title, date, description, id, members } = req.body;

    const subredditdata = {title:title, date:date, description:description, id:id, members:members}

    const newSubreddits = new schemas.Subreddits(subredditdata)

    const saveSubreddits = await newSubreddits.save()

    console.log(saveSubreddits);

    if(saveSubreddits){
        res.send('subreddits saved. Zankuu')
    }

   res.end();

});



router.post('/posts', async (req, res) => {
    const {id, title, description, subreddit, vote, upvotepressed, downvotepressed, members} = req.body;

    const posts = {id:id, title:title, description: description, subreddit:subreddit, vote:vote, upvotepressed:upvotepressed, downvotepressed:downvotepressed, members:members}

    const newPosts = new schemas.Posts(posts)

    const savePosts = await newPosts.save();

    if(savePosts){
        res.send('posts saved. Zankuu')
    }

   res.end();
})


router.post('/comments', async(req,res)=>{
    const{pid, Timeago, text, author, cid} = req.body;

    const comments = {pid: pid, Timeago:Timeago, text:text, author:author, cid:cid}

    const newComments = new schemas.Comments(comments)

    const saveComments = await newComments.save();

    if(saveComments){
        res.send('comments saved. Zankuu')
    }

res.end();
})

router.post('/users', async(req,res)=>{
  const{name, id, onlineStatus,createdFrom, signedinFrom, following, followers} = req.body;

  const users = {name:name, id:id, onlineStatus:onlineStatus,createdFrom: createdFrom, signedinFrom: signedinFrom,  following:following, followers: followers}

  const newUsers = new schemas.Users(users)

  const saveUsers = await newUsers.save();

  if(saveUsers){
      res.send('users saved. Zankuu')
  }

res.end();
})

router.get('/subreddits', async (req, res) => {
    try {
      const subreddits = await schemas.Subreddits.find(); // Assuming Subreddits is your model
  
      res.status(200).json(subreddits);
    } catch (error) {
      console.error('Error fetching subreddits:', error);
      res.status(500).json({ error: 'An error occurred while fetching subreddits.' });
    }
  });
  
  router.get('/posts', async (req, res) => {
    try {
      const posts = await schemas.Posts.find(); // Assuming Posts is your model
  
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'An error occurred while fetching posts.' });
    }
  });

  router.get('/comments', async (req, res) => {
    try {
      const comments = await schemas.Comments.find(); // Assuming Comments is your model
  
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'An error occurred while fetching comments.' });
    }
  });


  router.get('/users', async (req, res) => {
    try {
      const users = await schemas.Users.find(); // Assuming Comments is your model
  
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'An error occurred while fetching comments.' });
    }
  });
  
  router.get('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
  
    try {
      const post = await schemas.Posts.findOne({pid:postId}); // Assuming Posts is your model
  
      if (!post) {
        // If no post is found with the given ID, return a 404 Not Found response
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'An error occurred while fetching the post.' });
    }
  });
  

  router.put('/posts/:postId', async (req, res) => {
    const postId = req.params.postId;
    const updateData = req.body;
  
    try {
      const updatedPost = await schemas.Posts.findOneAndUpdate({pid:postId}, updateData, { new: true });
  
      if (!updatedPost) {
        // If no post is found with the given ID, return a 404 Not Found response
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'An error occurred while updating the post.' });
    }
  });
  
  router.get('/subreddits/:subId', async (req, res) => {
    const subId = req.params.subId;
  
    try {
      const subr = await schemas.Subreddits.findOne({id:subId}); // Assuming Posts is your model
  
      if (!subr) {
        // If no post is found with the given ID, return a 404 Not Found response
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(subr);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'An error occurred while fetching the post.' });
    }
  });

  router.get('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const usr = await schemas.Users.findOne({id:userId}); // Assuming Posts is your model
  
      if (!usr) {
        // If no post is found with the given ID, return a 404 Not Found response
        return res.status(404).json({ error: 'user not found' });
      }
  
      res.status(200).json(usr);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'An error occurred while fetching the post.' });
    }
  });
  
  router.put('/subreddits/:subId', async (req, res) => {
    const subId = req.params.subId;
    const updateData = req.body;
  
    try {
      const updatedsub = await schemas.Subreddits.findOneAndUpdate({id:subId}, updateData, { new: true });
  
      if (!updatedsub) {
        // If no post is found with the given ID, return a 404 Not Found response
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(updatedsub);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'An error occurred while updating the post.' });
    }
  });

  router.post('/upload', async(req, res)=>{
    const {temp, user} = req.body;
    try{
      schemas.Images.create({image: temp, user: user})

      res.send({Status:"ok"})
    }

   catch(err){
    res.send({Status:"error"})
   }

res.end();
  });

  router.get('/upload', async (req, res) => {
    try {
      const images = await schemas.Images.find(); // Assuming Comments is your model
  
      res.status(200).json(images);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'An error occurred while fetching comments.' });
    }
  });

  router.delete('/subreddits/delete/:subId', async (req, res) => {
    const subId = req.params.subId;
  
    try {
      // Use findOneAndDelete to find and delete the subreddit with the given ID
      const deletedSub = await schemas.Subreddits.findOneAndDelete({ id: subId });
  
      if (!deletedSub) {
        // If no subreddit is found with the given ID, return a 404 Not Found response
        return res.status(404).json({ error: 'Subreddit not found' });
      }
  
      res.status(200).json(deletedSub);
    } catch (error) {
      console.error('Error deleting subreddit:', error);
      res.status(500).json({ error: 'An error occurred while deleting the subreddit.' });
    }
  });

  router.put('/users/:userId', async (req, res) => {
    const userId = req.params.userId;
    const updateData = req.body;
  
    try {
      const updatedUser = await schemas.Users.findOneAndUpdate({id:userId}, updateData, { new: true });
  
      if (!updatedUser) {
        // If no post is found with the given ID, return a 404 Not Found response
        return res.status(404).json({ error: 'user not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
  });

  router.put('/upload/:userId', async (req, res) => {
    const userId = req.params.userId;
    const updateData = req.body;
  
    try {
      const updatedImage = await schemas.Images.findOneAndUpdate({user:userId}, updateData, { new: true, upsert: true });
  
      if (!updatedImage) {
        // If no post is found with the given ID, return a 404 Not Found response
        return res.status(404).json({ error: 'user not found' });
      }
  
      res.status(200).json(updatedImage);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
  });




module.exports = router;
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const subredditSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    members: {
        type: Map,
        of: Boolean,
        required: true,
        default: { 'initial': true },
    }
});




const postSchema = new mongoose.Schema({
    pid: {
        type: String,
        default: uuidv4,
    },
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    subreddit: {
        type: String,
        default: '',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    vote: {
        type: Number,
        default: 0,
    },
    upvotepressed: {
        type: Map,
        of: Boolean,
        default: { 'initial': true },
    },
    downvotepressed: {
        type: Map,
        of: Boolean,
        default: { 'initial': true },
    },
    members: {
        type: Map,
        of: Boolean,
        default: { 'initial': true },
    },
});


const CommentSchema = new mongoose.Schema({
    pid: {
        type: String,
        required: true,
    },
    Timeago: {
        type: Date,
        required: true,
       
    },
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
});

const comments = mongoose.model('Comments', CommentSchema, 'comments')
const posts = mongoose.model('Posts', postSchema, 'posts')
const subreddits = mongoose.model('Subreddits', subredditSchema, 'subreddits')



const mySchemas = {'Comments':comments, 'Posts':posts, 'Subreddits':subreddits}

module.exports = mySchemas
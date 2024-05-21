
const express = require('express')
const userroute = express.Router();
const controllers = require('../controllers/controllers');
const { Module } = require('module');

  userroute.get('/home', controllers.gethome)
    .get('/welcome', controllers.gethome)
    .get('/login', controllers.getlogin)
    .get('/signup', controllers.getsignup)

    .post('/login', controllers.postlogin)
    .post('/signup', controllers.postsignup)

    module.exports=userroute;
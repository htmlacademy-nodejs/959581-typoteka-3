'use strict';

const { Router } = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.render(`pages/my`));
myRouter.get(`/comments`, (req, res) => res.render(`pages/comments`));
myRouter.get(`/categories`, (req, res) => res.render(`pages/all-categories`));

module.exports = myRouter;

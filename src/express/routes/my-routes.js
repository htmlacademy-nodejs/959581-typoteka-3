'use strict';

const { Router } = require(`express`);

const api = require(`../api`).getAPI();
const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`pages/my`, { articles: articles.slice(0, 5) });
});
myRouter.get(`/comments`, async (req, res) => {
  const comments = await api.getComments();
  res.render(`pages/comments`, { comments });
});
myRouter.get(`/categories`, (req, res) => res.render(`pages/all-categories`));

module.exports = myRouter;

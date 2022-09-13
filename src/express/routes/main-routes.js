'use strict';

const { Router } = require(`express`);

const mainRouter = new Router();
const api = require(`../api`).getAPI();

mainRouter.get(`/`, async (req, res) => {
  const [categories, comments, articles] = await Promise.all([
    api.getCategories(),
    api.getComments(),
    api.getArticles(),
  ]).catch((err) => console.log(err));

  res.render(`pages/main`, {
    categories,
    comments: comments.slice(0, 3),
    articles,
    topArticles: articles.slice(0, 4),
  });
});
mainRouter.get(`/login`, (req, res) => res.render(`pages/login`));
mainRouter.get(`/register`, (req, res) => res.render(`pages/sign-up`));
mainRouter.get(`/search`, async (req, res) => {
  const { query } = req.query;

  if (!query) {
    res.render(`pages/search`);
    return;
  }

  try {
    const articles = await api.searchArticle(query);
    res.render(`pages/search`, { query, articles });
  } catch (error) {
    res.render(`pages/search`, { query, articles: [] });
  }
});

module.exports = mainRouter;

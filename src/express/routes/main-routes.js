'use strict';

const { Router } = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.render(`pages/main`));
mainRouter.get(`/login`, (req, res) => res.render(`pages/login`));
mainRouter.get(`/register`, (req, res) => res.render(`pages/sign-up`));
mainRouter.get(`/search`, (req, res) => res.render(`pages/search`));

module.exports = mainRouter;

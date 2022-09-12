'use strict';

const express = require(`express`);
const path = require(`path`);

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const articlesRoutes = require(`./routes/articles-routes`);
const { HttpCode } = require(`../constants`);

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;

const app = express();

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use((req, res) => res.status(HttpCode.BAD_REQUEST).render(`pages/errors/404`));

app.use((err, _req, res, _next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`pages/errors/500`);
  console.log(err);
});

app.listen(process.env.PORT || DEFAULT_PORT);

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

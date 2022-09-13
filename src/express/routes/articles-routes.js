'use strict';

const { Router } = require(`express`);
const multer = require(`multer`);
const { nanoid } = require(`nanoid`);
const path = require(`path`);
const { ensureArray } = require(`../../utils`);

const articlesRouter = new Router();
const api = require(`../api`).getAPI();

const UPLOAD_DIR = `../upload/img/`;
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);
const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const upload = multer({ storage });

articlesRouter.get(`/category/:id`, (req, res) => res.render(`pages/articles-by-category`));
articlesRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  res.render(`pages/post`, { categories });
});
articlesRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
  const { body, file } = req;

  const articleData = {
    picture: file ? file.filename : ``,
    title: body.title,
    createdDate: body.date,
    category: ensureArray(body.categories),
    announce: body.announcement,
    fullText: body[`full-text`],
  };

  try {
    const article = await api.createArticle(articleData);
    res.redirect(`/articles/${article.id}`);
  } catch (error) {
    res.redirect(`back`);
  }
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const { id } = req.params;
  const [article, categories] = await Promise.all([api.getArticle(id), api.getCategories()]);

  res.render(`pages/post`, { article, categories });
});

articlesRouter.get(`/:id`, async (req, res) => {
  const { id } = req.params;

  try {
    const article = await api.getArticle(id);
    res.render(`pages/post-detail`, { article, categories: article.сategory });
  } catch (error) {
    res.status(error.response.status).render(`errors/404`);
  }
});

module.exports = articlesRouter;

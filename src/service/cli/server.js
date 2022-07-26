'use strict';

const express = require(`express`);
const {Router} = express;
const fs = require(`fs`).promises;
const {DEFAULT_PORT, MOCKS_PATH} = require(`../../constants`);

const app = express();
const mainRoutes = new Router();

const onResponsePosts = async (req, res) => {
  try {
    const mocksFile = await fs.readFile(MOCKS_PATH);
    const mocksJson = JSON.parse(mocksFile);
    res.json(mocksJson);
  } catch (err) {
    res.send([]);
  }
};

app.use(express.json());
app.use(`/`, mainRoutes);
mainRoutes.get(`/posts`, (req, res) => onResponsePosts(req, res));

module.exports = {
  name: `--server`,
  run(args) {
    const [userPort] = args;

    const port = parseInt(userPort, 10) || DEFAULT_PORT;
    app.listen(port);
  }
};

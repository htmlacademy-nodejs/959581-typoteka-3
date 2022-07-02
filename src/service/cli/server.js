'use strict';

const http = require(`http`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {DEFAULT_PORT, HttpCode, MOCKS_PATH} = require(`../../constants`);

const wrapTemplate = (markup) => {
  const template = `
  <!Doctype html>
    <html lang="ru">
    <head>
      <title>Typoteka</title>
    </head>
    <body>
      ${markup}
    </body>
  </html>`.trim();

  return template;
};

const writeBaseHeader = (res) => {
  res.writeHead(HttpCode.SUCCESS, {
    'Content-Type': `text/html; charset=UTF-8`
  });
};

const onClientServer = async (req, res) => {
  const TEXT_NOT_FOUND = `Not found`;

  switch (req.url) {
    case `/` :
      writeBaseHeader(res);

      try {
        const mocksFile = await fs.readFile(MOCKS_PATH);
        const mocks = JSON.parse(mocksFile);
        const titles = mocks.map((article) => `<li>${article.title}</li>`).join(``);

        res.end(wrapTemplate(`<ul>${titles}</ul>`));
      } catch (error) {
        console.log(chalk.red(error));
        res.end(wrapTemplate(TEXT_NOT_FOUND));
      }

      break;
    default:
      writeBaseHeader(res);

      res.end(wrapTemplate(TEXT_NOT_FOUND));
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [userPort] = args;

    const port = parseInt(userPort, 10) || DEFAULT_PORT;

    http.createServer(onClientServer)
      .listen(port)
      .on(`listening`, () => {
        console.log(chalk.green(`Ожидаю соединений на ${port}`));
      })
      .on(`error`, ({message}) => {
        console.log(chalk.red(`Ошибка при создании сервера: ${message}`));
      });
  }
};

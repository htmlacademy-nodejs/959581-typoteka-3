'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {random, range, shuffle} = require(`lodash`);

const {ExitCode} = require(`../../constants`);

const OUTPUT_FILE_NAME = `mocks.json`;
const MS_IN_THREE_MONTH = 7889400000;
const MIN_COUNT_CATEGORY = 1;
const TextFilePath = {
  CATEGORIES: `./data/categories.txt`,
  SENTENCES: `./data/sentences.txt`,
  TITLE: `./data/titles.txt`
};
const InputData = {
  MAX_COUNT: 1000,
  DEFAULT_COUNT: 1,
};
const TextCount = {
  MIN: 1,
  MAX_ANNOUNCE: 5,
};

const getRandomDate = () => {
  const dateNow = Date.now();
  const startDate = dateNow - MS_IN_THREE_MONTH;
  const randomDate = new Date(random(startDate, dateNow)).toISOString();

  return randomDate;
};

const generateArticles = ({count, sentences, categories, titles}) => {
  const getAnnounce = () => {
    const maxCountAnnounce = random(TextCount.MIN + 1, TextCount.MAX_ANNOUNCE);
    return shuffle(sentences).slice(TextCount.MIN, maxCountAnnounce).join(` `);
  };
  const getFullText = () => {
    const maxCountFullText = random(TextCount.MIN + 1, sentences.length);
    return shuffle(sentences).slice(TextCount.MIN, maxCountFullText).join(` `);
  };
  const getRandomCategories = () => {
    const maxCountCategories = random(MIN_COUNT_CATEGORY + 1, categories.length);
    return shuffle(categories).slice(MIN_COUNT_CATEGORY, maxCountCategories);
  };

  return range(count).map(() => {
    return {
      title: shuffle(titles)[0],
      createdDate: getRandomDate(),
      announce: getAnnounce(),
      fullText: getFullText(),
      сategory: getRandomCategories()
    };
  });
};

const readTextFile = async (path) => {
  let data = [];
  try {
    data = await fs.readFile(path, {encoding: `utf-8`});
    return data.trim().split(`\n`);
  } catch (error) {
    console.log(chalk.red(`Can't read file...`));
  }

  return data;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countArticles = Number.parseInt(count, 10) || InputData.DEFAULT_COUNT;

    if (countArticles > InputData.MAX_COUNT) {
      console.log(chalk.red(`Не больше 1000 публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const sentences = await readTextFile(TextFilePath.SENTENCES);
    const titles = await readTextFile(TextFilePath.TITLE);
    const categories = await readTextFile(TextFilePath.CATEGORIES);

    const articles = generateArticles({count: countArticles, sentences, titles, categories});

    try {
      await fs.writeFile(OUTPUT_FILE_NAME, JSON.stringify(articles, null, 2));
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.SUCCESS);
    } catch (error) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.ERROR);
    }

  }
};

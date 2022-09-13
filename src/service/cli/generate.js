'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const { nanoid } = require(`nanoid`);
const { random, range, shuffle } = require(`lodash`);

const { ExitCode, MOCKS_PATH } = require(`../../constants`);

const ID_LENGTH = 6;
const MS_IN_THREE_MONTH = 7889400000;
const CountCategory = {
  MIN: 1,
  MAX: 3,
};
const TextFilePath = {
  CATEGORIES: `./data/categories.txt`,
  SENTENCES: `./data/sentences.txt`,
  TITLE: `./data/titles.txt`,
  COMMENTS: `./data/comments.txt`,
};
const InputData = {
  MAX_COUNT: 1000,
  DEFAULT_COUNT: 3,
};
const TextCount = {
  MIN: 1,
  MAX_ANNOUNCE: 5,
};
const CommentsSetting = {
  MIN_SENTENCES: 3,
  MAX_SENTENCES: 7,
  MIN_COUNT: 3,
  MAX_COUNT: 6,
};

const getRandomDate = () => {
  const dateNow = Date.now();
  const startDate = dateNow - MS_IN_THREE_MONTH;
  const randomDate = new Date(random(startDate, dateNow)).toISOString();

  return randomDate;
};

const generateArticles = ({ count, sentences, categories, titles, comments }) => {
  const getAnnounce = () => {
    const maxCountAnnounce = random(TextCount.MIN + 1, TextCount.MAX_ANNOUNCE);
    return shuffle(sentences).slice(TextCount.MIN, maxCountAnnounce).join(` `);
  };
  const getFullText = () => {
    const maxCountFullText = random(TextCount.MIN + 1, sentences.length);
    return shuffle(sentences).slice(TextCount.MIN, maxCountFullText).join(` `);
  };
  const getRandomCategories = () => {
    const maxCountCategories = random(CountCategory.MIN + 1, CountCategory.MAX);
    return shuffle(categories).slice(CountCategory.MIN, maxCountCategories);
  };
  const getComments = () => {
    const countComments = random(CommentsSetting.MIN_COUNT, CommentsSetting.MAX_COUNT);
    const countSentences = random(CommentsSetting.MIN_SENTENCES, CommentsSetting.MAX_SENTENCES);

    const getComment = () => {
      const text = [
        ...new Set(
          range(countSentences).map(() => {
            const randomSentenceIndex = random(comments.length - 1);
            return comments[randomSentenceIndex];
          }),
        ),
      ].join(` `);

      return {
        id: nanoid(ID_LENGTH),
        text,
      };
    };

    return range(countComments).map(() => getComment());
  };

  return range(count).map(() => {
    return {
      title: shuffle(titles)[0],
      createdDate: getRandomDate(),
      announce: getAnnounce(),
      fullText: getFullText(),
      category: getRandomCategories(),
      id: nanoid(ID_LENGTH),
      comments: getComments(),
    };
  });
};

const readTextFile = async (path) => {
  let data = [];
  try {
    data = await fs.readFile(path, { encoding: `utf-8` });
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
    const comments = await readTextFile(TextFilePath.COMMENTS);

    const articles = generateArticles({
      count: countArticles,
      sentences,
      titles,
      categories,
      comments,
    });

    try {
      await fs.writeFile(MOCKS_PATH, JSON.stringify(articles, null, 2));
      console.log(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.SUCCESS);
    } catch (error) {
      console.log(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.ERROR);
    }
  },
};

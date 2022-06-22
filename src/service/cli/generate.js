'use strict';

const fs = require(`fs`);
const {random, range, shuffle} = require(`lodash`);

const {ExitCode} = require(`../../constants`);

const OUTPUT_FILE_NAME = `mocks.json`;
const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];
const TEXTS = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];
const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];
const MS_IN_THREE_MONTH = 7889400000;
const InputData = {
  MAX_COUNT: 1000,
  DEFAULT_COUNT: 1,
};
const TextCount = {
  MIN: 1,
  MAX_ANNOUNCE: 5,
};
const MIN_COUNT_CATEGORY = 1;

const getRandomDate = () => {
  const dateNow = Date.now();
  const startDate = dateNow - MS_IN_THREE_MONTH;
  const randomDate = new Date(random(startDate, dateNow)).toISOString();

  return randomDate;
};

const generateArticles = (count) => {
  const getAnnounce = () => {
    const maxCountAnnounce = random(TextCount.MIN + 1, TextCount.MAX_ANNOUNCE);
    return shuffle(TEXTS).slice(TextCount.MIN, maxCountAnnounce).join(` `);
  };
  const getFullText = () => {
    const maxCountFullText = random(TextCount.MIN + 1, TEXTS.length);
    return shuffle(TEXTS).slice(TextCount.MIN, maxCountFullText).join(` `);
  };
  const getRandomCategories = () => {
    const maxCountCategories = random(MIN_COUNT_CATEGORY + 1, CATEGORIES.length);
    return shuffle(CATEGORIES).slice(MIN_COUNT_CATEGORY, maxCountCategories);
  };

  return range(count).map(() => {
    return {
      title: shuffle(TITLES)[0],
      createdDate: getRandomDate(),
      announce: getAnnounce(),
      fullText: getFullText(),
      сategory: getRandomCategories()
    };
  });
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countArticles = Number.parseInt(count, 10) || InputData.DEFAULT_COUNT;

    if (countArticles > InputData.MAX_COUNT) {
      console.log(`Не больше 1000 публикаций`);
      process.exit(ExitCode.ERROR);
    }

    const articles = JSON.stringify(generateArticles(countArticles));

    fs.writeFile(OUTPUT_FILE_NAME, articles, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.ERROR);
      }

      console.info(`Operation success. File created.`);
      process.exit(ExitCode.SUCCESS);
    });
  }
};

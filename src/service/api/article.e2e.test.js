'use strict';

const express = require(`express`);
const request = require(`supertest`);

const article = require(`./article`);
const DataService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

const { HttpCode } = require(`../../constants`);

const mockData = [
  {
    title: `Рок — это протест`,
    createdDate: `2022-05-25T13:28:59.148Z`,
    announce: `Ёлки — это не просто красивое дерево. Это прочная древесина. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Это один из лучших рок-музыкантов. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    fullText: `Собрать камни бесконечности легко, если вы прирожденный герой. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Это один из лучших рок-музыкантов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    category: [`За жизнь`],
    id: `fMMcdk`,
    comments: [
      {
        id: `wG8MSx`,
        text: `Это где ж такие красоты? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему? Согласен с автором!`,
      },
      {
        id: `tPIJHy`,
        text: `Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему? Согласен с автором!`,
      },
      {
        id: `HTj814`,
        text: `Это где ж такие красоты? Хочу такую же футболку :-)`,
      },
      {
        id: `N2u8Qj`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то? Согласен с автором!`,
      },
    ],
  },
  {
    title: `Ёлки. История деревьев`,
    createdDate: `2022-06-13T08:50:56.830Z`,
    announce: `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    fullText: `Достичь успеха помогут ежедневные повторения. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Как начать действовать? Для начала просто соберитесь. Программировать не настолько сложно, как об этом говорят.`,
    category: [`Железо`, `Кино`, `Программирование`],
    id: `Vvvjfl`,
    comments: [
      {
        id: `5X4Q2H`,
        text: `Хочу такую же футболку :-) Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
      },
      {
        id: `2TalqY`,
        text: `Планируете записать видосик на эту тему? Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то? Это где ж такие красоты?`,
      },
      {
        id: `tenxFu`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то? Планируете записать видосик на эту тему? Плюсую, но слишком много буквы!`,
      },
      {
        id: `UtchBh`,
        text: `Совсем немного... Это где ж такие красоты? Плюсую, но слишком много буквы! Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
      {
        id: `cH36g9`,
        text: `Хочу такую же футболку :-) Это где ж такие красоты? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
    ],
  },
  {
    title: `Как собрать камни бесконечности`,
    createdDate: `2022-07-28T13:20:14.579Z`,
    announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    fullText: `Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Как начать действовать? Для начала просто соберитесь. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Он написал больше 30 хитов. Достичь успеха помогут ежедневные повторения. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Золотое сечение — соотношение двух величин, гармоническая пропорция. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Ёлки — это не просто красивое дерево. Это прочная древесина. Простые ежедневные упражнения помогут достичь успеха. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Собрать камни бесконечности легко, если вы прирожденный герой. Это один из лучших рок-музыкантов.`,
    category: [
      `Разное`,
      `Без рамки`,
      `Железо`,
      `Кино`,
      `Музыка`,
      `За жизнь`,
      `IT`,
      `Программирование`,
    ],
    id: `OZThck`,
    comments: [
      {
        id: `ZLEiuv`,
        text: `Хочу такую же футболку :-) Плюсую, но слишком много буквы! Согласен с автором! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного... Мне кажется или я уже читал это где-то?`,
      },
      {
        id: `b6Rtiv`,
        text: `Хочу такую же футболку :-) Плюсую, но слишком много буквы! Мне кажется или я уже читал это где-то? Согласен с автором! Планируете записать видосик на эту тему?`,
      },
      {
        id: `XpYIjj`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему? Плюсую, но слишком много буквы! Мне кажется или я уже читал это где-то? Это где ж такие красоты?`,
      },
    ],
  },
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  article(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all articles`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.SUCCESS));

  test(`Returns a list of 3 articles`, () => expect(response.body.length).toBe(3));

  test(`First article's id equals "fMMcdk"`, () => expect(response.body[0].id).toBe(`fMMcdk`));
});

describe(`API returns an article with given id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/fMMcdk`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.SUCCESS));

  test(`Article's title is "Рок — это протест"`, () =>
    expect(response.body.title).toBe(`Рок — это протест`));
});

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    title: `Рок — это протест`,
    createdDate: `2022-05-25T13:28:59.148Z`,
    announce: `Ёлки — это не просто красивое дерево. Это прочная древесина. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Это один из лучших рок-музыкантов. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    fullText: `Собрать камни бесконечности легко, если вы прирожденный герой. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Это один из лучших рок-музыкантов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    category: [`За жизнь`],
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns article created`, () =>
    expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Articles count is changed`, () =>
    request(app)
      .get(`/articles`)
      .expect((res) => expect(res.body.length).toBe(4)));
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500,
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = { ...newArticle };
      delete badArticle[key];
      await request(app).post(`/articles`).send(badArticle).expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent article`, () => {
  const newArticle = {
    title: `Новый заголовок`,
    createdDate: `2022-05-25T13:28:59.148Z`,
    announce: `Ёлки — это не просто красивое дерево. Это прочная древесина. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Это один из лучших рок-музыкантов. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    fullText: `Собрать камни бесконечности легко, если вы прирожденный герой. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Это один из лучших рок-музыкантов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    category: [`За жизнь`],
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).put(`/articles/fMMcdk`).send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.SUCCESS));

  test(`Returns changed article`, () =>
    expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () =>
    request(app)
      .get(`/articles/fMMcdk`)
      .expect((res) => expect(res.body.title).toBe(`Новый заголовок`)));
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const app = createAPI();

  const validArticle = {
    title: `Рок — это протест`,
    createdDate: `2022-05-25T13:28:59.148Z`,
    announce: `Ёлки — это не просто красивое дерево. Это прочная древесина. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Это один из лучших рок-музыкантов. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    fullText: `Собрать камни бесконечности легко, если вы прирожденный герой. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Это один из лучших рок-музыкантов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    category: [`За жизнь`],
  };

  return request(app).put(`/articles/NOEXST`).send(validArticle).expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  const app = createAPI();

  const invalidArticle = {
    title: `Рок — это протест`,
    createdDate: `2022-05-25T13:28:59.148Z`,
    announce: `Ёлки — это не просто красивое дерево. Это прочная древесина. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Это один из лучших рок-музыкантов. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    fullText: `Собрать камни бесконечности легко, если вы прирожденный герой. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Это один из лучших рок-музыкантов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  };

  return request(app).put(`/articles/NOEXST`).send(invalidArticle).expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/fMMcdk`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.SUCCESS));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`fMMcdk`));

  test(`Article count is 2 now`, () =>
    request(app)
      .get(`/articles`)
      .expect((res) => expect(res.body.length).toBe(2)));
});

test(`API refuses to delete non-existent article`, () => {
  const app = createAPI();

  return request(app).delete(`/articles/NOEXST`).expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given article`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/Vvvjfl/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.SUCCESS));

  test(`Returns list of 5 comments`, () => expect(response.body.length).toBe(5));

  test(`First comment's id is "5X4Q2H"`, () => expect(response.body[0].id).toBe(`5X4Q2H`));
});

describe(`API creates a comment if data is valid`, () => {
  const newComment = {
    text: `Валидному комментарию достаточно этого поля`,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/articles/Vvvjfl/comments`).send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns comment created`, () =>
    expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () =>
    request(app)
      .get(`/articles/Vvvjfl/comments`)
      .expect((res) => expect(res.body.length).toBe(6)));
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`,
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {
  const app = createAPI();

  return request(app).post(`/articles/Vvvjfl/comments`).send({}).expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes a comment`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/Vvvjfl/comments/5X4Q2H`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.SUCCESS));

  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`5X4Q2H`));

  test(`Comments count is 4 now`, () =>
    request(app)
      .get(`/articles/Vvvjfl/comments`)
      .expect((res) => expect(res.body.length).toBe(4)));
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app).delete(`/articles/Vvvjfl/comments/NOEXST`).expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent article`, () => {
  const app = createAPI();

  return request(app).delete(`/articles/NOEXST/comments/Vvvjfl`).expect(HttpCode.NOT_FOUND);
});

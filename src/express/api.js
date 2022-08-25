'use strict';

const axios = require(`axios`);

const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
const defaultURL = `http://localhost:${port}/api/`;

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  async _load(url, options) {
    const response = await this._http.request({ url, ...options });
    return response.data;
  }

  async getArticles() {
    return this._load(`/articles`);
  }

  async getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  async getCategories() {
    return this._load(`/categories`);
  }

  async getArticleComments(id) {
    return this._load(`/articles/${id}/comments`);
  }

  async createArticle(data) {
    return this._load(`/articles`, {
      method: `POST`,
      data,
    });
  }

  async createArticleComment(id, data) {
    return this._load(`/articles/${id}/comments`, {
      method: `POST`,
      data,
    });
  }

  async editArticle(id, data) {
    return this._load(`/articles/${id}`, {
      method: `PUT`,
      data,
    });
  }

  async deleteArticle(id) {
    return this._load(`/articles/${id}`, {
      method: `DELETE`,
    });
  }

  async deleteArticleComment(articleId, commentId) {
    return this._load(`/articles/${articleId}/comments/${commentId}`, {
      method: `DELETE`,
    });
  }

  async searchArticle(query) {
    return this._load(`/search`, { params: { query } });
  }
}

const defaultAPI = new API(defaultURL, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI,
};

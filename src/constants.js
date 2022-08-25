'use strict';

module.exports.DEFAULT_COMMAND = `--help`;
module.exports.USER_ARGV_INDEX = 2;
module.exports.ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};
module.exports.HttpCode = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
module.exports.API_PREFIX = `/api`;
module.exports.DEFAULT_PORT = 3000;
module.exports.MOCKS_PATH = `mocks.json`;
module.exports.MAX_ID_LENGTH = 6;
module.exports.Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};

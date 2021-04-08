"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

var _AuthenticateUserService = _interopRequireDefault(require("../../../services/AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;

    const authenticateUser = _tsyringe.container.resolve(_AuthenticateUserService.default);

    const {
      user,
      token
    } = await authenticateUser.execute({
      email,
      password
    });
    const userWithoutPassword = {
      id: user.id,
      avatar_url: user.avatar ? `${process.env.APP_API_URL}/files/${user.avatar}` : null,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
    return response.json({
      user: (0, _classTransformer.classToClass)(user),
      token
    });
  }

}

exports.default = SessionsController;
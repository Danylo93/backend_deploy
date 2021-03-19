"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _UserAvatarController = _interopRequireDefault(require("../controllers/UserAvatarController"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _celebrate = require("celebrate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersControllers = new _UsersController.default();
const usersRouter = (0, _express.Router)();
const upload = (0, _multer.default)(_upload.default.multer);
const userAvatarController = new _UserAvatarController.default();
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), usersControllers.create);
usersRouter.patch('/avatar', _ensureAuthenticated.default, upload.single('avatar'), userAvatarController.update);
var _default = usersRouter;
exports.default = _default;
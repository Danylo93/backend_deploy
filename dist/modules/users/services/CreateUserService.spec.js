"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let fakeCacheProvider;
let createUsers;
describe('CreateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUsers = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('should be able to create a new user', async () => {
    const users = await createUsers.execute({
      name: 'Danylo',
      email: 'john@example.com',
      password: 'danylo93'
    });
    await expect(users).toHaveProperty('id');
  });
  it('should not be able to create a new user with same email from another', async () => {
    await createUsers.execute({
      name: 'Danylo',
      email: 'john@example.com',
      password: 'danylo93'
    });
    await expect(createUsers.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '12345'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});
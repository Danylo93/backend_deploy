"use strict";

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able updatetheprofile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Danylo Oliveira',
      email: 'danylo.oliveira73@gmail.com',
      password: '123456'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Danylo Pereira',
      email: 'danylo.oliveira73@gmail.com'
    });
    expect(updatedUser.name).toBe('Danylo Pereira');
    expect(updatedUser.email).toBe('danylo.oliveira73@gmail.com');
  });
  it('should not be able to update the profile from a non-existing user', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'Test',
      email: 'test@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Danylo Oliveira',
      email: 'danylo.oliveira73@gmail.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Danylo Oliveira',
      email: 'danylo.oliveira73@gmail.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Danylo Oliveira',
      email: 'danylo.oliveira73@gmail.com',
      password: '123456'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Danylo Pereira',
      email: 'danylo.oliveira73@gmail.com',
      old_password: '123456',
      password: '123123'
    });
    expect(updatedUser.password).toBe('123123');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Danylo Oliveira',
      email: 'danylo.oliveira73@gmail.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Danylo Pereira',
      email: 'danylo.oliveira73@gmail.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Danylo Oliveira',
      email: 'danylo.oliveira73@gmail.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Danylo Pereira',
      email: 'danylo.oliveira73@gmail.com',
      old_password: 'wron-old-password',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});
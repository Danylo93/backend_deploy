"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddColumnProviderToUsers1617379033798 = void 0;

var _typeorm = require("typeorm");

class AddColumnProviderToUsers1617379033798 {
  async up(queryRunner) {
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'provider',
      type: 'boolean',
      default: false,
      isNullable: true // Adicionei que ele pode ser null mas nao é o correto isso so para não querbrar o seu registro

    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('users', 'provider');
  }

}

exports.AddColumnProviderToUsers1617379033798 = AddColumnProviderToUsers1617379033798;
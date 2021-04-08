import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddColumnProviderToUsers1617379033798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
              name: 'provider',
              type: 'boolean',
              default: false,
              isNullable: true, // Adicionei que ele pode ser null mas nao é o correto isso so para não querbrar o seu registro
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'provider');
    }

}

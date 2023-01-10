import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddRoleIdToUsersTable1673313376233 implements MigrationInterface {
  readonly column: TableColumn
  readonly foreignKey: TableForeignKey

  constructor() {
    this.column = new TableColumn({
      name: 'roleId',
      type: 'uuid',
      isNullable: true,
    })
    this.foreignKey = new TableForeignKey({
      name: 'UsersRoles',
      columnNames: ['roleId'],
      referencedTableName: 'roles',
      referencedColumnNames: ['id'], // primary key na tabela roles
      onDelete: 'SET NULL', // caso a role registrada com o id de referência seja excluída o roleId será null
    })
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', this.column)
    await queryRunner.createForeignKey('users', this.foreignKey)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', this.foreignKey)
    await queryRunner.dropColumn('users', this.column)
  }
}

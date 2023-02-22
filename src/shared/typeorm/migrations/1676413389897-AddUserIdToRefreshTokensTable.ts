import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddUserIdToRefreshTokensTable1676413389897 implements MigrationInterface {
  readonly column: TableColumn
  readonly foreignKey: TableForeignKey

  constructor() {
    this.column = new TableColumn({
      name: 'userId',
      type: 'uuid',
      isNullable: true,
    })
    this.foreignKey = new TableForeignKey({
      name: 'RefreshTokensUsers',
      columnNames: ['userId'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'], // primary key na tabela users
      onDelete: 'SET NULL', // caso o user registrada com o id de referência seja excluída o userId será null
    })
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('refresh_tokens', this.column)
    await queryRunner.createForeignKey('refresh_tokens', this.foreignKey)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('refresh_tokens', this.foreignKey)
    await queryRunner.dropColumn('refresh_tokens', this.column)
  }
}

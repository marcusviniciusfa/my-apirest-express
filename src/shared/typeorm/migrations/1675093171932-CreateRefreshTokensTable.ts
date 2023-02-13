import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRefreshTokensTable1675093171932 implements MigrationInterface {
  readonly table: Table

  constructor() {
    this.table = new Table({
      name: 'refresh_tokens',
      foreignKeys: [
        {
          name: 'RefreshTokensUsers',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['userId'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'userId',
          type: 'uuid',
        },
        {
          name: 'token',
          type: 'string',
          isUnique: true,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
      ],
    })
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}

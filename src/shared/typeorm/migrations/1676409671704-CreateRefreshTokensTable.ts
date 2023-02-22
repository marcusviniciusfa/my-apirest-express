import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRefreshTokensTable1676409671704 implements MigrationInterface {
  readonly table: Table

  constructor() {
    this.table = new Table({
      name: 'refresh_tokens',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'tokenHash',
          type: 'string',
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

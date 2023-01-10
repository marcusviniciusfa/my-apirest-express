import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersTable1673312143744 implements MigrationInterface {
  readonly table: Table

  constructor() {
    this.table = new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'email',
          type: 'string',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'string',
        },
        {
          name: 'avatar',
          type: 'string',
          isNullable: true,
        },
        {
          name: 'isAdmin',
          type: 'boolean',
          default: false,
        },
        {
          name: 'created_at',
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

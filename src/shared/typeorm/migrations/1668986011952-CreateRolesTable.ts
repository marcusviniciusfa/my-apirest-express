import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRolesTable1668986011952 implements MigrationInterface {
  readonly table: Table

  constructor() {
    this.table = new Table({
      name: 'roles',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'string',
          isUnique: true,
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

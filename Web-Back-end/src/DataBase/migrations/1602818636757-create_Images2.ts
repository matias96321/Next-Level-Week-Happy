import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages21602818636757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "images",
            columns:[
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name:'path',
                    type: 'varchar',
                },
                {
                    name: 'orphanage_id',
                    type: 'integer',

                }
            ],
            foreignKeys: [
                {
                    name: 'ImagesOrphanages',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages',
                    referencedColumnNames:['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
            ],

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images')
    }

}

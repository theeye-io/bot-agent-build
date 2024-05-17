import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Batch, BatchRelations} from '../models';

export class BatchRepository extends DefaultCrudRepository<
  Batch,
  typeof Batch.prototype.id,
  BatchRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Batch, dataSource);
  }

  async create(batch: Omit<Batch, "id">): Promise<any> {
    batch.created_at = new Date()
    batch.updated_at = new Date()
    return await super.create(batch)
  }

  async updateById(id: typeof Batch.prototype.id, batch: Omit<Batch, "id">): Promise<void> {
    batch.updated_at = new Date()
    await super.updateById(id, batch)
  }
}

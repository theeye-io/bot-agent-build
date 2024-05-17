import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Job, JobRelations} from '../models';

export class JobRepository extends DefaultCrudRepository<
  Job,
  typeof Job.prototype.id,
  JobRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Job, dataSource);
  }

  async create(job: Omit<Job, "id">): Promise<any> {
    job.created_at = new Date()
    job.updated_at = new Date()
    return await super.create(job)
  }

  async updateById(id: typeof Job.prototype.id, job: Omit<Job, "id">): Promise<void> {
    job.updated_at = new Date()
    await super.updateById(id, job)
  }
}

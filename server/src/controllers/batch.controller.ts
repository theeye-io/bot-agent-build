import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Batch} from '../models';
import {BatchRepository} from '../repositories';

export class BatchController {
  constructor(
    @repository(BatchRepository)
    public batchRepository : BatchRepository,
  ) {}

  @post('/batches')
  @response(200, {
    description: 'Batch model instance',
    content: {'application/json': {schema: getModelSchemaRef(Batch)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Batch, {
            title: 'NewBatch',
            exclude: ['id'],
          }),
        },
      },
    })
    batch: Omit<Batch, 'id'>,
  ): Promise<Batch> {
    return this.batchRepository.create(batch);
  }

  @get('/batches/count')
  @response(200, {
    description: 'Batch model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Batch) where?: Where<Batch>,
  ): Promise<Count> {
    return this.batchRepository.count(where);
  }

  @get('/batches')
  @response(200, {
    description: 'Array of Batch model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Batch, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Batch) filter?: Filter<Batch>,
  ): Promise<Batch[]> {
    return this.batchRepository.find(filter);
  }

  @patch('/batches')
  @response(200, {
    description: 'Batch PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Batch, {partial: true}),
        },
      },
    })
    batch: Batch,
    @param.where(Batch) where?: Where<Batch>,
  ): Promise<Count> {
    return this.batchRepository.updateAll(batch, where);
  }

  @get('/batches/{id}')
  @response(200, {
    description: 'Batch model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Batch, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Batch, {exclude: 'where'}) filter?: FilterExcludingWhere<Batch>
  ): Promise<Batch> {
    return this.batchRepository.findById(id, filter);
  }

  @patch('/batches/{id}')
  @response(204, {
    description: 'Batch PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Batch, {partial: true}),
        },
      },
    })
    batch: Batch,
  ): Promise<void> {
    await this.batchRepository.updateById(id, batch);
  }

  @put('/batches/{id}')
  @response(204, {
    description: 'Batch PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() batch: Batch,
  ): Promise<void> {
    await this.batchRepository.replaceById(id, batch);
  }

  @del('/batches/{id}')
  @response(204, {
    description: 'Batch DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.batchRepository.deleteById(id);
  }
}

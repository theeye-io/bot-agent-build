import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Batch extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Batch>) {
    super(data);
  }
}

export interface BatchRelations {
  // describe navigational properties here
}

export type BatchWithRelations = Batch & BatchRelations;

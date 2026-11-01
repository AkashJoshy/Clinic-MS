import type {
  BulkWriteDeleteMany,
  BulkWriteDeleteOne,
  BulkWriteInsertOne,
  BulkWriteReplaceOne,
  BulkWriteUpdateMany,
  BulkWriteUpdateOne,
} from "../../../../domain/types/shared.types.ts";

export interface IBulkWriteGenerationService {
  insertOne<T>(data: T): BulkWriteInsertOne<T>;

  insertMany<T>(data: T[]): BulkWriteInsertOne<T>[];

  updateOne<T>(
    filter: Record<string, unknown>,
    update: Partial<T>,
    upsert?: boolean,
  ): BulkWriteUpdateOne<T>;

  updateMany<T>(
    filter: Record<string, unknown>,
    update: Partial<T>,
    upsert?: boolean,
  ): BulkWriteUpdateMany<T>;

  replaceOne<T>(
    filter: Record<string, unknown>,
    data: T,
  ): BulkWriteReplaceOne<T>;

  deleteOne<T>(filter: Record<string, unknown>): BulkWriteDeleteOne;

  deleteMany<T>(filter: Record<string, unknown>): BulkWriteDeleteMany;
}

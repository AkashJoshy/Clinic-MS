import type { IBaseRepository } from "../../../domain/repositories/i-base.repository.ts";
import type {
  Model,
  Document,
  UpdateQuery,
  AnyBulkWriteOperation,
} from "mongoose";
import type {
  BulkWriteOperation,
  QueryOptions,
} from "../../../domain/types/shared.types.ts";

export abstract class BaseRepository<
  TEntity,
  TDocument extends Document,
> implements IBaseRepository<TEntity, TDocument> {
  constructor(protected readonly model: Model<TDocument>) {}

  async findByIdAndUpdate(
    id: string,
    data: Partial<TEntity>,
  ): Promise<TEntity | null> {
    const doc = await this.model.findByIdAndUpdate(
      id,
      { $set: data as any },
      { returnDocument: "after", runValidators: true },
    );
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findById(id: string, options?: QueryOptions): Promise<TEntity | null> {
    let doc = await this.model
      .findById(id)
      .select(options?.select ? options?.select : "");
    return doc ? this.toDomain(doc) : null;
  }

  async save(entity: TEntity): Promise<TEntity> {
    const doc = await this.model.create(this.toPersistence(entity));
    return this.toDomain(doc);
  }

  async find(): Promise<TEntity[]> {
    const docs = await this.model.find();
    if (docs.length <= 0) return [];
    return docs.map((doc) => this.toDomain(doc));
  }

  async findBy(filter: Partial<TEntity>): Promise<TEntity[]> {
    const docs = await this.model.find(filter);
    if (docs.length <= 0) return [];
    return docs.map((doc) => this.toDomain(doc));
  }

  async findOneBy(
    filter: string | Record<string, any>,
  ): Promise<TEntity | null> {
    const query = typeof filter === "string" ? { _id: filter } : filter;
    const doc = await this.model.findOne(query);
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findByIds(field: string, ids: string[]): Promise<TEntity[]> {
    if (!ids.length) return [];

    const queryField = field === "id" ? "_id" : field;
    const docs = await this.model.find({
      [queryField]: { $in: ids },
    });

    return docs.map((doc) => this.toDomain(doc));
  }

  async updateOneById(
    filter: string | Record<string, any>,
    update: UpdateQuery<TDocument>,
  ): Promise<TEntity | null> {
    const query = typeof filter === "string" ? { _id: filter } : filter;
    const doc = await this.model.findOneAndUpdate(
      query as Record<string, any>,
      update,
      { returnDocument: "after" },
    );
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async updateMany(
    filter: string | Record<string, any>,
    update: UpdateQuery<TDocument>,
  ): Promise<void> {
    const query = typeof filter === "string" ? { _id: filter } : filter;
    await this.model.updateMany(query as Record<string, any>, update);
  }

  async bulkWrite(operations: BulkWriteOperation<TDocument>[]): Promise<void> {
    if (!operations.length) return;

    const mongoOperations = operations.map(
      (operation): AnyBulkWriteOperation<any> => {
        if ("insertOne" in operation) {
          return { insertOne: { document: operation.insertOne.document } };
        }

        if ("updateOne" in operation) {
          const { filter, update, upsert } = operation.updateOne;
          return {
            updateOne: {
              filter,
              update: { $set: update },
              ...(upsert !== undefined && { upsert }),
            },
          };
        }

        if ("updateMany" in operation) {
          const { filter, update, upsert } = operation.updateMany;
          return {
            updateMany: {
              filter,
              update: { $set: update },
              ...(upsert !== undefined && { upsert }),
            },
          };
        }

        if ("replaceOne" in operation) {
          return {
            replaceOne: {
              filter: operation.replaceOne.filter,
              replacement: operation.replaceOne.replacement,
            },
          };
        }

        if ("deleteOne" in operation) {
          return { deleteOne: { filter: operation.deleteOne.filter } };
        }

        return { deleteMany: { filter: operation.deleteMany.filter } };
      },
    );

    await this.model.bulkWrite(mongoOperations);
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  protected abstract toDomain(doc: TDocument): TEntity;
  protected abstract toPersistence(entity: TEntity): Partial<TDocument>;
}

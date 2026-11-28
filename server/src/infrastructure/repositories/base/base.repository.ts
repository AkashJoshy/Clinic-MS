import type { IBaseRepository } from "../../../domain/repositories/i-base.repository.ts";
import type {
  Model,
  Document,
  UpdateQuery,
  AnyBulkWriteOperation,
} from "mongoose";
import type {
  BulkWriteOperation,
  PaginatedResult,
  PaginationOptions,
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
    const doc = await this.model
      .findByIdAndUpdate(
        id,
        { $set: data as any },
        { returnDocument: "after", runValidators: true },
      )
      .lean();

    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findById(id: string, options?: QueryOptions): Promise<TEntity | null> {
    let doc = await this.model
      .findById(id)
      .select(options?.select ? options?.select : "")
      .lean();

    return doc ? this.toDomain(doc) : null;
  }

  async save(entity: TEntity): Promise<TEntity> {
    const doc = await this.model.create(this.toPersistence(entity));
    return this.toDomain(doc);
  }

  async find(): Promise<TEntity[]> {
    const docs = await this.model.find().lean();
    if (docs.length <= 0) return [];
    return docs.map((doc) => this.toDomain(doc));
  }

  async paginate(
    filter: Record<string, any>,
    options: PaginationOptions,
  ): Promise<PaginatedResult<TEntity>> {
    const page = Math.max(1, options.page ?? 1);
    const limit = Math.min(100, Math.max(1, options.limit ?? 10));

    const skip = (page - 1) * limit;

    let sortStage: any = options.sort ?? { createdAt: -1 };
    if (typeof options.sort === "string") {
      switch (options.sort) {
        case "NEWEST":
          sortStage = { createdAt: -1 };
          break;
        case "OLDEST":
          sortStage = { createdAt: 1 };
          break;
        case "NAME_ASC":
          sortStage = { name: 1, displayName: 1 };
          break;
        case "NAME_DESC":
          sortStage = { name: -1, displayName: -1 };
          break;
        default:
          sortStage = options.sort;
      }
    }

    const [docs, total] = await Promise.all([
      this.model
        .find(filter)
        .select(options.select ?? "")
        .sort(sortStage)
        .skip(skip)
        .limit(limit)
        .lean(),

      this.model.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: docs.map((doc) => this.toDomain(doc as TDocument)),
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  async findBy(filter: Partial<TEntity>): Promise<TEntity[]> {
    const docs = await this.model.find(filter).lean();

    if (docs.length <= 0) return [];
    return docs.map((doc) => this.toDomain(doc));
  }

  async findOneBy(
    filter: string | Record<string, any>,
  ): Promise<TEntity | null> {
    const query = typeof filter === "string" ? { _id: filter } : filter;
    const doc = await this.model.findOne(query).lean();
    if (!doc) return null;
    return this.toDomain(doc);
  }

  async findByIds(field: string, ids: string[]): Promise<TEntity[]> {
    if (!ids.length) return [];

    const queryField = field === "id" ? "_id" : field;
    const docs = await this.model
      .find({
        [queryField]: { $in: ids },
      })
      .lean();

    return docs.map((doc) => this.toDomain(doc));
  }

  async updateOneById(
    filter: string | Record<string, any>,
    update: UpdateQuery<TDocument>,
  ): Promise<TEntity | null> {
    const query = typeof filter === "string" ? { _id: filter } : filter;
    const doc = await this.model
      .findOneAndUpdate(query as Record<string, any>, update, {
        returnDocument: "after",
      })
      .lean();

    if (!doc) return null;
    return this.toDomain(doc);
  }

  async updateMany(
    filter: string | Record<string, any>,
    update: UpdateQuery<TDocument>,
  ): Promise<void> {
    const query = typeof filter === "string" ? { _id: filter } : filter;
    await this.model.updateMany(query as Record<string, any>, update).lean();
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
    await this.model.findByIdAndDelete(id).lean();
  }

  protected abstract toDomain(doc: TDocument): TEntity;
  protected abstract toPersistence(entity: TEntity): Partial<TDocument>;
}

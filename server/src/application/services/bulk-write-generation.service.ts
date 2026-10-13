import type {
  BulkWriteInsertOne,
  BulkWriteUpdateOne,
  BulkWriteUpdateMany,
  BulkWriteReplaceOne,
  BulkWriteDeleteOne,
  BulkWriteDeleteMany,
} from "../../domain/types/shared.types.ts";
import type { IBulkWriteGenerationService } from "../i-service/i-bulk-write-generation.service.ts";

export class BulkWriteGenerationService implements IBulkWriteGenerationService {
  insertOne<T>(data: T): BulkWriteInsertOne<T> {
    return {
      insertOne: {
        document: data,
      },
    };
  }

  insertMany<T>(data: T[]): BulkWriteInsertOne<T>[] {
    return data.map((d) => this.insertOne(d));
  }

  updateOne<T>(
    filter: Record<string, unknown>,
    update: Partial<T>,
    upsert: Boolean = false,
  ): BulkWriteUpdateOne<T> {
    let updatedFilter: Record<string, unknown> = {};

    updatedFilter = "id" in filter ?
    (() => {
      const { id, ...rest } = filter

      return {
        _id: id,
        ...rest
      }
    })()
    : filter

    return {
      updateOne: {
        filter: updatedFilter,
        update,
        upsert,
      },
    };
  }

  updateMany<T>(
    filter: Record<string, unknown>,
    update: Partial<T>,
    upsert: Boolean = false,
  ): BulkWriteUpdateMany<T> {
    let updatedFilter: Record<string, unknown> = {};

    updatedFilter = "id" in filter ?
    (() => {
      const { id, ...rest } = filter

      return {
        _id: id,
        ...rest
      }
    })()
    : filter

    return {
      updateMany: {
        filter: updatedFilter,
        update,
        upsert,
      },
    };
  }

  replaceOne<T>(
    filter: Record<string, unknown>,
    data: T,
  ): BulkWriteReplaceOne<T> {
    return {
      replaceOne: {
        filter,
        replacement: data,
      },
    };
  }

  deleteOne(filter: Record<string, unknown>): BulkWriteDeleteOne {
    return {
      deleteOne: {
        filter,
      },
    };
  }

  deleteMany(filter: Record<string, unknown>): BulkWriteDeleteMany {
    return {
      deleteMany: {
        filter,
      },
    };
  }
}

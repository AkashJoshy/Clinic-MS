import type { UpdateQuery } from "mongoose";
import type { QueryOptions } from "../types/shared.types.ts";


export interface IBaseRepository<T, TDocument = any> {
  findById(id: string, options?: QueryOptions): Promise<T | null>;
  save(entity: T): Promise<T>;
  find(): Promise<T[] | []>;
  delete(id: string): Promise<void>;
  findByIdAndUpdate(id: string, data: Partial<T>): Promise<T | null>;
  findBy(filter: Partial<T>): Promise<T[]>;
  findByIds(field: string, ids: string[]): Promise<T[]>;
  findOneBy(filter: string | Record<string, any>): Promise<T | null>;
  updateOneById(
    filter: string | Record<string, any>,
    update: UpdateQuery<TDocument>,
  ): Promise<T | null>;
  updateMany(
    filter: string | Record<string, any>,
    update: UpdateQuery<TDocument>,
  ): Promise<void>;
}

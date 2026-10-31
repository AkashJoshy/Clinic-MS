import mongoose, { type QueryFilter } from "mongoose";
import { BaseRepository } from "./base/base.repository.ts";
import type { IDoctorSubscriptionRepository } from "../../domain/repositories/i-doctor-subscription.repository.ts";
import type { IDoctorSubscription } from "../models/doctor-subscription/doctor-subscription.types.ts";
import DoctorSubscriptionModel from "../models/doctor-subscription/doctor-subscription.model.ts";
import type { DoctorSubscriptionStatus } from "../../domain/types/doctor-subscription.types.ts";
import { DoctorSubscription } from "../../domain/entities/doctor-subscription.entity.ts";

export class DoctorSubscriptionRepository
  extends BaseRepository<DoctorSubscription, IDoctorSubscription>
  implements IDoctorSubscriptionRepository
{
  constructor() {
    super(DoctorSubscriptionModel);
  }

  protected toDomain(doc: IDoctorSubscription): DoctorSubscription {
    return DoctorSubscription.create({
      id: doc._id.toString(),
      doctorId: doc.doctorId.toString(),
      planId: doc.planId.toString(),
      status: doc.status,
      billingCycle: doc.billingCycle,
      price: doc.price,
      currency: doc.currency,
      features: (doc.features ?? []).map((feature) => ({
        id: feature.id,
        name: feature.name,
        isIncluded: feature.isIncluded,
      })),
      startedAt: doc.startedAt,
      currentPeriodStart: doc.currentPeriodStart,
      currentPeriodEnd: doc.currentPeriodEnd,
      autoRenew: doc.autoRenew,
      paymentMethod: doc.paymentMethod,
      cancelledAt: doc.cancelledAt,
      cancellationReason: doc.cancellationReason,
      cancellationMessage: doc.cancellationMessage,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  protected toPersistence(
    entity: DoctorSubscription,
  ): Partial<IDoctorSubscription> {
    return {
      doctorId: new mongoose.Types.ObjectId(entity.doctorId),
      planId: new mongoose.Types.ObjectId(entity.planId),
      status: entity.status,
      billingCycle: entity.billingCycle,
      price: entity.price,
      currency: entity.currency,
      features: entity.features.map((feature) => ({
        id: feature.id,
        name: feature.name,
        isIncluded: feature.isIncluded,
      })),
      startedAt: entity.startedAt,
      currentPeriodStart: entity.currentPeriodStart,
      currentPeriodEnd: entity.currentPeriodEnd,
      autoRenew: entity.autoRenew,
      paymentMethod: entity.paymentMethod,
      cancelledAt: entity.cancelledAt,
      cancellationReason: entity.cancellationReason,
      cancellationMessage: entity.cancellationMessage,
      ...(entity.createdAt && { createdAt: entity.createdAt }),
      ...(entity.updatedAt && { updatedAt: entity.updatedAt }),
    };
  }

  async findByDoctorId(doctorId: string): Promise<DoctorSubscription[]> {
    const docs = await DoctorSubscriptionModel.find({
      doctorId: new mongoose.Types.ObjectId(doctorId),
      status: { $ne: "ACTIVE" },
    }).sort({ createdAt: -1 });

    return docs.map((doc) =>
      this.toDomain(doc.toObject() as IDoctorSubscription),
    );
  }

  async findCurrentByDoctorId(
    doctorId: string,
  ): Promise<DoctorSubscription | null> {
    const now = new Date();

    const doc = await DoctorSubscriptionModel.findOne({
      doctorId: new mongoose.Types.ObjectId(doctorId),
      status: { $in: ["ACTIVE"] },
      $or: [{ currentPeriodEnd: null }, { currentPeriodEnd: { $gt: now } }],
    }).sort({ createdAt: -1 });

    if (!doc) return null;

    return this.toDomain(doc);
  }

  async findByStatus(
    status: DoctorSubscriptionStatus,
  ): Promise<DoctorSubscription[]> {
    const docs = await DoctorSubscriptionModel.find({
      status,
    }).sort({ createdAt: -1 });

    return docs.map((doc) =>
      this.toDomain(doc.toObject() as IDoctorSubscription),
    );
  }

  async existsActiveByDoctorId(
    doctorId: string,
    excludeSubscriptionId?: string,
  ): Promise<boolean> {
    const now = new Date();

    const filter: QueryFilter<IDoctorSubscription> = {
      doctorId: new mongoose.Types.ObjectId(doctorId),
      status: "ACTIVE",
      $or: [{ currentPeriodEnd: null }, { currentPeriodEnd: { $gt: now } }],
    };

    if (excludeSubscriptionId) {
      filter._id = {
        $ne: new mongoose.Types.ObjectId(excludeSubscriptionId),
      };
    }

    const exists = await DoctorSubscriptionModel.exists(filter);

    return exists !== null;
  }
}

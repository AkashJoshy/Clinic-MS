
import { BaseRepository } from "./base/base.repository.ts";
import type { IDoctorSubscriptionHistoryRepository } from "../../domain/repositories/i-doctor-subscription-history.repository.ts";
import { DoctorSubscriptionHistory } from "../../domain/entities/doctor-subscription-history.entity.ts";
import type { IDoctorSubscriptionHistory } from "../models/doctor-subscription-history/doctor-subscription-history.types.ts";
import DoctorSubscriptionHistoryModel from "../models/doctor-subscription-history/doctor-subscription-history.model.ts";
import { Types } from "mongoose";

export class DoctorSubscriptionHistoryRepository
  extends BaseRepository<
    DoctorSubscriptionHistory,
    IDoctorSubscriptionHistory
  >
  implements IDoctorSubscriptionHistoryRepository
{
  constructor() {
    super(DoctorSubscriptionHistoryModel);
  }

  protected toDomain(
    doc: IDoctorSubscriptionHistory,
  ): DoctorSubscriptionHistory {
    return DoctorSubscriptionHistory.create({
      id: doc._id.toString(),
      doctorId: doc.doctorId.toString(),
      subscriptionId: doc.subscriptionId.toString(),
      planId: doc.planId.toString(),
      planName: doc.planName,
      action: doc.action,
      status: doc.status,
      billingCycle: doc.billingCycle,
      price: doc.price,
      currency: doc.currency,
      features: (doc.features ?? []).map((feature) => ({
        id: feature.id,
        name: feature.name,
        isIncluded: feature.isIncluded,
      })),
      previousPlanId: doc.previousPlanId?.toString() ?? null,
      previousPlanName: doc.previousPlanName ?? null,
      previousPrice: doc.previousPrice ?? null,
      paymentMethod: doc.paymentMethod ?? null,
      transactionId: doc.transactionId ?? null,
      description: doc.description ?? null,
      metadata: doc.metadata ? { ...doc.metadata } : null,
      performedAt: doc.performedAt,
      createdAt: doc.createdAt ?? null,
    });
  }

  protected toPersistence(
    entity: DoctorSubscriptionHistory,
  ): Partial<IDoctorSubscriptionHistory> {
    return {
      doctorId: new Types.ObjectId(entity.doctorId),
      subscriptionId: new Types.ObjectId(entity.subscriptionId),
      planId: new Types.ObjectId(entity.planId),
      planName: entity.planName,
      action: entity.action,
      status: entity.status,
      billingCycle: entity.billingCycle,
      price: entity.price,
      currency: entity.currency,
      features: entity.features.map((feature) => ({
        id: feature.id,
        name: feature.name,
        isIncluded: feature.isIncluded,
      })),
      previousPlanId: entity.previousPlanId
        ? new Types.ObjectId(entity.previousPlanId)
        : null,
      previousPlanName: entity.previousPlanName,
      previousPrice: entity.previousPrice,
      paymentMethod: entity.paymentMethod,
      transactionId: entity.transactionId,
      description: entity.description,
      metadata: entity.metadata ? { ...entity.metadata } : null,
      performedAt: entity.performedAt,
      ...(entity.createdAt && { createdAt: entity.createdAt }),
    };
  }

  async findByDoctorId(
    doctorId: string,
  ): Promise<DoctorSubscriptionHistory[]> {
    const docs = await DoctorSubscriptionHistoryModel.find({
      doctorId: new Types.ObjectId(doctorId),
    }).sort({ performedAt: -1 });

    return docs.map((doc) =>
      this.toDomain(doc.toObject() as IDoctorSubscriptionHistory),
    );
  }

  async findBySubscriptionId(
    subscriptionId: string,
  ): Promise<DoctorSubscriptionHistory[]> {
    const docs = await DoctorSubscriptionHistoryModel.find({
      subscriptionId: new Types.ObjectId(subscriptionId),
    }).sort({ performedAt: -1 });

    return docs.map((doc) =>
      this.toDomain(doc.toObject() as IDoctorSubscriptionHistory),
    );
  }
}

import { BaseRepository } from "./base/base.repository.ts";
import type { IDoctorRepository } from "../../domain/repositories/i-doctor.repository.ts";
import { DoctorModel } from "../models/doctor/doctor.model.ts";
import { CounterModel } from "../models/counter/counter.model.ts";
import { Doctor } from "../../domain/entities/doctor.entity.ts";
import type { IDoctor } from "../models/doctor/doctor.types.ts";
import { Types } from "mongoose";
import type {
  PaginationOptions,
  PaginatedResult,
} from "../../domain/types/shared.types.ts";
import type { SortOrder } from "mongoose";

export class DoctorRepository
  extends BaseRepository<Doctor, IDoctor>
  implements IDoctorRepository
{
  constructor() {
    super(DoctorModel);
  }

  async getDoctorNumber(): Promise<number | null> {
    const doctorNumber = await CounterModel.findOneAndUpdate(
      {
        name: "doctorNumber",
      },
      {
        $inc: { value: 1 },
      },
      {
        returnDocument: "after",
        upsert: true,
      },
    );

    if (!doctorNumber) return null;
    return doctorNumber.value;
  }

  async paginateDoctor(
    filter: Record<string, any>,
    options: PaginationOptions & {
      search?: string | undefined;
      searchDepartmentIds?: string[] | undefined;
    },
  ): Promise<PaginatedResult<Doctor>> {
    const page = Math.max(1, options.page ?? 1);
    const limit = Math.min(100, Math.max(1, options.limit ?? 10));
    const skip = (page - 1) * limit;

    const search = options.search?.trim();
    const isNameSort =
      options.sort === "NAME_ASC" || options.sort === "NAME_DESC";

    // sortableName is needed for name sorting and for searching
    const needsSortableName = isNameSort || !!search;

    let sortStage: Record<string, 1 | -1> = {};
    switch (options.sort) {
      case "NAME_ASC":
        sortStage = { sortableName: 1 };
        break;
      case "NAME_DESC":
        sortStage = { sortableName: -1 };
        break;
      case "NEWEST":
        sortStage = { createdAt: -1 };
        break;
      case "OLDEST":
        sortStage = { createdAt: 1 };
        break;
      case "RATING":
      case "rating":
        sortStage = { averageRating: -1 };
        break;
      case "EXPERIENCE":
      case "experience":
        sortStage = { experienceYears: -1 };
        break;
      case "RELEVANCE":
      case "relevance":
      default:
        sortStage = { createdAt: -1 };
        break;
    }
    sortStage._id = 1; // stable tiebreaker for pagination

    const selectProjection = options.select
      ? Object.fromEntries(
          options.select
            .split(/\s+/)
            .filter(Boolean)
            .map((field) => [
              field.replace(/^-/, ""),
              field.startsWith("-") ? 0 : 1,
            ]),
        )
      : null;

    const basePipeline: any[] = [{ $match: filter }];

    if (needsSortableName) {
      basePipeline.push({
        $addFields: {
          sortableName: {
            $toLower: {
              $trim: {
                input: {
                  $let: {
                    vars: {
                      name: { $ifNull: ["$displayName", ""] },
                      m: {
                        $regexFind: {
                          input: { $ifNull: ["$displayName", ""] },
                          regex: "^dr\\.\\s*", // "Dr." only, so "Drew" is untouched
                          options: "i",
                        },
                      },
                    },
                    in: {
                      $cond: [
                        { $ne: ["$$m", null] },
                        {
                          $substrCP: [
                            "$$name",
                            { $strLenCP: "$$m.match" },
                            { $strLenCP: "$$name" },
                          ],
                        },
                        "$$name",
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      });
    }

    
    if (search) {
      // Escape user input so it is treated as plain text, not a regex
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchOr: any[] = [
        { sortableName: { $regex: escaped, $options: "i" } },
        { specialization: { $regex: escaped, $options: "i" } },
      ];
      if (options.searchDepartmentIds && options.searchDepartmentIds.length > 0) {
        searchOr.push({ departmentId: { $in: options.searchDepartmentIds } });
      }
      basePipeline.push({
        $match: {
          $or: searchOr,
        },
      });
    }

    const dataPipeline: any[] = [
      ...basePipeline,
      { $sort: sortStage },
      { $skip: skip },
      { $limit: limit },
    ];

    if (selectProjection && Object.keys(selectProjection).length > 0) {
      dataPipeline.push({ $project: selectProjection });
    }

    if (needsSortableName) {
      dataPipeline.push({ $unset: "sortableName" });
    }

    const countPipeline: any[] = [...basePipeline, { $count: "total" }];

    const [docs, countResult] = await Promise.all([
      this.model.aggregate(dataPipeline),
      this.model.aggregate(countPipeline),
    ]);

    const total: number = countResult[0]?.total ?? 0;
    const totalPages = Math.ceil(total / limit);

    return {
      data: docs.map((doc) => this.toDomain(doc as IDoctor)),
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  protected toDomain(doc: IDoctor): Doctor {
    return Doctor.create({
      id: doc._id.toString(),
      userId: doc.userId ? doc.userId.toString() : null,
      displayName: doc.displayName,
      doctorCode: doc.doctorCode,
      bio: doc.bio,
      profilePicture: doc.profilePicture,
      languages: doc.languages,
      gender: doc.gender,
      departmentId: doc.departmentId.toString(),
      specialization: doc.specialization,
      qualification: doc.qualification,
      experienceYears: doc.experienceYears,
      licenceNumber: doc.licenceNumber,
      averageRating: doc.averageRating,
      totalReviews: doc.totalReviews,
      registrationDoc: doc.registrationDoc,
      medicalLicenceDoc: doc.medicalLicenceDoc,
      status: doc.status,
      reviewedAt: doc.reviewedAt,
      reviewedMessage: doc.reviewedMessage,
      subscription: {
        current: doc.subscription.current,
        history: doc.subscription.history,
      },
      reviewedReason: doc.reviewedMessage ?? null,
      fieldsToReupload: doc.fieldsToReupload ?? [],
      createdAt: doc.createdAt ?? null,
      updatedAt: doc.updatedAt ?? null,
    });
  }

  protected toPersistence(entity: Doctor): Partial<IDoctor> {
    return {
      userId: new Types.ObjectId(entity.userId!),
      displayName: entity.displayName,
      doctorCode: entity.doctorCode,
      bio: entity.bio,
      profilePicture: entity.profilePicture,
      languages: entity.languages,
      gender: entity.gender,
      departmentId: entity.departmentId,
      specialization: entity.specialization,
      qualification: entity.qualification,
      experienceYears: entity.experienceYears,
      licenceNumber: entity.licenceNumber,
      averageRating: entity.averageRating,
      totalReviews: entity.totalReviews,
      registrationDoc: entity.registrationDoc,
      medicalLicenceDoc: entity.medicalLicenceDoc,
      status: entity.status,
      subscription: {
        current: entity.subscription.current,
        history: entity.subscription.history,
      },
      reviewedAt: entity.reviewedAt,
      reviewedMessage: entity.reviewedMessage,
      reviewedReason: entity.reviewedMessage ?? null,
      fieldsToReupload: entity.fieldsToReupload ?? [],
    };
  }
}


// export class DoctorDetailsMapper {
//   static toAdminDoctorInfo(
//     doctor: Doctor,
//     user: SafeUser | null,
//     doctorClinic: DoctorClinic | null,
//     clinic: Clinic | null,
//     clinicAddress: Address | null,
//     doctorAddress: Address | null,
//     department: Department | null,
//   ): AdminDoctorInfo {
//     return {
//       user: user
//         ? {
//             email: user.email,
//             phone: user.phone,
//             isActive: user.isActive,
//             isBlocked: user.isBlocked,
//           }
//         : null,

//       clinic: clinic
//         ? {
//             id: clinic.id,
//             name: clinic.name,
//             about: clinic.about,
//             status: clinic.status,

//             location: {
//               type: clinic.location.type,
//               coordinates: clinic.location.coordinates as [
//                 number,
//                 number,
//               ],
//             },

//             establishmentLicenceDoc: {
//               url: clinic.establishmentLicenceDoc.url,
//               status: clinic.establishmentLicenceDoc.status,
//             },

//             registrationDoc: {
//               url: clinic.registrationDoc.url,
//               status: clinic.registrationDoc.status,
//             },

//             clinicAddress: clinicAddress
//               ? {
//                   id: clinicAddress.id,
//                   addressLine: clinicAddress.addressLine,
//                   country: clinicAddress.country,
//                   state: clinicAddress.state,
//                   city: clinicAddress.city,
//                   pincode: clinicAddress.pincode,
//                   ownerId: clinicAddress.ownerId,
//                 }
//               : null,
//           }
//         : null,

//       doctor: {
//         id: doctor.id,
//         displayName: doctor.displayName,
//         doctorCode: doctor.doctorCode,
//         bio: doctor.bio,
//         languages: doctor.languages,
//         gender: doctor.gender,
//         departmentId: doctor.departmentId,
//         specialization: doctor.specialization,
//         qualification: doctor.qualification,
//         experienceYears: doctor.experienceYears,
//         averageRating: doctor.averageRating,
//         totalReviews: doctor.totalReviews,
//         licenceNumber: doctor.licenceNumber,

//         registrationDoc: {
//           url: doctor.registrationDoc.url,
//           status: doctor.registrationDoc.status,
//         },

//         medicalLicenceDoc: {
//           url: doctor.medicalLicenceDoc.url,
//           status: doctor.medicalLicenceDoc.status,
//         },

//         profilePicture: {
//           url: doctor.profilePicture.url,
//         },

//         status: doctor.status,
//         reviewedAt: doctor.reviewedAt,
//         reviewedMessage: doctor.reviewedMessage,
//         reviewedReason: doctor.reviewedReason,
//         createdAt: doctor.createdAt,
//         updatedAt: doctor.updatedAt,
//       },

//       doctorClinic: doctorClinic
//         ? {
//             id: doctorClinic.id,
//             type: doctorClinic.type,
//             consultationFee: doctorClinic.consultationFee,
//             schedule: doctorClinic.schedule,
//             slotDuration: doctorClinic.slotDuration,
//             timeZone: doctorClinic.timeZone,
//             isActive: doctorClinic.isActive,
//             updatedAt: doctorClinic.updatedAt,
//           }
//         : null,

//       address: doctorAddress
//         ? {
//             id: doctorAddress.id,
//             addressLine: doctorAddress.addressLine,
//             country: doctorAddress.country,
//             state: doctorAddress.state,
//             city: doctorAddress.city,
//             pincode: doctorAddress.pincode,
//             ownerId: doctorAddress.ownerId,
//           }
//         : null,

//       department: department
//         ? {
//             id: department.id,
//             name: department.name,
//           }
//         : null,
//     };
//   }
// }
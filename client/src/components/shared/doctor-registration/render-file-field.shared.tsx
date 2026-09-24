// import { Upload } from "lucide-react";

// const renderFileField = (
//   name: keyof DoctorRegisterStep3FormData,
//   label: string,
//   description: string,
//   accept?: string,
// ) => {
//   const error = errors[name];

//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-semibold text-gray-700">
//         {label}
//       </label>

//       <label
//         htmlFor={name}
//         className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-primary-300 hover:bg-primary-50"
//       >
//         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
//           {name === "doctorProfilePicture" ? (
//             <Image size={20} />
//           ) : (
//             <FileText size={20} />
//           )}
//         </div>

//         <div className="min-w-0 flex-1">
//           <p className="text-sm font-semibold text-gray-700">
//             {name === "doctorProfilePicture"
//               ? doctorProfilePicture?.name || "Choose profile picture"
//               : name === "clinicRegistrationDoc"
//                 ? clinicRegistrationDoc?.name ||
//                   "Choose clinic registration document"
//                 : name === "establishmentLicenceDoc"
//                   ? establishmentLicenceDoc?.name ||
//                     "Choose establishment licence document"
//                   : name === "medicalLicenceDoc"
//                     ? medicalLicenceDoc?.name ||
//                       "Choose medical licence document"
//                     : doctorRegistrationDoc?.name ||
//                       "Choose doctor registration document"}
//           </p>

//           <p className="mt-1 text-xs text-gray-500">{description}</p>
//         </div>

//         <Upload size={18} className="shrink-0 text-gray-500" />

//         <input
//           id={name}
//           type="file"
//           className="hidden"
//           accept={accept}
//           onChange={handleFileChange(name)}
//         />
//       </label>

//       {error && (
//         <p className="text-xs text-red-500">{error.message?.toString()}</p>
//       )}
//     </div>
//   );
// };

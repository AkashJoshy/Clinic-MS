
export const PATIENT_ENDPOINTS = {
    FETCH_PATIENT_PROFILES: "/profiles/:userId",
    CREATE_PATIENT_PROFILE: "/profiles",
    UPDATE_PATIENT_PROFILE: "/profiles/:patientId",
    UPDATE_PATIENT_PROFILE_ADDRESS: "/profiles/address/:ownerId",
    UPDATE_PATIENT_PROFILE_PICTURE: "/profiles/picture/p",
    FETCH_NEARBY_DOCTORS: "/doctors/nearby",
    FETCH_ALL_DOCTORS: "/doctors/all/available",
    FETCH_DOCTOR_ALL_SLOTS: "/doctors/:doctorClinicId/slots",
    BOOK_SLOT: "/doctors/:doctorClinicId/slots/:slotId",
    FETCH_APPOINTMENTS: "/appointments",
    HOLD_SLOT: "/slot/:slotId/held"
}
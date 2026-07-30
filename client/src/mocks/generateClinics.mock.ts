export const generateClinics = (count: number, pending = false) =>
  Array.from({ length: count }, (_, i) => ({
    id: pending ? `P${i+1}` : `C${i+1}`,
    name: ["MediCare Clinic","HealthFirst Center","CityMed Hospital","WellnessHub","CarePlus","HealTech","Sunrise Medical","GreenLife Clinic","PrimeCare","Unity Health"][i%10],
    doctor: ["Dr. Anil Kumar","Dr. Priya Nair","Dr. Rahul Menon","Dr. Sneha Das","Dr. Vivek Iyer"][i%5],
    location: ["Kochi, Kerala","Trivandrum, Kerala","Calicut, Kerala","Thrissur, Kerala","Kannur, Kerala"][i%5],
    phone: `+91 98${String(4000000+i*1234567).slice(0,8)}`,
    email: `clinic${i+1}@health.com`,
    status: pending ? "pending" : ["active","active","active","inactive"][i%4],
    rating: (3.5+(i%15)*0.1).toFixed(1),
    patients: 120+i*37,
    speciality: ["General","Cardiology","Dermatology","Orthopedics","Pediatrics"][i%5],
  }));
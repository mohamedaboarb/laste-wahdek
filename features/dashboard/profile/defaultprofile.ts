import { ProfileFormValues } from "@/app/dashboard/DashboardSchemas/motherSchema";

export const emptyProfileValues: ProfileFormValues = {
  fullName: "",
  email: "",
  nationalId: "",
  phone: "",
  birthDate: new Date(),
  chronicDiseases: [],
  psychologicalStatus: "Regular",
  clinicalHistory: "",
  children: [],
};

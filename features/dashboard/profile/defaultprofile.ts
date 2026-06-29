import { ProfileFormValues } from "@/features/dashboard/profile/motherSchema";

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

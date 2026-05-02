import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { mockDoctors } from "@/lib/mock-data";
import { FilterValues } from "./schemas";
export const fetchDoctors = async (filters: FilterValues) => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  let filtered = [...mockDoctors];

  if (filters.name) {
    const searchName = filters.name.toLowerCase();
    filtered = filtered.filter((d) =>
      d.fullName.toLowerCase().includes(searchName),
    );
  }
  if (filters.specialty) {
    filtered = filtered.filter((d) => d.specialization === filters.specialty);
  }
  if (filters.gender) {
    filtered = filtered.filter((d) => d.gender === filters.gender);
  }
  if (filters.experience) {
    filtered = filtered.filter(
      (d) => d.experience >= parseInt(filters.experience || "0"),
    );
  }

  const itemsPerPage = 6;
  const page = parseInt(filters.page) || 1;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedData = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return {
    data: paginatedData,
    totalPages: totalPages,
    currentPage: page,
    totalResults: filtered.length,
  };
};
const USER_SESSION_COUNT = 0;
export const fetchDoctorSlots = async (doctorId: string) => {
  // محاكاة تأخير الشبكة
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    slots: ["10:00 AM", "11:30 AM", "02:00 PM"],
    pricing: {
      original: 150,
      current: USER_SESSION_COUNT < 2 ? 0 : 150,
      isFreeGift: USER_SESSION_COUNT < 2,
    },
  };
};

export const fetchDoctorById = async (id: string) => {
  // محاكاة تأخير بسيط كأنه طلب شبكة
  await new Promise((resolve) => setTimeout(resolve, 500));

  const doctor = mockDoctors.find((doc) => doc.id === id);

  if (!doctor) {
    throw new Error("الطبيب غير موجود");
  }

  return doctor;
};

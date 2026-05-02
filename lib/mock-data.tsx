import { Baby, Brain, Video } from "lucide-react";
import React from "react";

export interface Doctor {
  id: string;
  gender: "male" | "female";
  fullName: string;
  fullNameAr: string;
  email: string;
  specialization: "pediatrician" | "psychologist";
  licenseId: string;
  bio: string;
  bioAr: string;
  currentFamilies: number;
  capacity: number;
  experience: number;
  avatar: string;
  rating: number;
  review: number;
  price: number;
  sessionAgenda: string[];
  schedule: Record<string, string[]>;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  diseaseHistory: string;
}

export interface Mother {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  nationalId: string;
  chronicDiseases: string[];
  generalHistory: string;
  mentalHealth: string;
  children: Child[];
  assignedDoctors: string[];
  sessionsRemaining: number;
  maxSessions: number;
}

export interface AssignedFamily {
  mother: Mother;
  children: Child[];
}
export interface headingProps {
  heading: String;
  paragraph: String;
  stepNumber?: String;
  step: String;
}

export interface ServiceConfig {
  id: string;
  icon: React.ReactNode;
  image: string;
}

export const servicesData: ServiceConfig[] = [
  {
    id: "telemedicine",
    icon: <Video size={32} />,
    image: "/images/telemedicine.webp",
  },
  {
    id: "pediatrics",
    icon: <Baby size={32} />,
    image: "/images/pediatric.webp",
  },
  {
    id: "psychology",
    icon: <Brain size={32} />,
    image: "/images/psychology.webp",
  },
];

// ─── Mock Doctors ───
export const mockDoctors: Doctor[] = [
  {
    id: "doc-1",
    gender: "male",
    fullName: "Dr. Youssef Ahmed",
    fullNameAr: "د. يوسف أحمد",
    email: "youssef@clinic.com",
    specialization: "pediatrician",
    licenseId: "PED-10234",
    bio: "Board-certified pediatrician with over 10 years of experience in child health and development.",
    bioAr: "طبيبة أطفال معتمدة بخبرة تزيد عن 10 سنوات في صحة الطفل ونموه.",
    currentFamilies: 3,
    capacity: 5,
    experience: 10,
    avatar: "/images/d1.webp",
    sessionAgenda: [
      "Introduction and medical history review",
      "Physical examination",
      "Discussion of treatment options",
    ],
    rating: 4.8,
    review: 25,
    price: 500,
    schedule: {
      monday: ["09:00 AM", "10:00 AM", "11:00 AM"],
      tuesday: ["02:00 PM", "03:00 PM", "04:00 PM"],
      friday: [],
    },
  },
  {
    id: "doc-2",
    gender: "female",
    fullName: "Dr. Mai Mohamed",
    fullNameAr: "د. مى محمد",
    email: "mai@clinic.com",
    specialization: "psychologist",
    licenseId: "PSY-20456",
    bio: "Clinical psychologist specializing in maternal mental health and postpartum support.",
    bioAr: "أخصائي نفسي متخصص في صحة الأم النفسية ودعم ما بعد الولادة.",
    currentFamilies: 5,
    capacity: 5,
    experience: 8,
    avatar: "/images/d5.webp",
    sessionAgenda: [
      "Introduction and medical history review",
      "Physical examination",
      "Discussion of treatment options",
    ],
    rating: 4.8,
    review: 25,
    price: 500,
    schedule: {
      wednesday: ["10:00 AM", "11:00 AM", "12:00 PM"],
      thursday: ["01:00 PM", "02:00 PM", "03:00 PM"],
      saturday: ["09:00 AM", "10:00 AM", "11:00 AM"],
    },
  },
  {
    id: "doc-3",
    gender: "female",
    fullName: "Dr. Layla Mansour",
    fullNameAr: "د. ليلى منصور",
    email: "layla@clinic.com",
    specialization: "pediatrician",
    licenseId: "PED-30789",
    bio: "Pediatric specialist focused on early childhood nutrition and immunology.",
    bioAr: "أخصائية أطفال متخصصة في تغذية الطفولة المبكرة والمناعة.",
    currentFamilies: 2,
    capacity: 5,
    experience: 12,
    avatar: "/images/d12.webp",
    sessionAgenda: [
      "Introduction and medical history review",
      "Physical examination",
      "Discussion of treatment options",
    ],
    rating: 4.8,
    review: 25,
    price: 500,
    schedule: {
      wednesday: ["10:00 AM", "11:00 AM", "12:00 PM"],
      thursday: ["01:00 PM", "02:00 PM", "03:00 PM"],
      saturday: ["09:00 AM", "10:00 AM", "11:00 AM"],
    },
  },
  {
    id: "doc-4",
    gender: "male",
    fullName: "Dr. Khaled Ibrahim",
    fullNameAr: "د. خالد إبراهيم",
    email: "khaled@clinic.com",
    specialization: "psychologist",
    licenseId: "PSY-40123",
    bio: "Child and family psychologist with extensive experience in anxiety and behavioral therapy.",
    bioAr: "أخصائي نفسي للأطفال والأسرة بخبرة واسعة في علاج القلق والسلوك.",
    currentFamilies: 4,
    capacity: 5,
    experience: 15,
    avatar: "/images/d4.webp",
    sessionAgenda: [
      "Introduction and medical history review",
      "Physical examination",
      "Discussion of treatment options",
    ],
    rating: 4.8,
    review: 25,
    price: 500,
    schedule: {
      wednesday: ["10:00 AM", "11:00 AM", "12:00 PM"],
      thursday: ["01:00 PM", "02:00 PM", "03:00 PM"],
      saturday: ["09:00 AM", "10:00 AM", "11:00 AM"],
    },
  },
  {
    id: "doc-5",
    gender: "female",
    fullName: "Dr. Nadia Youssef",
    fullNameAr: "د. نادية يوسف",
    email: "nadia@clinic.com",
    specialization: "pediatrician",
    licenseId: "PED-50456",
    bio: "Experienced pediatrician specializing in neonatal care and infant development.",
    bioAr: "طبيبة أطفال ذات خبرة متخصصة في رعاية حديثي الولادة ونمو الرضع.",
    currentFamilies: 1,
    capacity: 5,
    experience: 7,
    avatar: "/images/d7.webp",
    sessionAgenda: [
      "Introduction and medical history review",
      "Physical examination",
      "Discussion of treatment options",
    ],
    rating: 4.8,
    review: 25,
    price: 500,
    schedule: {
      wednesday: ["10:00 AM", "11:00 AM", "12:00 PM"],
      thursday: ["01:00 PM", "02:00 PM", "03:00 PM"],
      saturday: ["09:00 AM", "10:00 AM", "11:00 AM"],
    },
  },
  {
    id: "doc-6",
    gender: "male",
    fullName: "Dr. Mohamed Hamed",
    fullNameAr: "د. محمد حامد",
    email: "mohamed@clinic.com",
    specialization: "pediatrician",
    licenseId: "PED-60789",
    bio: "Specialist in family dynamics and child cognitive development therapy.",
    bioAr: "متخصص في ديناميكيات الأسرة وعلاج النمو المعرفي للطفل.",
    currentFamilies: 5,
    capacity: 5,
    experience: 20,
    avatar: "/images/d11.webp",
    sessionAgenda: [
      "Introduction and medical history review",
      "Physical examination",
      "Discussion of treatment options",
    ],
    rating: 4.8,
    review: 25,
    price: 500,
    schedule: {
      wednesday: ["10:00 AM", "11:00 AM", "12:00 PM"],
      thursday: ["01:00 PM", "02:00 PM", "03:00 PM"],
      saturday: ["09:00 AM", "10:00 AM", "11:00 AM"],
    },
  },
  {
    id: "doc-7",
    gender: "male",
    fullName: "Dr. Aly Mahmoud",
    fullNameAr: "د. علي محمود",
    email: "aly@clinic.com",
    specialization: "psychologist",
    licenseId: "PSY-60780",
    bio: "Specialist in family dynamics and child cognitive development therapy.",
    bioAr: "متخصص في ديناميكيات الأسرة وعلاج النمو المعرفي للطفل.",
    currentFamilies: 4,
    capacity: 5,
    experience: 4,
    avatar: "/images/d13.webp",
    sessionAgenda: [
      "Introduction and medical history review",
      "Physical examination",
      "Discussion of treatment options",
    ],
    rating: 4.8,
    review: 25,
    price: 500,
    schedule: {
      wednesday: ["10:00 AM", "11:00 AM", "12:00 PM"],
      thursday: ["01:00 PM", "02:00 PM", "03:00 PM"],
      saturday: ["09:00 AM", "10:00 AM", "11:00 AM"],
    },
  },
];

// ─── Mock Mother (logged-in user) ───
export const mockMother: Mother = {
  id: "mom-1",
  fullName: "Fatma Ali",
  email: "fatma@email.com",
  phone: "01012345678",
  age: 30,
  nationalId: "2950101012345",
  chronicDiseases: ["thyroid"],
  generalHistory: "Previous C-section delivery",
  mentalHealth: "mild anxiety",
  children: [
    {
      id: "child-1",
      name: "Youssef",
      age: 3,
      diseaseHistory: "Mild lactose intolerance",
    },
    {
      id: "child-2",
      name: "Maryam",
      age: 1,
      diseaseHistory: "No known conditions",
    },
  ],
  assignedDoctors: ["doc-1", "doc-4"],
  sessionsRemaining: 2,
  maxSessions: 2,
};

export async function fetchMotherProfile(): Promise<Mother> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMother);
    }, 1000);
  });
}

export async function fetchDoctorById(id: string): Promise<Doctor | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDoctors.find((d) => d.id === id));
    }, 500);
  });
}

// ─── Mock Login ───
export interface LoginCredentials {
  email: string;
  password: string;
}

export async function mockLogin(credentials: LoginCredentials): Promise<{
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: "mother" | "doctor";
    assignedDoctors?: string[];
  };
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo mother account
      if (
        credentials.email === "fatma@email.com" &&
        credentials.password === "password123"
      ) {
        resolve({
          success: true,
          user: {
            id: "mom-1",
            name: mockMother.fullName,
            email: mockMother.email,
            role: "mother",
            assignedDoctors: mockMother.assignedDoctors,
          },
        });
        return;
      }
      // Demo doctor account
      if (
        credentials.email === "sarah@clinic.com" &&
        credentials.password === "password123"
      ) {
        resolve({
          success: true,
          user: {
            id: "doc-1",
            name: mockDoctors[0].fullName,
            email: mockDoctors[0].email,
            role: "doctor",
          },
        });
        return;
      }
      // Quick-login as mother
      if (credentials.email === "demo-mother") {
        resolve({
          success: true,
          user: {
            id: "mom-1",
            name: mockMother.fullName,
            email: mockMother.email,
            role: "mother",
            assignedDoctors: mockMother.assignedDoctors,
          },
        });
        return;
      }
      // Quick-login as doctor
      if (credentials.email === "demo-doctor") {
        resolve({
          success: true,
          user: {
            id: "doc-1",
            name: mockDoctors[0].fullName,
            email: mockDoctors[0].email,
            role: "doctor",
          },
        });
        return;
      }
      resolve({ success: false });
    }, 800);
  });
}
export const fetchAssignedDoctors = (ids: string[]) => {
  return mockDoctors.filter((doc) => ids.includes(doc.id));
};
export async function fetchAssignedFamilies(
  doctorId: string,
): Promise<AssignedFamily[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // For mock, return families where the doctor is assigned
      const families: AssignedFamily[] = [];
      if (doctorId === "doc-1" || doctorId === "doc-3") {
        families.push({
          mother: mockMother,
          children: mockMother.children,
        });
      }
      // Add more mock families
      families.push({
        mother: {
          id: "mom-2",
          fullName: "Hana Mohamed",
          email: "hana@email.com",
          phone: "01098765432",
          age: 28,
          nationalId: "2960506023456",
          chronicDiseases: [],
          generalHistory: "No significant history",
          mentalHealth: "none",
          children: [
            { id: "child-3", name: "Ali", age: 5, diseaseHistory: "Asthma" },
          ],
          assignedDoctors: [doctorId],
          sessionsRemaining: 1,
          maxSessions: 2,
        },
        children: [
          { id: "child-3", name: "Ali", age: 5, diseaseHistory: "Asthma" },
        ],
      });
      resolve(families);
    }, 1000);
  });
}

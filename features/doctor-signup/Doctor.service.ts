import { createClient } from "@supabase/supabase-js";
import { DoctorRegisterPayload } from "./Doctor.schema";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export async function registerDoctor(
  payload: DoctorRegisterPayload,
  certificates: FileList,
) {
  // 1. Create auth user
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
  });
  if (error) throw new Error(error.message);
  const userId = data.user!.id;

  // 2. Save base profile
  await supabase.from("profiles").insert({
    id: userId,
    role: "doctor",
    status: "pending_approval",
  });

  // 3. Save doctor details
  await supabase.from("doctor_details").insert({
    id: userId,
    full_name: payload.fullName,
    gender: payload.gender,
    specialization: payload.specialization,
    scientific_degree: payload.scientificDegree,
    title: payload.title,
    medical_license_number: payload.medicalLicenseNumber,
    bio: payload.bio,
    status: "pending_approval",
  });

  // 4. Upload certificates to Supabase Storage
  for (const file of Array.from(certificates)) {
    const path = `${userId}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("certificates")
      .upload(path, file);
    if (uploadError) throw new Error(uploadError.message);

    await supabase.from("doctor_certificates").insert({
      doctor_id: userId,
      file_path: path,
      file_name: file.name,
    });
  }
}

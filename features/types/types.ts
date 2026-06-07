export type UserRole = "mother" | "doctor";
export type UserStatus = "active" | "pending_approval" | "suspended";

export interface UserSession {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  expiresAt: number;
}

export interface ProfileRow {
  role: UserRole;
  status: UserStatus;
}

export interface AuthError {
  code:
    | "invalid_credentials"
    | "email_not_confirmed"
    | "pending_approval"
    | "suspended"
    | "profile_missing"
    | "unknown";
}
export interface DoctorServiceError {
  code:
    | "email_taken"
    | "license_taken"
    | "upload_failed"
    | "certificates_insert_failed"
    | "unknown";
}

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface ForgotT {
  forgotPassword: {
    errors: {
      email_required: string;
      email_invalid: string;
      otp_required: string;
      otp_length: string;
      otp_digits_only: string;
      password_required: string;
      password_min: string;
      password_uppercase: string;
      password_number: string;
      password_symbol: string;
      password_mismatch: string;
    };
  };
}
export interface MotherRegisterPayload {
  email: string;
  password: string;
  role: "mother";
  status: "active";
}

"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Save, Pencil, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

// استيراد القيم النظيفة الفارغة واستيراد دوال السيرفس الحقيقية
import { emptyProfileValues } from "@/features/dashboard/profile/defaultprofile";
import {
  ProfileFormValues,
  profileSchema,
} from "@/app/dashboard/DashboardSchemas/motherSchema";
import { PersonalInfoCard } from "@/components/dashboard/PersonalInformation";
import { MedicalRecordCard } from "@/components/dashboard/MedicalRecord";
import { ChildrenSection } from "@/components/dashboard/ChildrenSection";
import { fetchProfile, saveProfile } from "./profile.service";
import { useAuth } from "@/contexts/auth-context";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // إضافة حالة تحميل لمنع تفاعل المستخدم أثناء الجلب
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: emptyProfileValues, // نبدأ بقيم فارغة كحماية مؤقتة أثناء جلب البيانات
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;
  const { user } = useAuth();
  // 1. جلب البيانات ديناميكياً عند فتح الصفحة وضخها داخل الاستمارة
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const data = await fetchProfile();
        reset({ ...data, email: user?.email || "" });
      } catch (error: any) {
        console.error("Failed to load dynamic profile:", error);
        toast.error("Failed to load profile data from server");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [reset, user?.email]);

  // 2. دالة الحفظ الديناميكية الكاملة
  async function onSubmit(values: ProfileFormValues) {
    try {
      await saveProfile(values); // استدعاء دالة السيرفس لحفظ وتحديث وحذف البيانات في طلب واحد

      toast.success("Profile and children records updated successfully");
      reset(values); // تثبيت القيم الجديدة في الحالة الافتراضية
      setIsEditing(false); // إغلاق وضع التعديل للوصول لوضع القراءة
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast.error(error.message || "Failed to update profile");
    }
  }

  function handleCancel() {
    reset(); // يعيد الحقول إلى آخر قيم حقيقية تم جلبها من السيرفر أو حفظها بنجاح
    setIsEditing(false);
  }

  // 3. منع الواجهة من العرض أثناء فترة جلب البيانات لإعطاء تجربة سلسة
  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-2 text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
        <p className="text-sm font-medium">Loading profile settings...</p>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-5xl space-y-4 pb-32"
      >
        {/* HEADER */}
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-md lg:text-2xl font-bold tracking-tight text-slate-900">
                Profile Settings
              </h1>
              <p className="mt-2 text-slate-500">
                Manage your personal information, medical records and children
                profiles.
              </p>
            </div>

            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-xs inline-flex items-center gap-2 rounded-lg bg-pink-600 px-5 py-3 font-medium text-white transition hover:bg-pink-700"
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </button>
            ) : (
              <div className="rounded-xl border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600">
                Editing Mode
              </div>
            )}
          </div>
        </div>

        <PersonalInfoCard isEditing={isEditing} />

        <MedicalRecordCard isEditing={isEditing} />

        <ChildrenSection
          isEditing={isEditing}
          onUploadingChange={setIsUploading}
        />

        {/* STICKY SAVE BAR */}
        {isEditing && (
          <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-center md:justify-between px-6 py-4">
              <div className="hidden md:flex flex-col">
                <p className="font-medium text-slate-900">Unsaved Changes</p>
                <p className="text-sm text-slate-500">
                  Save your changes before leaving.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-medium transition hover:bg-slate-50"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-3 font-medium text-white transition hover:bg-pink-700 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {isSubmitting
                    ? "Saving..."
                    : isUploading
                      ? "Uploading..."
                      : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}

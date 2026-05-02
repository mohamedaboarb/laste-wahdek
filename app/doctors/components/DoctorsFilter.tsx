import React from "react";
import {
  Search,
  GraduationCap,
  BriefcaseBusiness,
  Filter,
  RotateCcw,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "@/contexts/locale-context";
export function DoctorsFilter({ form, onSubmit, setIsFilterOpen }: any) {
  const { register, setValue, watch, handleSubmit, reset } = form;
  const { t } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <form
      onSubmit={handleSubmit((values: any) => {
        onSubmit(values);
        if (typeof setIsFilterOpen === "function") {
          setIsFilterOpen(false);
        }
      })}
      className="bg-white lg:p-8 lg:rounded-[2.5rem] lg:shadow-2xl lg:shadow-primary/5 lg:border lg:border-primary/5 space-y-8"
    >
      {/*name field*/}
      <div className="space-y-3">
        <label className="text-sm font-black text-slate-700 flex items-center gap-2">
          <Search size={16} className="text-primary" /> {t.doctorsFilter.name}
        </label>
        <input
          {...register("name")}
          placeholder="ابحثي بالاسم..."
          className="w-full p-2 bg-slate-50 rounded-sm border-none text-sm focus:ring focus:ring-primary/20 transition-all shadow-inner"
        />
      </div>
      {/* gender field*/}
      <div className="space-y-3">
        <label className="text-sm font-black text-slate-700">
          {t.doctorsFilter.gender.title}
        </label>
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-50 rounded-sm">
          <button
            type="button"
            onClick={() => setValue("gender", "male")}
            className={`py-1 rounded-xl text-xs font-black transition-all ${
              watch("gender") === "male"
                ? "bg-white text-primary shadow-sm"
                : "text-slate-400"
            }`}
          >
            {t.doctorsFilter.gender.male}
          </button>
          <button
            type="button"
            onClick={() => setValue("gender", "female")}
            className={`py-3 rounded-xl text-xs font-black transition-all ${
              watch("gender") === "female"
                ? "bg-white text-primary shadow-md"
                : "text-slate-400"
            }`}
          >
            {t.doctorsFilter.gender.female}
          </button>
        </div>
      </div>

      {/* specialty field */}
      <div className="space-y-3">
        <label className="text-sm font-black text-slate-700 flex items-center gap-2">
          <GraduationCap size={16} className="text-primary" />{" "}
          {t.doctorsFilter.specialization.title}
        </label>
        <select
          {...register("specialty")}
          className="w-full p-2 bg-slate-50 rounded-sm border-none text-sm font-bold text-slate-600 appearance-none shadow-inner"
        >
          <option value="">{t.doctorsFilter.specialization.all}</option>
          <option value="pediatrician">
            {t.doctorsFilter.specialization.pediatrician}
          </option>
          <option value="psychologist">
            {t.doctorsFilter.specialization.psychologist}
          </option>
        </select>
      </div>
      {/* experience field */}

      <div className="space-y-3">
        <label className="text-sm font-black text-slate-700 flex items-center gap-2">
          <BriefcaseBusiness size={16} className="text-primary" />{" "}
          {t.doctorsFilter.experience.title}
        </label>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: t.doctorsFilter.experience.any, value: "" },

            { label: "+5", value: "5" },

            { label: "+10", value: "10" },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setValue("experience", opt.value)}
              className={`py-3 rounded-xl text-[10px] font-black transition-all border ${watch("experience") === opt.value ? "bg-primary text-white border-primary shadow-md" : "bg-white text-slate-400 border-slate-100"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons*/}
      <div className="space-y-3 pt-4 border-t border-slate-50 grid grid-cols-2 gap-2">
        <button
          type="submit"
          className="w-full py-4 bg-primary text-white rounded-sm font-black text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm"
        >
          <Filter size={18} />
          {t.doctorsFilter.apply}
        </button>

        <button
          type="button"
          onClick={() => {
            reset();
            router.push(pathname); // يمسح الرابط (URL) ويعيد عرض كل الأطباء
            if (typeof setIsFilterOpen === "function") {
              setIsFilterOpen(false); // إغلاق الدروير
            }
          }}
          className="w-full text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw size={14} /> {t.doctorsFilter.reset}
        </button>
      </div>
    </form>
  );
}

export default DoctorsFilter;

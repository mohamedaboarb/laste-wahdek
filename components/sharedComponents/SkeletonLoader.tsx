import React from "react";

function SkeletonLoader() {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-[480px] animate-pulse">
      <div className="flex flex-col items-center text-center grow">
        {/* دائرة الصورة */}
        <div className="h-32 w-32 rounded-[2.5rem] bg-slate-100 mb-6" />

        {/* الاسم والتخصص */}
        <div className="space-y-3 w-full flex flex-col items-center">
          <div className="h-6 bg-slate-100 rounded-lg w-3/4" />
          <div className="h-4 bg-slate-50 rounded-lg w-1/2" />

          {/* النبذة */}
          <div className="space-y-2 mt-4 w-full">
            <div className="h-3 bg-slate-50 rounded-full w-full" />
            <div className="h-3 bg-slate-50 rounded-full w-5/6" />
          </div>
        </div>

        {/* الإحصائيات السفلية */}
        <div className="w-full pt-8 mt-auto border-t border-slate-50 flex justify-around">
          <div className="space-y-2">
            <div className="h-4 bg-slate-100 rounded w-8 mx-auto" />
            <div className="h-2 bg-slate-50 rounded w-12" />
          </div>
          <div className="h-8 w-px bg-slate-50" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-100 rounded w-8 mx-auto" />
            <div className="h-2 bg-slate-50 rounded w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;

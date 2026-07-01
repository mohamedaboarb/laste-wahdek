"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Calendar,
  ArrowRight,
  MoreVertical,
  UsersRound,
  UserRoundPlus,
  UserCircle2Icon,
} from "lucide-react";
import { differenceInYears, format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ChildDialog } from "./ChildDialog";
import {
  ChildFormValues,
  ProfileFormValues,
} from "@/features/dashboard/profile/motherSchema";
import { ImageUploader } from "../../ui/ImageUploader";
import { storageService } from "@/features/storage/storage.service";
import { toast } from "sonner";
import {
  deleteChild,
  updateChildImage,
} from "@/features/dashboard/profile/profile.service";
import { useLocale } from "@/contexts/locale-context";

interface Props {
  isEditing: boolean;
  onUploadingChange?: (uploading: boolean) => void;
}

function getChildAge(birthDate: ChildFormValues["birthDate"]): number | null {
  const date = new Date(birthDate);
  if (Number.isNaN(date.getTime())) return null;
  return Math.max(differenceInYears(new Date(), date), 0);
}

function formatChildBirthDate(birthDate: ChildFormValues["birthDate"]) {
  const date = new Date(birthDate);
  if (Number.isNaN(date.getTime())) return "-- / -- / ----";
  return format(date, "dd / MM / yyyy");
}

export function ChildrenSection({ isEditing, onUploadingChange }: Props) {
  const { control, watch, setValue, reset, getValues } =
    useFormContext<ProfileFormValues>();
  const { t } = useLocale();
  const c = t.profile.children;

  const children = watch("children") || [];
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "children",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<ChildFormValues | undefined>();
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [uploadingIndices, setUploadingIndices] = useState<Set<number>>(new Set());
  const [isDeletingChild, setIsDeletingChild] = useState(false);

  useEffect(() => {
    onUploadingChange?.(uploadingIndices.size > 0);
  }, [uploadingIndices.size, onUploadingChange]);

  function handleAddChild() {
    setSelectedIndex(null);
    setSelectedChild(undefined);
    setDialogOpen(true);
  }

  function handleEditChild(index: number) {
    setSelectedIndex(index);
    setSelectedChild(fields[index] as ChildFormValues);
    setDialogOpen(true);
  }

  function handleSaveChild(values: ChildFormValues) {
    if (selectedIndex !== null) {
      update(selectedIndex, values);
    } else {
      append(values);
    }
    setDialogOpen(false);
  }

  async function handleDelete() {
    if (deleteIndex === null || isDeletingChild) return;

    const child = children[deleteIndex];
    const capturedIndex = deleteIndex;

    setIsDeletingChild(true);
    try {
      if (child.image_url) {
        await storageService.deleteImage(child.image_url);
      }
      await deleteChild(child.id);
      remove(capturedIndex);
      reset(getValues());
      setDeleteIndex(null);
      toast.success("Child deleted successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete child.",
      );
    } finally {
      setIsDeletingChild(false);
    }
  }

  async function handleChildImageUpload(index: number, file: File) {
    if (uploadingIndices.has(index)) return;
    setUploadingIndices((prev) => new Set(prev).add(index));

    try {
      const child = children[index];
      if (!child || !child.id) {
        throw new Error("Please save the child first before uploading an image.");
      }

      const imagePath = await storageService.uploadImage({
        folder: "images",
        id: child.id,
        file,
      });

      const saved = await updateChildImage(child.id, imagePath);
      if (!saved) {
        console.warn(
          `Child ${child.id} is not yet in the database; image_url will be saved on next form submit.`,
        );
      }

      const uploadedAt = Date.now();
      setValue(`children.${index}.image_url`, imagePath, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue(`children.${index}.image_version`, uploadedAt, {
        shouldDirty: false,
      });

      toast.success("Image uploaded successfully.");

      storageService
        .cleanupFolder("images", child.id, imagePath)
        .catch((err) => console.warn("Failed to clean up old avatar files:", err));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload image.",
      );
    } finally {
      setUploadingIndices((prev) => {
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    }
  }

  return (
    <>
      <section className="rounded-[1.75rem] border border-pink-100 bg-white/95 p-4 shadow-[0_14px_45px_rgba(244,114,182,0.10)] sm:p-5 lg:p-6">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <UsersRound className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-md font-bold text-slate-950 md:text-2xl">
                  {c.title}
                </h2>
                <span className="rounded-full bg-pink-100 px-2.5 py-1 text-xs font-semibold text-pink-600">
                  {fields.length}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-slate-500">{c.subtitle}</p>
            </div>
          </div>

          {isEditing && (
            <Button
              type="button"
              onClick={handleAddChild}
              variant="outline"
              className="h-11 w-full rounded-xl border-pink-300 bg-white px-4 font-semibold text-pink-600 shadow-sm hover:bg-pink-50 hover:text-pink-700 sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              {c.addChild}
            </Button>
          )}
        </div>

        {fields.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-pink-200 bg-pink-50/30 px-5 py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-pink-500 shadow-sm">
              <UserCircle2Icon className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-slate-800">{c.noChildren}</h3>
            <p className="mt-2 max-w-md text-sm text-slate-500">{c.noChildrenSub}</p>
            {isEditing && (
              <Button
                type="button"
                className="mt-6 rounded-xl bg-pink-500 hover:bg-pink-600"
                onClick={handleAddChild}
              >
                <Plus className="h-4 w-4" />
                {c.addChild}
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {children.map((child, index) => {
              const age = getChildAge(child.birthDate);
              const ageText =
                age !== null
                  ? c.ageLabel.replace("{n}", String(age))
                  : "Age -";

              return (
                <div
                  key={child.id}
                  className="group relative flex flex-col rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-[0_20px_45px_rgba(244,114,182,0.12)]"
                >
                  {isEditing && (
                    <details className="absolute right-3 top-3">
                      <summary className="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-full text-slate-500 transition hover:bg-pink-50 hover:text-pink-600 [&::-webkit-details-marker]:hidden">
                        <MoreVertical className="h-4 w-4" />
                      </summary>
                      <div className="absolute right-0 z-20 mt-2 w-36 overflow-hidden rounded-xl border bg-white p-1 shadow-xl">
                        <button
                          type="button"
                          onClick={() => handleEditChild(index)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-pink-50 hover:text-pink-600"
                        >
                          <Pencil className="h-4 w-4" />
                          {c.edit}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteIndex(index)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          {c.delete}
                        </button>
                      </div>
                    </details>
                  )}

                  <div className="flex flex-col items-center text-center">
                    <ImageUploader
                      imageUrl={storageService.getPublicImageUrl(
                        child.image_url,
                        child.image_version,
                      )}
                      fallback={(child.fullName || "Child")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                      editable={isEditing}
                      loading={uploadingIndices.has(index)}
                      onChange={(file) => handleChildImageUpload(index, file)}
                    />

                    <h3 className="mt-4 text-sm font-semibold text-slate-950 lg:text-base">
                      {child.fullName}
                    </h3>

                    <span className="mt-2 inline-flex items-center rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600">
                      {ageText}
                    </span>

                    <div className="mt-3 flex items-center gap-1 text-sm text-slate-500">
                      <Calendar className="h-3.5 w-3.5 text-pink-500" />
                      {formatChildBirthDate(child.birthDate)}
                    </div>
                  </div>

                  <div className="mt-5 flex-1">
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {c.medicalSummary}
                      </p>
                      <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
                        {child.medicalSummary || c.noMedicalSummary}
                      </p>
                    </div>
                  </div>

                  {isEditing && (
                    <Button
                      type="button"
                      onClick={() => handleEditChild(index)}
                      variant="outline"
                      className="mt-5 h-9 rounded-xl border-pink-200 bg-pink-50 text-xs font-semibold text-pink-600 hover:bg-pink-100 hover:text-pink-700"
                    >
                      {c.viewProfile}
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              );
            })}

            {isEditing && (
              <button
                type="button"
                onClick={handleAddChild}
                className="group flex min-h-[280px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-pink-200 bg-pink-50/20 p-6 text-center transition-all hover:border-pink-300 hover:bg-pink-50"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-pink-500 shadow-sm">
                  <UserRoundPlus className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{c.addNewChild}</h3>
                <p className="mt-2 text-sm text-slate-500">{c.addNewChildSub}</p>
              </button>
            )}
          </div>
        )}
      </section>

      {/* ADD / EDIT */}
      <ChildDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        child={selectedChild}
        onSubmit={handleSaveChild}
      />

      {/* DELETE CONFIRMATION */}
      <AlertDialog
        open={deleteIndex !== null}
        onOpenChange={(open) => {
          if (!open && !isDeletingChild) setDeleteIndex(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{c.deleteTitle}</AlertDialogTitle>
            <AlertDialogDescription>{c.deleteDesc}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletingChild}>
              {t.common.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeletingChild}
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="gap-2"
            >
              {isDeletingChild && <Loader2 className="h-4 w-4 animate-spin" />}
              {isDeletingChild ? c.deleting : c.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

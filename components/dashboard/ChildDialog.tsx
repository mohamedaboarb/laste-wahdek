"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Baby, CalendarDays, FileText, UserRoundPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ChildFormValues,
  childSchema,
} from "@/app/dashboard/DashboardSchemas/motherSchema";
import { DatePickerField } from "./DatePicker";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  child?: ChildFormValues;
  onSubmit: (values: ChildFormValues) => void;
}

export function ChildDialog({ open, onOpenChange, child, onSubmit }: Props) {
  const form = useForm<ChildFormValues>({
    resolver: zodResolver(childSchema),
    defaultValues: {
      id: crypto.randomUUID(),
      fullName: "",
      birthDate: new Date(),
      medicalSummary: "",
      image_url: null,
    },
  });

  useEffect(() => {
    if (open) {
      if (child) {
        form.reset({
          ...child,
          // التأكد من تحويل التاريخ لكائن Date صالح لـ react-datepicker
          birthDate: child.birthDate ? new Date(child.birthDate) : new Date(),
        });
      } else {
        // في حالة طفل جديد، قم بتصفير الحقول تماماً وتوليد ID فريد جديد
        form.reset({
          id: crypto.randomUUID(),
          fullName: "",
          birthDate: new Date(),
          medicalSummary: "",
          image_url: null,
        });
      }
    }
  }, [child, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto rounded-3xl border-pink-100 bg-white p-0 shadow-[0_24px_70px_rgba(244,114,182,0.18)] sm:max-w-xl">
        <DialogHeader className="border-b border-pink-100 bg-gradient-to-br from-pink-50 via-white to-violet-50 px-5 py-5 text-left sm:px-6">
          <DialogDescription className="sr-only">Child form</DialogDescription>
          <div className="flex items-center gap-3 pr-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-pink-500 shadow-sm">
              {child ? (
                <Baby className="h-6 w-6" />
              ) : (
                <UserRoundPlus className="h-6 w-6" />
              )}
            </div>

            <div>
              <DialogTitle className="text-xl text-slate-950">
                {child ? "Edit Child Profile" : "Add New Child"}
              </DialogTitle>

              <p className="mt-1 text-sm text-slate-500">
                {child
                  ? "Update this child's medical profile."
                  : "Create another child's medical profile."}
              </p>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit(onSubmit)(e);
            }}
            className="space-y-5 px-5 py-5 sm:px-6"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700">
                    Child Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Baby className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-400" />
                      <Input
                        {...field}
                        className="h-12 rounded-xl border-slate-200 bg-slate-50/60 pl-11 shadow-sm transition focus-visible:border-pink-300 focus-visible:ring-pink-100"
                        placeholder="Omar Mohamed"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CalendarDays className="h-4 w-4 text-pink-400" />
                    Birth Date
                  </FormLabel>
                  <FormControl>
                    <DatePickerField
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicalSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <FileText className="h-4 w-4 text-pink-400" />
                    Medical Summary
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={5}
                      className="min-h-32 resize-none rounded-xl border-slate-200 bg-slate-50/60 shadow-sm transition focus-visible:border-pink-300 focus-visible:ring-pink-100"
                      placeholder="Allergies, medications, notes, or other relevant details."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-11 rounded-xl border-slate-200 px-5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-11 rounded-xl bg-pink-500 px-5 font-semibold hover:bg-pink-600"
              >
                Save Child
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

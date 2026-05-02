"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocale } from "@/contexts/locale-context"
import { useAuth } from "@/contexts/auth-context"
import { motherSchema, doctorSchema, type MotherFormData, type DoctorFormData } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Stethoscope, Plus, Trash2, ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

type Role = "mother" | "doctor"

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

export function RegistrationForm() {
  const { t, dir, locale } = useLocale()
  const { login } = useAuth()
  const router = useRouter()
  const [role, setRole] = useState<Role>("mother")
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(0)

  const isRTL = locale === "ar"
  const NextIcon = isRTL ? ChevronLeft : ChevronRight
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft

  // Mother form
  const motherForm = useForm<MotherFormData>({
    resolver: zodResolver(motherSchema),
    defaultValues: {
      role: "mother",
      fullName: "",
      email: "",
      password: "",
      nationalId: "",
      age: undefined,
      phone: "",
      chronicDiseases: [],
      generalHistory: "",
      mentalHealth: "",
      children: [{ name: "", age: undefined as unknown as number, diseaseHistory: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: motherForm.control,
    name: "children",
  })

  // Doctor form
  const doctorForm = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      role: "doctor",
      fullName: "",
      email: "",
      password: "",
      specialization: undefined,
      licenseId: "",
      bio: "",
    },
  })

  const motherSteps = [t.register.steps.step1, t.register.steps.step2, t.register.steps.step3]
  const doctorSteps = [t.register.steps.step1, t.register.steps.stepDoctor2]
  const currentSteps = role === "mother" ? motherSteps : doctorSteps
  const maxStep = currentSteps.length - 1

  const goNext = () => {
    if (step < maxStep) {
      setDirection(1)
      setStep(step + 1)
    }
  }

  const goPrev = () => {
    if (step > 0) {
      setDirection(-1)
      setStep(step - 1)
    }
  }

  const onMotherSubmit = (data: MotherFormData) => {
    login({
      id: "mom-new",
      name: data.fullName,
      email: data.email,
      role: "mother",
    })
    router.push("/dashboard/mom")
  }

  const onDoctorSubmit = (data: DoctorFormData) => {
    login({
      id: "doc-new",
      name: data.fullName,
      email: data.email,
      role: "doctor",
    })
    router.push("/dashboard/doctor")
  }

  const chronicOptions = [
    { value: "none", label: t.register.chronicOptions.none },
    { value: "diabetes", label: t.register.chronicOptions.diabetes },
    { value: "hypertension", label: t.register.chronicOptions.hypertension },
    { value: "thyroid", label: t.register.chronicOptions.thyroid },
    { value: "other", label: t.register.chronicOptions.other },
  ]

  const mentalOptions = [
    { value: "none", label: t.register.mentalOptions.none },
    { value: "anxiety", label: t.register.mentalOptions.anxiety },
    { value: "postpartum", label: t.register.mentalOptions.postpartum },
    { value: "depression", label: t.register.mentalOptions.depression },
    { value: "other", label: t.register.mentalOptions.other },
  ]

  return (
    <div dir={dir} className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
        >
          <h1 className="mb-6 text-center text-2xl font-bold text-primary">
            {t.register.title}
          </h1>

          {/* Role Selector */}
          <div className="mb-8">
            <p className="mb-3 text-center text-sm font-medium text-muted-foreground">
              {t.register.roleSelector.title}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { setRole("mother"); setStep(0) }}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                  role === "mother"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                <Heart className="h-8 w-8" fill={role === "mother" ? "currentColor" : "none"} />
                <span className="text-sm font-semibold">{t.register.roleSelector.mother}</span>
              </button>
              <button
                type="button"
                onClick={() => { setRole("doctor"); setStep(0) }}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                  role === "doctor"
                    ? "border-secondary bg-secondary/5 text-secondary"
                    : "border-border text-muted-foreground hover:border-secondary/30"
                }`}
              >
                <Stethoscope className="h-8 w-8" />
                <span className="text-sm font-semibold">{t.register.roleSelector.doctor}</span>
              </button>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="mb-8 flex items-center justify-center gap-2">
            {currentSteps.map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    i <= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className="hidden text-xs font-medium text-muted-foreground md:block">
                  {label}
                </span>
                {i < currentSteps.length - 1 && (
                  <div
                    className={`h-0.5 w-8 rounded ${
                      i < step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              {role === "mother" ? (
                <form
                  key={`mother-${step}`}
                  onSubmit={motherForm.handleSubmit(onMotherSubmit)}
                >
                  <motion.div
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    {step === 0 && (
                      <div className="flex flex-col gap-4">
                        <div>
                          <Label htmlFor="fullName">{t.register.fields.fullName}</Label>
                          <Input
                            id="fullName"
                            {...motherForm.register("fullName")}
                            className="mt-1.5"
                          />
                          {motherForm.formState.errors.fullName && (
                            <p className="mt-1 text-xs text-destructive">
                              {motherForm.formState.errors.fullName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="email">{t.register.fields.email}</Label>
                          <Input
                            id="email"
                            type="email"
                            {...motherForm.register("email")}
                            className="mt-1.5"
                          />
                          {motherForm.formState.errors.email && (
                            <p className="mt-1 text-xs text-destructive">
                              {motherForm.formState.errors.email.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="password">{t.register.fields.password}</Label>
                          <Input
                            id="password"
                            type="password"
                            {...motherForm.register("password")}
                            className="mt-1.5"
                          />
                          {motherForm.formState.errors.password && (
                            <p className="mt-1 text-xs text-destructive">
                              {motherForm.formState.errors.password.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="nationalId">{t.register.fields.nationalId}</Label>
                            <Input
                              id="nationalId"
                              {...motherForm.register("nationalId")}
                              className="mt-1.5"
                            />
                          </div>
                          <div>
                            <Label htmlFor="age">{t.register.fields.age}</Label>
                            <Input
                              id="age"
                              type="number"
                              {...motherForm.register("age")}
                              className="mt-1.5"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="phone">{t.register.fields.phone}</Label>
                          <Input
                            id="phone"
                            type="tel"
                            {...motherForm.register("phone")}
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="flex flex-col gap-4">
                        <div>
                          <Label>{t.register.fields.chronicDiseases}</Label>
                          <div className="mt-2 flex flex-wrap gap-3">
                            {chronicOptions.map((opt) => (
                              <label key={opt.value} className="flex items-center gap-2">
                                <Checkbox
                                  checked={motherForm.watch("chronicDiseases")?.includes(opt.value)}
                                  onCheckedChange={(checked) => {
                                    const current = motherForm.getValues("chronicDiseases") || []
                                    if (checked) {
                                      motherForm.setValue("chronicDiseases", [...current, opt.value])
                                    } else {
                                      motherForm.setValue(
                                        "chronicDiseases",
                                        current.filter((v) => v !== opt.value)
                                      )
                                    }
                                  }}
                                />
                                <span className="text-sm text-foreground">{opt.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="generalHistory">{t.register.fields.generalHistory}</Label>
                          <Textarea
                            id="generalHistory"
                            {...motherForm.register("generalHistory")}
                            className="mt-1.5"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>{t.register.fields.mentalHealth}</Label>
                          <Select
                            onValueChange={(val) => motherForm.setValue("mentalHealth", val)}
                            value={motherForm.watch("mentalHealth")}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {mentalOptions.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="flex flex-col gap-4">
                        {fields.map((field, index) => (
                          <div
                            key={field.id}
                            className="rounded-xl border border-border bg-background p-4"
                          >
                            <div className="mb-3 flex items-center justify-between">
                              <span className="text-sm font-semibold text-foreground">
                                {locale === "ar" ? `طفل ${index + 1}` : `Child ${index + 1}`}
                              </span>
                              {fields.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => remove(index)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="ms-1">{t.register.removeChild}</span>
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label>{t.register.fields.childName}</Label>
                                <Input
                                  {...motherForm.register(`children.${index}.name`)}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>{t.register.fields.childAge}</Label>
                                <Input
                                  type="number"
                                  {...motherForm.register(`children.${index}.age`)}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                            <div className="mt-3">
                              <Label>{t.register.fields.childHistory}</Label>
                              <Textarea
                                {...motherForm.register(`children.${index}.diseaseHistory`)}
                                className="mt-1"
                                rows={2}
                              />
                            </div>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => append({ name: "", age: 0, diseaseHistory: "" })}
                          className="gap-2 border-dashed border-primary text-primary"
                        >
                          <Plus className="h-4 w-4" />
                          {t.register.addChild}
                        </Button>
                      </div>
                    )}
                  </motion.div>

                  {/* Navigation Buttons */}
                  <div className="mt-8 flex items-center justify-between gap-3">
                    {step > 0 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={goPrev}
                        className="gap-1 text-foreground"
                      >
                        <PrevIcon className="h-4 w-4" />
                        {t.register.previous}
                      </Button>
                    ) : (
                      <div />
                    )}
                    {step < maxStep ? (
                      <Button
                        type="button"
                        onClick={goNext}
                        className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {t.register.next}
                        <NextIcon className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {t.register.submit}
                      </Button>
                    )}
                  </div>
                </form>
              ) : (
                <form
                  key={`doctor-${step}`}
                  onSubmit={doctorForm.handleSubmit(onDoctorSubmit)}
                >
                  <motion.div
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    {step === 0 && (
                      <div className="flex flex-col gap-4">
                        <div>
                          <Label htmlFor="docName">{t.register.fields.fullName}</Label>
                          <Input
                            id="docName"
                            {...doctorForm.register("fullName")}
                            className="mt-1.5"
                          />
                          {doctorForm.formState.errors.fullName && (
                            <p className="mt-1 text-xs text-destructive">
                              {doctorForm.formState.errors.fullName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="docEmail">{t.register.fields.email}</Label>
                          <Input
                            id="docEmail"
                            type="email"
                            {...doctorForm.register("email")}
                            className="mt-1.5"
                          />
                          {doctorForm.formState.errors.email && (
                            <p className="mt-1 text-xs text-destructive">
                              {doctorForm.formState.errors.email.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="docPassword">{t.register.fields.password}</Label>
                          <Input
                            id="docPassword"
                            type="password"
                            {...doctorForm.register("password")}
                            className="mt-1.5"
                          />
                          {doctorForm.formState.errors.password && (
                            <p className="mt-1 text-xs text-destructive">
                              {doctorForm.formState.errors.password.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="flex flex-col gap-4">
                        <div>
                          <Label>{t.register.fields.specialization}</Label>
                          <Select
                            onValueChange={(val) =>
                              doctorForm.setValue("specialization", val as "pediatrician" | "psychologist")
                            }
                            value={doctorForm.watch("specialization")}
                          >
                            <SelectTrigger className="mt-1.5">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pediatrician">
                                {t.register.fields.pediatrician}
                              </SelectItem>
                              <SelectItem value="psychologist">
                                {t.register.fields.psychologist}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {doctorForm.formState.errors.specialization && (
                            <p className="mt-1 text-xs text-destructive">
                              {doctorForm.formState.errors.specialization.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="licenseId">{t.register.fields.licenseId}</Label>
                          <Input
                            id="licenseId"
                            {...doctorForm.register("licenseId")}
                            className="mt-1.5"
                          />
                          {doctorForm.formState.errors.licenseId && (
                            <p className="mt-1 text-xs text-destructive">
                              {doctorForm.formState.errors.licenseId.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="bio">{t.register.fields.bio}</Label>
                          <Textarea
                            id="bio"
                            {...doctorForm.register("bio")}
                            className="mt-1.5"
                            rows={4}
                          />
                          {doctorForm.formState.errors.bio && (
                            <p className="mt-1 text-xs text-destructive">
                              {doctorForm.formState.errors.bio.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Navigation Buttons */}
                  <div className="mt-8 flex items-center justify-between gap-3">
                    {step > 0 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={goPrev}
                        className="gap-1 text-foreground"
                      >
                        <PrevIcon className="h-4 w-4" />
                        {t.register.previous}
                      </Button>
                    ) : (
                      <div />
                    )}
                    {step < maxStep ? (
                      <Button
                        type="button"
                        onClick={goNext}
                        className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {t.register.next}
                        <NextIcon className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {t.register.submit}
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t.register.alreadyHaveAccount}{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              {t.nav.login}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

import { Brain, Phone, ShieldCheck } from "lucide-react";

export type Locale = "ar" | "en";
export const defaultLocale: Locale = "en";

export const translations = {
  ar: {
    // Navigation
    nav: {
      home: "الرئيسية",
      register: "التسجيل",
      doctors: "الأطباء",
      dashboard: "لوحة التحكم",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      language: "English",
    },
    // Landing Page
    landing: {
      hero: {
        title: "لستِ وحدك",
        subtitle: "نحن نحتضن عائلتك",
        description:
          "انضمي لنظام رعاية حصري يجمعكِ بأفضل أطباء الأطفال والأطباء النفسيين لمتابعة عائلتكِ على مدار الساعة وتوفير رعاية شاملة لك ولطفلك",
        cta: "ابدئي رحلتك",
        ctaSecondary: "تعرفي على أطبائنا",
      },
      features: {
        title: "لماذا نحن",
        subtitle: "لأن صحة عائلتكِ تستحق أكثر من مجرد استشارة عابرة ",
        items: {
          feature1: {
            icon: ShieldCheck,
            title: "أطباء متخصصون",
            description: "نختار أطباءنا بعناية لضمان أفضل رعاية لك ولعائلتك",
          },
          feature2: {
            icon: Brain,
            title: "دعم نفسي",
            description: "أخصائيون نفسيون متخصصون في صحة الأم النفسية",
          },
          feature3: {
            icon: Phone,
            title: "طوارئ 24/7",
            description: "خط طوارئ متاح على مدار الساعة لراحة بالك",
          },
        },
      },
      howItWorks: {
        title: "كيف يعمل موقعنا",
        subtitle: "ودّعي الحيرة واستقبلي الراحة.. في أربع خطوات فقط.",
        items: {
          step1: {
            number: "الخطوة ١",
            bgNumber: "١",
            title: "سجلي حسابك",
            description: "أنشئي حسابك وأضيفي بياناتك وبيانات أطفالك",
          },
          step2: {
            number: "الخطوة ٢",
            bgNumber: "٢",
            title: "اختاري طبيبك",
            description:
              "تصفحي الأطباء من خلال مجموعة مختارة من أفضل الأطباء واختاري الأنسب لعائلتك",
          },
          step3: {
            number: "الخطوة ٣",
            bgNumber: "٣",
            title: "ابدئي جلساتك",
            description: "احصلي على جلستين مجانيتين عند انشاء حساب جديد",
          },
          step4: {
            number: "الخطوة ٤",
            bgNumber: "٤",
            title: " تواصلي مع طبيبك",
            description:
              "احصلي على خطتك العلاجية واستشارات خاصة ومباشرة مع أطبائك المعتمدين في مكان واحد لضمان خصوصيتك.",
          },
        },
      },
      specialists: {
        title: "قابلي أصدقاء عائلتكِ الجدد",
        subtitle: "صديقٌ بالرداء الأبيض ينتظركِ دائمًا لتقديم الدعم لأسرتكِ.",
        status: {
          available: "متاح الآن",
        },
        doctors: {
          youssef: {
            name: "د. يوسف أحمد",
            role: "أخصائي طب الأطفال",
            bio: "خبرة أكثر من ١٠ سنوات في تقديم الدعم الطبي والنفسي للأمهات والأطفال بأعلى معايير الجودة.",
          },
          mai: {
            name: "د. مي محمد",
            role: "أخصائى الطب النفسى",
            bio: "خبيرة في تقديم الاستشارات النفسية للأمهات وتطوير سلوك الطفل بأساليب حديثة وداعمة.",
          },
          hamed: {
            name: "د. محمد حامد",
            role: "أخصائي طب الأطفال",
            bio: "مختص في الرعاية الشاملة لحديثي الولادة ومتابعة النمو البدني والنفسي للأطفال.",
          },
        },
        cta: "اكتشفي كافة الأطباء",
      },
      services: {
        title: "خدماتنا المتميزة",
        subtitle:
          "رعاية طبية ونفسية شاملة مصممة خصيصاً لاحتياجاتكِ واحتياجات عائلتكِ.",
        items: {
          telemedicine: {
            title: "الاستشارات عن بُعد",
            description:
              "تواصلي فوراً مع أطباء معتمدين من راحة منزلكِ. وداعاً لغرف الانتظار الطويلة - احصلي على استشارتكِ الطبية عبر مكالمات فيديو عالية الجودة.",
            features: [
              "أطباء متاحون على مدار الساعة",
              "جلسات فيديو خاصة وآمنة تماماً",
              "وصفات طبية رقمية فورية",
            ],
          },
          pediatrics: {
            title: "رعاية الأطفال",
            description:
              "رعاية صحية شاملة لصغاركِ. من فحوصات حديثي الولادة إلى صحة المراهقين، يضمن أطباؤنا أن نمو طفلكِ يسير في المسار الصحيح.",
            features: [
              "متابعة النمو والتطور",
              "تذكير بمواعيد التطعيمات",
              "رعاية متخصصة لحديثي الولادة",
            ],
          },
          addiction: {
            title: "الصحة النفسية",
            description:
              "الصحة النفسية لا تقل أهمية عن الصحة البدنية. متخصصون في دعم ما بعد الولادة، إدارة التوتر، والفراغ العاطفي للأمهات.",
            features: [
              "دعم اكتئاب ما بعد الولادة",
              "إدارة القلق والتوتر",
              "جلسات إرشادية فردية وسرية",
            ],
          },
        },
      },
    },
    // Registration
    register: {
      title: "إنشاء حساب جديد",
      subtitle: "اختر نوع حسابك للبدء",
      roleSelector: {
        title: "نوع الحساب",
        mother: "أم",
        doctor: "طبيب",
      },
      steps: {
        step1: "البيانات الأساسية",
        stepDoctor2: "البيانات المهنية",
      },
      // الحقول المشتركة والأساسية للخطوة الأولى (صورة 1)
      fields: {
        fullName: "الاسم الكامل",
        fullNamePlaceholder: "أدخل اسمك الكامل",
        email: "البريد الإلكتروني",
        email_placeholder: "أدخل بريدك الإلكتروني",
        password: "كلمة المرور",
        confirmPassword: "تأكيد كلمة المرور",
        gender: "النوع",
        male: "ذكر",
        female: "أنثى",
      },
      specializationLabels: {
        pediatrician: "طب الأطفال",
        psychologist: "الطب النفسي",
      },
      scientificDegrees: {
        pediatrician: ["ممارس عام أطفال", "أخصائي", "استشاري"],
        psychologist: ["أخصائي نفسي", "طبيب نفسي"],
      },
      validation: {
        invalid_email: "البريد الإلكتروني غير صحيح",
        password_min: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
        password_uppercase: "يجب أن تحتوي على حرف كبير واحد على الأقل",
        password_number: "يجب أن تحتوي على رقم واحد على الأقل",
        password_special: "يجب أن تحتوي على رمز خاص واحد على الأقل",
        password_match: "كلمتا المرور غير متطابقتين",
        unknown: "حدث خطأ غير متوقع. يرجى المحاولة مجدداً",
        // الحقول الجديدة الخاصة بالأطباء
        name_min: "الاسم يجب أن يكون 3 أحرف على الأقل",
        name_max: "الاسم طويل جداً",
        gender_required: "يرجى تحديد الجنس",
        specialization_required: "يرجى اختيار التخصص",
        degree_required: "يرجى اختيار الدرجة العلمية",
        title_min: "العنوان المهني يجب أن يكون 5 أحرف على الأقل",
        title_max: "العنوان المهني طويل جداً",
        license_required: "رقم الترخيص الطبي مطلوب",
        license_invalid: "يجب أن يكون رقم الترخيص صالحًا وبحد أقصى 9 أرقام",
        bio_max: "النبذة لا تتجاوز 500 حرف",
        file_required: "يرجى رفع شهادة أو أكثر",
        file_size: "حجم كل ملف يجب أن لا يتجاوز 10 ميغابايت",
        file_type: "يُسمح فقط بملفات JPG, PNG, WEBP, أو PDF",
      },
      errors: {
        email_not_confirmed:
          "يرجى تأكيد بريدك الإلكتروني أولاً. تحقق من صندوق الوارد",
        email_taken: "البريد الإلكتروني مستخدم بالفعل",
        profile_insert_failed: "تعذّر حفظ بيانات الحساب. يرجى المحاولة مجدداً",
        license_taken: "رقم الترخيص الطبي هذا مسجل بالفعل",
        upload_failed: "تعذّر رفع الشهادات. يرجى المحاولة مجدداً",
        certificates_insert_failed:
          "تعذّر تسجيل الشهادات. يرجى المحاولة مجدداً",
        unknown: "حدث خطأ غير متوقع. يرجى المحاولة مجدداً",
        authLinkInvalidTitle: "فشل تأكيد الحساب",
        authLinkInvalidDesc:
          "رابط التأكيد هذا غير صالح أو انتهت صلاحيته. قد يكون الرابط قد استُخدم بالفعل، أو مضى عليه وقت طويل.",
        backToLogin: "العودة لصفحة تسجيل الدخول",
      },
      // 🌟 التحسين: إضافة حقول الطبيب الحصرية (صورة 2) للوضوح ومنع الخلط
      doctorFields: {
        specialization: "التخصص",
        selectSpecialization: "اختر تخصصك",
        scientificDegree: "الدرجة العلمية",
        selectDegreeFirst: "اختر التخصص أولاً",
        degreeHint: ".سيتم تفعيل هذا الحقل بعد اختيار التخصص",
        professionalTitle: "العنوان المهني",
        professionalTitlePlaceholder:
          "مثال: دكتور نفسي أخصائي توحد وتأهيل أسري",
        professionalTitleHint: "العنوان الذي سيظهر في ملفك الشخصي للأمهات.",
        medicalLicenseNumber: "رقم الترخيص الطبي",
        medicalLicenseNumberPlaceholder: "أدخل رقم الترخيص",
        bio: "نبذة عنك",
        bioOptional: "اختياري",
        bioPlaceholder: "...اكتب نبذة مختصرة عن خبرتك وأسلوب عملك",
        bioHint: "حد أقصى 500 حرف",
        certificates: "الشهادات والمؤهلات",
        uploadZoneText: "اسحب الملفات هنا أو ",
        uploadZoneLink: "اختر من جهازك",
        uploadZoneHint: "بحد أقصى 10 ميغابايت لكل ملف — JPG, PNG, WEBP, PDF",
        back: "رجوع",
      },
      addChild: "إضافة طفل آخر",
      removeChild: "إزالة",
      checkEmail:
        "لقد أرسلنا رابط تفعيل الحساب إلى البريد الإلكتروني الذي قمت بإدخاله. يرجى الضغط على الرابط لتفعيل حسابك والبدء في استخدام التطبيق.",
      checkEmailButton: "تفقد بريدك",
      next: "التالي",
      previous: "السابق",
      submit: "إنشاء الحساب",
      submitting: "جاري إنشاء الحساب...",
      submitted: "تم إنشاء حسابك بنجاح!",
      submitLink:
        "تم إرسال رابط التأكيد إلى بريدك الإلكتروني بنجاح. يرجى تفقده لتفعيل حسابك.",
      alreadyHaveAccount: "لديك حساب بالفعل؟",
      signInLink: "تسجيل الدخول",
    },
    doctors: {
      title: "اكتشفي أطبائنا",
      subtitle: "اختاري الطبيب المناسب لعائلتك",
      filterAll: "الكل",
      filterPediatrician: "أطباء أطفال",
      filterPsychologist: "أخصائيون نفسيون",
      capacity: "العائلات",
      full: "مكتمل",
      subscribe: "اشتراك",
      available: "متاح",
    },
    stats: {
      rating: "التقييم",
      experience: "سنوات الخبرة",
    },
    booking: {
      selectDoctor: "اختاري طبيبك",
      title: "احجزي موعدك",
      slogan: "اختاري الموعد المفضل لديك لبدء رحلة الرعاية.",
      selectDateAndTime: "اختاري التاريخ والوقت",
      labels: {
        appointementSet: "الموعد محدد ليوم",
        book: "تأكيد الحجز",
        busy: "الطبيب غير متاح في هذا الوقت، يرجى اختيار وقت آخر",
      },
      modals: {
        limitReached:
          "يمكنك حجز مواعيد مع الاطباء المخصصين لك فقط، يرجى إلغاء حجز أحد الأطباء الحاليين إذا كنتِ ترغبين في الاشتراك مع طبيب جديد",
        specialtyConflict: "لديكِ طبيب بنفس التخصص",
        confirmFree: "سيتم خصم جلسة من رصيدك المجاني",
        confirmPaid: "سيتم الحجز بنظام الدفع العادي",
      },
    },
    momDashboard: {
      welcome: "مرحباً",
      sessionsRemaining: "الجلسات المتبقية",
      sessionsOf: "من",
      myDoctors: "أطبائي",
      myChildren: "أطفالي",
      emergencyButton: "طوارئ 24/7",
      emergencyTitle: "خط الطوارئ",
      emergencyDesc: "اتصلي الآن للحصول على مساعدة فورية",
      callNow: "اتصلي الآن",
      noDoctors: "لم تشتركي مع أي طبيب بعد",
      upgradeTitle: "ترقية الاشتراك",
      upgradeDesc: "لقد استنفدتِ جلساتك المجانية. يرجى الترقية للاستمرار",
      upgrade: "ترقية",
      medicalHistory: "التاريخ الطبي",
    },
    doctorDashboard: {
      welcome: "مرحباً دكتور",
      assignedFamilies: "العائلات المسجلة",
      familiesCount: "عائلة",
      viewHistory: "عرض التاريخ الطبي",
      noFamilies: "لا توجد عائلات مسجلة حالياً",
      childrenOf: "أطفال",
      motherInfo: "بيانات الأم",
    },
    login: {
      title: "مرحباً بعودتك",
      subtitle: "سجلي دخولك للمتابعة",
      email: "البريد الإلكتروني",
      email_placeholder: "أدخل بريدك الإلكتروني",
      password_placeholder: "أدخل كلمة المرور",
      emailInvalid: "صيغة البريد الإلكتروني غير صحيحة",
      emailRequired: "البريد الإلكتروني مطلوب",
      passwordMin: "كلمة المرور يجب أن تكون على الأقل 8 أحرف",
      password: "كلمة المرور",
      forgot_password: "نسيت كلمة المرور؟",
      submit: "تسجيل الدخول",
      submitting: "جارٍ التحقق...",
      no_account: "ليس لديك حساب؟",
      register: "إنشاء حساب",
      reset_sent: "تم إرسال رابط إعادة التعيين إلى بريدك.",
      errors: {
        email_not_confirmed:
          "يرجى تأكيد بريدك الإلكتروني أولاً. تحقق من صندوق الوارد",
        invalid_credentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
        pending_approval: "حسابك قيد المراجعة. سيتم إخطارك عند التفعيل.",
        suspended: "تم تعليق حسابك. تواصل مع الدعم.",
        profile_missing: "تعذّر تحميل بيانات حسابك. تواصل مع الدعم.",
        unknown: "حدث خطأ غير متوقع. يرجى المحاولة مجدداً.",
        reset_failed: "تعذّر إرسال رابط إعادة التعيين.",
        email_required: "أدخل بريدك الإلكتروني أولاً.",
      },
    },
    forgotPassword: {
      back_to_login: "العودة لتسجيل الدخول",
      back: "رجوع",

      step1: {
        title: "نسيت كلمة المرور؟",
        subtitle: "أدخل بريدك الإلكتروني وسنرسل لك رمز التحقق",
        email_label: "البريد الإلكتروني",
        email_placeholder: "example@domain.com",
        submit: "إرسال رمز التحقق",
      },

      step2: {
        title: "تحقق من بريدك",
        subtitle: "أرسلنا رمزاً مكوناً من 6 أرقام إلى",
        submit: "تحقق من الرمز",
        resend_code: "إعادة إرسال الرمز",
        resend_in: "إعادة الإرسال بعد",
      },

      step3: {
        title: "كلمة مرور جديدة",
        subtitle: "أنشئ كلمة مرور قوية لحسابك",
        submit: "حفظ كلمة المرور",
      },

      step4: {
        title: "تم بنجاح",
        subtitle:
          "تم تغيير كلمة مرورك بنجاح. يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة",
        back_to_login: "تسجيل الدخول",
      },

      errors: {
        // Zod field-level
        email_required: "البريد الإلكتروني مطلوب",
        email_invalid: "البريد الإلكتروني غير صحيح",
        otp_required: "رمز التحقق مطلوب",
        otp_length: "رمز التحقق يجب أن يكون 6 أرقام",
        otp_digits_only: "رمز التحقق يجب أن يحتوي على أرقام فقط",
        password_required: "كلمة المرور مطلوبة",
        password_min: "كلمة المرور يجب أن تكون 8 أحرف على الأقل",
        password_uppercase: "يجب أن تحتوي على حرف كبير واحد على الأقل",
        password_number: "يجب أن تحتوي على رقم واحد على الأقل",
        password_symbol: "يجب أن تحتوي على رمز خاص واحد على الأقل",
        password_mismatch: "كلمتا المرور غير متطابقتين",
        // API-level
        api_send_failed: "تعذّر إرسال رمز التحقق. يرجى المحاولة مجدداً",
        api_email_not_found: "البريد الإلكتروني غير مسجّل",
        otp_invalid: "رمز التحقق غير صحيح",
        otp_expired: "انتهت صلاحية الرمز. يرجى طلب رمز جديد",
        update_failed: "تعذّر تحديث كلمة المرور. يرجى المحاولة مجدداً",
      },
    },
    common: {
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      close: "إغلاق",
      years: "سنوات",
      save: "حفظ",
      cancel: "إلغاء",
      orContinueWith: "أو",
      googleSignIn: "تسجيل الدخول باستخدام جوجل",
      exceed: "يتجاوز",
      unsupportedFile: "نوع الملف غير مدعوم",
    },
    signupAlerts: {
      applicationSent: "تم إرسال طلبك بنجاح! 🎉",
      applicationSentDesc:
        " شكراً لتسجيلك. سيخضع حسابك لمراجعة الإدارة وسيتم إخطارك عبر البريد الإلكتروني خلال 48 ساعة.",
      doctorAlert: "سيخضع حساب الطبيب لمراجعة الإدارة قبل التفعيل.",
      passwordClarification:
        "كلمة المرور يجب أن تكون 8 أحرف على الأقل ويجب أن تحتوي على حرف كبير، رقم، ورمز خاص.",
      backHome: "back to home",
    },
    doctorsFilter: {
      name: "اسم الطبيب",
      gender: {
        title: "الجنس",
        male: "ذكر",
        female: "أنثى",
      },
      specialization: {
        title: "التخصص",
        pediatrician: "أطباء أطفال",
        psychologist: "أخصائيون نفسيون",
        all: "الكل",
      },
      experience: {
        title: "الخبرة",
        years: "سنوات",
        any: "أي خبرة",
      },
      apply: "تطبيق الفلترة",
      reset: "إعادة الضبط",
    },
    DoctorCard: {
      status: {
        available: "متاح للحجز",
        full: "مكتمل العدد",
      },
      labels: {
        experienceYears: "سنوات الخبرة",
        currentFamilies: "العائلات الحالية",
        professionalCredentials: "بيانات الاعتماد المهني",
        bio: "النبذة التعريفية",
      },
      actions: {
        startJourney: "بدء رحلة الرعاية الآن ←",
        waitingList: "سيتم فتح باب الحجز فور توفر مقعد",
      },
    },
    Specialties: {
      pediatrician: "طبيب أطفال",
      psychologist: "أخصائي نفسي",
    },
  },
  en: {
    nav: {
      home: "Home",
      register: "Register",
      doctors: "Doctors",
      dashboard: "Dashboard",
      login: "Login",
      logout: "Logout",
      language: "العربية",
    },
    landing: {
      hero: {
        title: "Laste Wahdek",
        subtitle: "We Hold Your Family",
        description:
          "Join an exclusive care system that connects you with top pediatricians and psychologists to support your family and provide comprehensive care for you and your child.",
        cta: "Start Your Journey",
        ctaSecondary: "Meet Our Doctors",
      },
      features: {
        title: "Why Us",
        subtitle: "Because Your family’s health deserves more than a quick fix",
        items: {
          feature1: {
            icon: ShieldCheck,
            title: "Specialized Doctors",
            description:
              "We carefully select our doctors to ensure the best care for you and your family",
          },
          feature2: {
            icon: Brain,
            title: "Mental Health Support",
            description: "Psychologists specialized in maternal mental health",
          },
          feature3: {
            icon: Phone,
            title: "24/7 Emergency",
            description:
              "Emergency line available around the clock for your peace of mind",
          },
        },
      },
      howItWorks: {
        title: "How It Works",
        subtitle: "from worry to wellness in just four simple steps",
        items: {
          step1: {
            number: "Step 1",
            bgNumber: "01",
            title: "Create Your Account",
            description:
              "Set up your profile and securely add your family and children's details.",
          },
          step2: {
            number: "Step 2",
            bgNumber: "02",
            title: "Choose Your Doctor",
            description:
              "Browse through our handpicked selection of top-tier specialists and select the best match for your family's needs.",
          },
          step3: {
            number: "Step 3",
            bgNumber: "03",
            title: "Start Your Sessions",
            description:
              "Get two free consultations instantly when you create a new account.",
          },
          step4: {
            number: "Step 4",
            bgNumber: "04",
            title: "Integrated Care & Direct Access",
            description:
              "Receive your digital care plan and private consultations with certified doctors, all in one secure place.",
          },
        },
      },
      specialists: {
        title: "Meet Your Family’s New Friends",
        subtitle:
          "A friend in a white coat is always here to support your family.",
        status: {
          available: "Available Now",
        },
        doctors: {
          youssef: {
            name: "Dr. Youssef Ahmed",
            role: "Pediatric Specialist",
            bio: "Over 10 years of experience providing high-quality medical and psychological support for mothers and children.",
          },
          mai: {
            name: "Dr. Mai Mohamed",
            role: "psychologist Specialist",
            bio: "Expert in offering psychological consultations for mothers and developing children’s behavior using modern and supportive methods.",
          },
          hamed: {
            name: "Dr. Mohamed Hamed",
            role: "Pediatric Specialist",
            bio: "Specialized in comprehensive care for newborns and monitoring children’s physical and psychological development.",
          },
        },
        cta: "Explore All Doctors",
      },
      services: {
        title: "Our Premium Services",
        subtitle:
          "Comprehensive medical and psychological care tailored to your and your family's needs.",
        items: {
          telemedicine: {
            title: "Telemedicine",
            description:
              "Connect instantly with certified doctors from the comfort of your home. No more long waiting rooms—get medical advice via high-quality video calls.",
            features: [
              "24/7 On-call doctors",
              "Private & Secure video sessions",
              "Instant digital prescriptions",
            ],
          },
          pediatrics: {
            title: "Pediatric Care",
            description:
              "Comprehensive healthcare for your little ones. From newborn checkups to adolescent health, our pediatricians ensure your child's growth is on the right track.",
            features: [
              "Growth & Development tracking",
              "Vaccination reminders",
              "Specialized infant care",
            ],
          },
          addiction: {
            title: "Psychology",
            description:
              "Mental wellness is just as important as physical health. Our psychologists specialize in postpartum support, stress management, and emotional well-being for mothers.",
            features: [
              "Postpartum depression support",
              "Stress & Anxiety management",
              "Confidential 1-on-1 counseling",
            ],
          },
        },
      },
    },
    register: {
      title: "Create New Account",
      subtitle: "Choose Your Account Type to Get Started",
      roleSelector: {
        title: "account type",
        mother: "Mother",
        doctor: "Doctor",
      },
      steps: {
        step1: "Basic Information",
        stepDoctor2: "Professional Information",
      },
      fields: {
        fullName: "Full Name",
        fullNamePlaceholder: "Enter your full name",
        email: "Email Address",
        email_placeholder: "Enter Email Address",
        password: "Password",
        confirmPassword: "Confirm Password",
        gender: "Gender",
        male: "Male",
        female: "Female",
      },
      specializationLabels: {
        pediatrician: "Pediatrics",
        psychologist: "psychologist",
      },
      scientificDegrees: {
        pediatrician: ["General Pediatrician", "Specialist", "Consultant"],
        psychologist: ["specialized", "Psychiatrist"],
      },
      validation: {
        invalid_email: "Invalid email address",
        password_min: "Password must be at least 8 characters",
        password_uppercase: "Must contain at least one uppercase letter",
        password_number: "Must contain at least one number",
        password_special: "Must contain at least one special character",
        password_match: "Passwords do not match",
        unknown: "An unexpected error occurred. Please try again",
        //Doctor Fields
        name_min: "Name must be at least 3 characters",
        name_max: "Name is too long",
        gender_required: "Please select your gender",
        specialization_required: "Please select a specialization",
        degree_required: "Please select a scientific degree",
        title_min: "Professional title must be at least 5 characters",
        title_max: "Professional title is too long",
        license_required: "Medical license number is required",
        license_invalid: "must be a valid license number with up to 9 digits",
        bio_max: "Bio cannot exceed 500 characters",
        file_required: "Please upload at least one certificate",
        file_size: "Each file size must not exceed 10 MB",
        file_type: "Only JPG, PNG, WEBP, or PDF files are allowed",
      },
      errors: {
        email_not_confirmed:
          "Please confirm your email first. Check your inbox",
        email_taken: "Email is already in use",
        profile_insert_failed: "Failed to save account data. Please try again",
        license_taken: "This medical license number is already registered",
        upload_failed: "Failed to upload certificates. Please try again",
        certificates_insert_failed:
          "Failed to register certificates. Please try again",
        unknown: "An unexpected error occurred. Please try again",
        authLinkInvalidTitle: "Account Confirmation Failed",
        authLinkInvalidDesc:
          "This confirmation link is invalid or has expired. It may have already been used, or it has been too long since it was issued.",
        backToLogin: "Back to Login",
      },
      doctorFields: {
        specialization: "Specialization",
        selectSpecialization: "Select Specialization",
        scientificDegree: "Scientific Degree",
        selectDegreeFirst: "Select specialization first",
        degreeHint:
          "This field will be activated after selecting a specialization.",
        professionalTitle: "Professional Title",
        professionalTitlePlaceholder:
          "e.g., Psychologist specializing in autism and family rehabilitation",
        professionalTitleHint:
          "The title that will appear in your profile to mothers.",
        medicalLicenseNumber: "Medical License Number",
        medicalLicenseNumberPlaceholder: "Enter license number",
        bio: "About You",
        bioOptional: "Optional",
        bioPlaceholder:
          "...Write a brief overview of your experience and work approach",
        bioHint: "Max 500 characters",
        certificates: "Certificates and Qualifications",
        uploadZoneText: "Drag files here or",
        uploadZoneLink: "choose from your device",
        uploadZoneHint: "Max 10 MB per file — JPG, PNG, WEBP, PDF",
        back: "Back",
      },
      addChild: "Add Another Child",
      removeChild: "Remove",
      checkEmail:
        "We've sent an account activation link to the email you provided. Please click the link to activate your account and start using the app.",
      checkEmailButton: "Check Email",
      next: "Next",
      previous: "Previous",
      submit: "Create Account",
      submitting: "Creating Account...",
      submitted: "Your account has been created successfully",
      submitLink:
        "Confirmation link has been sent to your email successfully. Please check it to activate your account.",
      alreadyHaveAccount: "Already have an account?",
      signInLink: "Sign in",
    },
    doctors: {
      title: "Discover Our Doctors",
      subtitle: "Choose the right doctor for your family",
      filterAll: "All",
      filterPediatrician: "Pediatricians",
      filterPsychologist: "Psychologists",
      capacity: "Families",
      full: "Full",
      subscribe: "Subscribe",
      available: "Available",
    },
    stats: {
      rating: "Rating",
      experience: "Years Of Experience",
    },
    booking: {
      selectDoctor: "choose Doctor",
      slogan: "Choose your preferred appointment to start your care journey.",
      title: "Make Your Booking",
      selectDateAndTime: "Select Date and Time",
      labels: {
        appointementSet: "Appointement is set for",
        book: "Confirm Booking",
        busy: "Doctor is not available at this time, please choose another time",
      },
      modals: {
        limitReached:
          "You can only book appointments with your assigned doctors, please cancel one of your current doctors if you wish to subscribe to a new one",
        specialtyConflict:
          "You already have a doctor with the same specialization",
        confirmFree: "A session will be deducted from your free balance",
        confirmPaid: "The booking will be made on the regular payment system",
      },
    },
    momDashboard: {
      welcome: "Welcome",
      sessionsRemaining: "Sessions Remaining",
      sessionsOf: "of",
      myDoctors: "My Doctors",
      myChildren: "My Children",
      emergencyButton: "24/7 Emergency",
      emergencyTitle: "Emergency Line",
      emergencyDesc: "Call now for immediate assistance",
      callNow: "Call Now",
      noDoctors: "You haven't subscribed to any doctor yet",
      upgradeTitle: "Upgrade Subscription",
      upgradeDesc:
        "You've used all your free sessions. Please upgrade to continue",
      upgrade: "Upgrade",
      medicalHistory: "Medical History",
    },
    doctorDashboard: {
      welcome: "Welcome Dr.",
      assignedFamilies: "Assigned Families",
      familiesCount: "families",
      viewHistory: "View Medical History",
      noFamilies: "No assigned families yet",
      childrenOf: "Children of",
      motherInfo: "Mother Info",
    },
    login: {
      title: "Welcome Back",
      subtitle: "Sign in to continue",
      email: "Email Address",
      email_placeholder: "Enter Email Address",
      password_placeholder: "Enter Password",
      emailInvalid: "Invalid email address",
      emailRequired: "Email address is required",
      passwordMin: "Password must be at least 8 characters",
      password: "Password",
      forgot_password: "Forgot password?",
      submit: "Login",
      submitting: "Verifying...",
      no_account: "Don't have an account?",
      register: "Create an account",
      reset_sent: "Reset link has been sent to your email.",
      errors: {
        email_not_confirmed:
          "Please confirm your email first. Check your inbox",
        invalid_credentials: "Incorrect email or password.",
        pending_approval:
          "Your account is under review. You will be notified once activated.",
        suspended: "Your account has been suspended. Please contact support.",
        profile_missing:
          "Failed to load account profile data. Please contact support.",
        unknown: "An unexpected error occurred. Please try again.",
        reset_failed: "Failed to send password reset link.",
        email_required: "Please enter your email address first.",
      },
    },
    forgotPassword: {
      back_to_login: "Back to login",
      back: "Back",

      step1: {
        title: "Forgot your password?",
        subtitle: "Enter your email and we'll send you a verification code",
        email_label: "Email address",
        email_placeholder: "example@domain.com",
        submit: "Send verification code",
      },

      step2: {
        title: "Check your email",
        subtitle: "We sent a 6-digit code to",
        submit: "Verify code",
        resend_code: "Resend code",
        resend_in: "Resend in",
      },

      step3: {
        title: "Create new password",
        subtitle: "Create a strong password for your account",
        submit: "Save password",
      },

      step4: {
        title: "All done",
        subtitle:
          "Your password has been successfully reset. You can now sign in with your new password",
        back_to_login: "Back to login",
      },

      errors: {
        // Zod field-level
        email_required: "Email is required",
        email_invalid: "Please enter a valid email address",
        otp_required: "Verification code is required",
        otp_length: "Code must be exactly 6 digits",
        otp_digits_only: "Code must contain digits only",
        password_required: "Password is required",
        password_min: "Password must be at least 8 characters",
        password_uppercase: "Must contain at least one uppercase letter",
        password_number: "Must contain at least one number",
        password_symbol: "Must contain at least one special character",
        password_mismatch: "Passwords do not match",
        // API-level
        api_send_failed: "Failed to send the code. Please try again",
        api_email_not_found: "This email address is not registered",
        otp_invalid: "Invalid verification code",
        otp_expired: "Code has expired. Please request a new one",
        update_failed: "Failed to update password. Please try again",
      },
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      close: "Close",
      years: "years",
      save: "Save",
      cancel: "Cancel",
      orContinueWith: "or",
      googleSignIn: "Sign in with Google",
      exceed: "exceed",
      unsupportedFile: "Unsupported file type",
    },
    signupAlerts: {
      applicationSent: "Your application has been sent successfully",
      applicationSentDesc:
        "Thank you for signing up. Your account will undergo admin review and you will be notified via email within 48 hours.",
      doctorAlert:
        "Doctor accounts will be reviewed by admin before activation .",
      passwordClarification:
        "Password must be at least 8 characters, including an uppercase letter, a number, and a special character.",
      backHome: "Back to Home",
    },
    doctorsFilter: {
      name: "Name",
      gender: {
        title: "Gender",
        male: "Male",
        female: "Female",
      },
      specialization: {
        title: "Specialization",
        pediatrician: "Pediatrician",
        psychologist: "Psychologist",
        all: "All",
      },
      experience: {
        title: "Experience",
        years: "Years",
        any: "Any",
      },
      apply: "Apply Filters",
      reset: "Reset",
    },
    DoctorCard: {
      status: {
        available: "Available",
        full: "Fully Booked",
      },
      labels: {
        currentFamilies: "Current Families",
        professionalCredentials: "Professional Credentials",
        bio: "About the Doctor",
      },
      actions: {
        startJourney: "Start Care Journey Now →",
        waitingList: "Booking will open as soon as a slot is available",
      },
    },
    Specialties: {
      pediatrician: "Pediatrician",
      psychologist: "Psychologist",
    },
  },
} as const;

export type TranslationKeys = typeof translations.en;

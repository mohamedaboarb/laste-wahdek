import { Brain, Phone, ShieldCheck } from "lucide-react";
import { Allan } from "next/font/google";
import { title } from "process";
import { number } from "zod";

export type Locale = "ar" | "en";

export const defaultLocale: Locale = "ar";

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
            title: "  تواصلي مع طبيبك",
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
          psychology: {
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
      roleSelector: {
        title: "أنا...",
        mother: "أم",
        doctor: "طبيب/ة",
      },
      steps: {
        step1: "البيانات الأساسية",
        step2: "البيانات الصحية",
        step3: "بيانات الأطفال",
        stepDoctor2: "البيانات المهنية",
      },
      fields: {
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        nationalId: "الرقم القومي",
        age: "العمر",
        phone: "رقم الموبايل",
        chronicDiseases: "أمراض مزمنة",
        generalHistory: "التاريخ المرضي العام",
        mentalHealth: "الحالة النفسية الحالية",
        childName: "اسم الطفل",
        childAge: "عمر الطفل",
        childHistory: "التاريخ المرضي للطفل",
        specialization: "التخصص",
        licenseId: "رقم الترخيص",
        bio: "نبذة عنك",
        pediatrician: "طبيب أطفال",
        psychologist: "أخصائي نفسي",
      },
      chronicOptions: {
        none: "لا يوجد",
        diabetes: "سكر",
        hypertension: "ضغط",
        thyroid: "غدة درقية",
        other: "أخرى",
      },
      mentalOptions: {
        none: "لا أعاني من شيء",
        anxiety: "قلق",
        postpartum: "اكتئاب ما بعد الولادة",
        depression: "اكتئاب",
        other: "أخرى",
      },
      addChild: "إضافة طفل آخر",
      removeChild: "إزالة",
      next: "التالي",
      previous: "السابق",
      submit: "إنشاء الحساب",
      alreadyHaveAccount: "لديك حساب بالفعل؟",
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
    // Mother Dashboard
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
    // Doctor Dashboard
    doctorDashboard: {
      welcome: "مرحباً دكتور",
      assignedFamilies: "العائلات المسجلة",
      familiesCount: "عائلة",
      viewHistory: "عرض التاريخ الطبي",
      noFamilies: "لا توجد عائلات مسجلة حالياً",
      childrenOf: "أطفال",
      motherInfo: "بيانات الأم",
    },
    // Login
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
      remember_me: "تذكّرني",
      forgot_password: "نسيت كلمة المرور؟",
      submit: "تسجيل الدخول",
      submitting: "جارٍ التحقق...",
      no_account: "ليس لديك حساب؟",
      register: "إنشاء حساب",
      reset_sent: "تم إرسال رابط إعادة التعيين إلى بريدك.",
      errors: {
        invalid_credentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
        pending_approval: "حسابك قيد المراجعة. سيتم إخطارك عند التفعيل.",
        suspended: "تم تعليق حسابك. تواصل مع الدعم.",
        profile_missing: "تعذّر تحميل بيانات حسابك. تواصل مع الدعم.",
        unknown: "حدث خطأ غير متوقع. يرجى المحاولة مجدداً.",
        reset_failed: "تعذّر إرسال رابط إعادة التعيين.",
        email_required: "أدخل بريدك الإلكتروني أولاً.",
      },
    },
    // Common
    common: {
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      close: "إغلاق",
      years: "سنوات",
      save: "حفظ",
      cancel: "إلغاء",
    },
    // Doctors Filter
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
          "Join an exclusive care system that connects you with top pediatricians and psychologists to support your family  and provide comprehensive care for you and your child.",
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
            role: "Psychiatry Specialist",
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
          psychology: {
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
      roleSelector: {
        title: "I am a...",
        mother: "Mother",
        doctor: "Doctor",
      },
      steps: {
        step1: "Basic Information",
        step2: "Health Information",
        step3: "Children Data",
        stepDoctor2: "Professional Info",
      },
      fields: {
        fullName: "Full Name",
        email: "Email Address",
        password: "Password",
        nationalId: "National ID",
        age: "Age",
        phone: "Mobile Phone",
        chronicDiseases: "Chronic Diseases",
        generalHistory: "General Medical History",
        mentalHealth: "Current Mental Health",
        childName: "Child's Name",
        childAge: "Child's Age",
        childHistory: "Child's Medical History",
        specialization: "Specialization",
        licenseId: "License ID",
        bio: "About You",
        pediatrician: "Pediatrician",
        psychologist: "Psychologist",
      },
      chronicOptions: {
        none: "None",
        diabetes: "Diabetes",
        hypertension: "Hypertension",
        thyroid: "Thyroid",
        other: "Other",
      },
      mentalOptions: {
        none: "No issues",
        anxiety: "Anxiety",
        postpartum: "Postpartum Depression",
        depression: "Depression",
        other: "Other",
      },
      addChild: "Add Another Child",
      removeChild: "Remove",
      next: "Next",
      previous: "Previous",
      submit: "Create Account",
      alreadyHaveAccount: "Already have an account?",
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
      email: "ُEmail Address",
      email_placeholder: "Enter Email Address",
      password_placeholder: "Enter Password",
      emailInvalid: "Invalid email address",
      emailRequired: "Email address is required",
      passwordMin: "Password must be at least 8 characters",
      password: "Password",
      remember_me: "Remember me",
      forgot_password: "Forgot password?",
      submit: "Login",
      submitting: "Verifying...",
      no_account: "Don't have an account?",
      register: "Create an account",
      reset_sent: "Reset link has been sent to your email.",
      errors: {
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
    common: {
      loading: "Loading...",
      error: "An error occurred",
      close: "Close",
      years: "years",
      save: "Save",
      cancel: "Cancel",
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

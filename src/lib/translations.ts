/*
 * MedCare-AI - Humanitarian AI Platform for Rural Healthcare
 * 
 * Owner: Fahed Mlaiel
 * Contact: mlaiel@live.de
 * Notice: Attribution to Fahed Mlaiel is mandatory in all copies, forks, and derivatives.
 * 
 * This technology must always be provided for free under humanitarian license.
 */

export interface Translations {
  // App Header
  appTitle: string
  appSubtitle: string
  doctorPortal: string
  freeOpenSource: string
  
  // Medical Disclaimer
  medicalDisclaimer: string
  medicalDisclaimerText: string
  understood: string
  
  // Welcome Section
  welcomeTitle: string
  welcomeDescription: string
  
  // Quick Actions
  describeSymptoms: string
  describeSymptomsDesc: string
  uploadLabResults: string
  uploadLabResultsDesc: string
  previousConsultations: string
  previousConsultationsDesc: string
  
  // Tab Navigation
  symptoms: string
  labTests: string
  history: string
  
  // Symptom Input
  howAreYouFeeling: string
  describeYourSymptoms: string
  symptomPlaceholder: string
  useVoiceInput: string
  analyzeSymptoms: string
  analyzing: string
  
  // Language Selection
  selectLanguage: string
  changeLanguage: string
  currentLanguage: string
  
  // Lab Tests
  uploadTestResults: string
  dragDropFiles: string
  supportedFormats: string
  
  // Common Actions
  submit: string
  cancel: string
  save: string
  loading: string
  error: string
  success: string
  
  // Medical Terms
  diagnosis: string
  symptoms: string
  treatment: string
  medication: string
  consultation: string
  emergency: string
  
  // Accessibility
  voiceInput: string
  textInput: string
  speakText: string
  
  // Footer
  createdBy: string
  attributionNotice: string
  alwaysFree: string
  openSource: string
  humanitarianLicense: string
}

export const translations: Record<string, Translations> = {
  en: {
    appTitle: "MedCare-AI",
    appSubtitle: "Humanitarian Healthcare Platform",
    doctorPortal: "Doctor Portal",
    freeOpenSource: "Free & Open Source",
    
    medicalDisclaimer: "Medical Disclaimer:",
    medicalDisclaimerText: "This AI tool provides preliminary guidance only and is NOT a substitute for professional medical care. Always consult qualified healthcare providers for medical decisions. In emergencies, contact local emergency services immediately.",
    understood: "Understood",
    
    welcomeTitle: "Welcome to MedCare-AI",
    welcomeDescription: "Get preliminary medical guidance, upload lab results for analysis, and connect with volunteer doctors worldwide. Our AI-powered platform serves underserved communities with compassionate healthcare support.",
    
    describeSymptoms: "Describe Symptoms",
    describeSymptomsDesc: "Tell us how you're feeling and get preliminary diagnostic guidance",
    uploadLabResults: "Upload Lab Results",
    uploadLabResultsDesc: "Get your test results interpreted by AI and reviewed by doctors",
    previousConsultations: "Previous Consultations",
    previousConsultationsDesc: "Review your medical history and previous AI consultations",
    
    symptoms: "Symptoms",
    labTests: "Lab Tests",
    history: "History",
    
    howAreYouFeeling: "How are you feeling today?",
    describeYourSymptoms: "Describe your symptoms in detail",
    symptomPlaceholder: "Tell me about your symptoms, pain, discomfort, or any health concerns you have...",
    useVoiceInput: "Use Voice Input",
    analyzeSymptoms: "Analyze Symptoms",
    analyzing: "Analyzing your symptoms...",
    
    selectLanguage: "Select Language",
    changeLanguage: "Change Language",
    currentLanguage: "Current Language",
    
    uploadTestResults: "Upload Test Results",
    dragDropFiles: "Drag and drop files here, or click to select",
    supportedFormats: "Supported formats: PDF, JPG, PNG",
    
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    
    diagnosis: "Diagnosis",
    treatment: "Treatment",
    medication: "Medication",
    consultation: "Consultation",
    emergency: "Emergency",
    
    voiceInput: "Voice Input",
    textInput: "Text Input",
    speakText: "Speak Text",
    
    createdBy: "Created with humanitarian purpose by",
    attributionNotice: "MedCare-AI is free and open-source software designed to support underserved communities. Attribution to Fahed Mlaiel (mlaiel@live.de) is mandatory in all copies, forks, and derivatives.",
    alwaysFree: "Always Free",
    openSource: "Open Source",
    humanitarianLicense: "Humanitarian License"
  },
  
  es: {
    appTitle: "MedCare-AI",
    appSubtitle: "Plataforma Humanitaria de Salud",
    doctorPortal: "Portal del Doctor",
    freeOpenSource: "Gratis y Código Abierto",
    
    medicalDisclaimer: "Descargo Médico:",
    medicalDisclaimerText: "Esta herramienta de IA proporciona orientación preliminar únicamente y NO es un sustituto de la atención médica profesional. Siempre consulte a proveedores de atención médica calificados para decisiones médicas. En emergencias, contacte los servicios de emergencia locales inmediatamente.",
    understood: "Entendido",
    
    welcomeTitle: "Bienvenido a MedCare-AI",
    welcomeDescription: "Obtenga orientación médica preliminar, suba resultados de laboratorio para análisis y conéctese con médicos voluntarios de todo el mundo. Nuestra plataforma impulsada por IA sirve a comunidades desatendidas con apoyo sanitario compasivo.",
    
    describeSymptoms: "Describir Síntomas",
    describeSymptomsDesc: "Cuéntanos cómo te sientes y obtén orientación diagnóstica preliminar",
    uploadLabResults: "Subir Resultados de Laboratorio",
    uploadLabResultsDesc: "Haz que la IA interprete tus resultados de pruebas y que los médicos los revisen",
    previousConsultations: "Consultas Anteriores",
    previousConsultationsDesc: "Revisa tu historial médico y consultas anteriores de IA",
    
    symptoms: "Síntomas",
    labTests: "Pruebas de Lab",
    history: "Historial",
    
    howAreYouFeeling: "¿Cómo te sientes hoy?",
    describeYourSymptoms: "Describe tus síntomas en detalle",
    symptomPlaceholder: "Cuéntame sobre tus síntomas, dolor, molestias o cualquier preocupación de salud que tengas...",
    useVoiceInput: "Usar Entrada de Voz",
    analyzeSymptoms: "Analizar Síntomas",
    analyzing: "Analizando tus síntomas...",
    
    selectLanguage: "Seleccionar Idioma",
    changeLanguage: "Cambiar Idioma",
    currentLanguage: "Idioma Actual",
    
    uploadTestResults: "Subir Resultados de Pruebas",
    dragDropFiles: "Arrastra y suelta archivos aquí, o haz clic para seleccionar",
    supportedFormats: "Formatos compatibles: PDF, JPG, PNG",
    
    submit: "Enviar",
    cancel: "Cancelar",
    save: "Guardar",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    
    diagnosis: "Diagnóstico",
    treatment: "Tratamiento",
    medication: "Medicación",
    consultation: "Consulta",
    emergency: "Emergencia",
    
    voiceInput: "Entrada de Voz",
    textInput: "Entrada de Texto",
    speakText: "Hablar Texto",
    
    createdBy: "Creado con propósito humanitario por",
    attributionNotice: "MedCare-AI es software gratuito y de código abierto diseñado para apoyar comunidades desatendidas. La atribución a Fahed Mlaiel (mlaiel@live.de) es obligatoria en todas las copias, bifurcaciones y derivados.",
    alwaysFree: "Siempre Gratis",
    openSource: "Código Abierto",
    humanitarianLicense: "Licencia Humanitaria"
  },
  
  fr: {
    appTitle: "MedCare-AI",
    appSubtitle: "Plateforme Humanitaire de Santé",
    doctorPortal: "Portail Médecin",
    freeOpenSource: "Gratuit et Open Source",
    
    medicalDisclaimer: "Avertissement Médical:",
    medicalDisclaimerText: "Cet outil IA fournit des conseils préliminaires uniquement et n'est PAS un substitut aux soins médicaux professionnels. Consultez toujours des professionnels de santé qualifiés pour les décisions médicales. En cas d'urgence, contactez immédiatement les services d'urgence locaux.",
    understood: "Compris",
    
    welcomeTitle: "Bienvenue sur MedCare-AI",
    welcomeDescription: "Obtenez des conseils médicaux préliminaires, téléchargez des résultats de laboratoire pour analyse et connectez-vous avec des médecins bénévoles du monde entier. Notre plateforme alimentée par l'IA sert les communautés mal desservies avec un soutien sanitaire compatissant.",
    
    describeSymptoms: "Décrire les Symptômes",
    describeSymptomsDesc: "Dites-nous comment vous vous sentez et obtenez des conseils diagnostiques préliminaires",
    uploadLabResults: "Télécharger Résultats de Labo",
    uploadLabResultsDesc: "Faites interpréter vos résultats de tests par l'IA et les faire réviser par des médecins",
    previousConsultations: "Consultations Précédentes",
    previousConsultationsDesc: "Révisez votre historique médical et les consultations IA précédentes",
    
    symptoms: "Symptômes",
    labTests: "Tests de Labo",
    history: "Historique",
    
    howAreYouFeeling: "Comment vous sentez-vous aujourd'hui?",
    describeYourSymptoms: "Décrivez vos symptômes en détail",
    symptomPlaceholder: "Parlez-moi de vos symptômes, douleurs, inconforts ou préoccupations de santé...",
    useVoiceInput: "Utiliser Saisie Vocale",
    analyzeSymptoms: "Analyser les Symptômes",
    analyzing: "Analyse de vos symptômes...",
    
    selectLanguage: "Sélectionner la Langue",
    changeLanguage: "Changer de Langue",
    currentLanguage: "Langue Actuelle",
    
    uploadTestResults: "Télécharger Résultats de Tests",
    dragDropFiles: "Glissez et déposez les fichiers ici, ou cliquez pour sélectionner",
    supportedFormats: "Formats supportés: PDF, JPG, PNG",
    
    submit: "Soumettre",
    cancel: "Annuler",
    save: "Sauvegarder",
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    
    diagnosis: "Diagnostic",
    treatment: "Traitement",
    medication: "Médicament",
    consultation: "Consultation",
    emergency: "Urgence",
    
    voiceInput: "Saisie Vocale",
    textInput: "Saisie Texte",
    speakText: "Parler le Texte",
    
    createdBy: "Créé avec un but humanitaire par",
    attributionNotice: "MedCare-AI est un logiciel gratuit et open-source conçu pour soutenir les communautés mal desservies. L'attribution à Fahed Mlaiel (mlaiel@live.de) est obligatoire dans toutes les copies, forks et dérivés.",
    alwaysFree: "Toujours Gratuit",
    openSource: "Open Source",
    humanitarianLicense: "Licence Humanitaire"
  },
  
  ar: {
    appTitle: "مِدكير-AI",
    appSubtitle: "منصة الرعاية الصحية الإنسانية",
    doctorPortal: "بوابة الطبيب",
    freeOpenSource: "مجاني ومفتوح المصدر",
    
    medicalDisclaimer: "إخلاء المسؤولية الطبية:",
    medicalDisclaimerText: "تقدم هذه الأداة الذكية إرشادات أولية فقط وليست بديلاً عن الرعاية الطبية المهنية. استشر دائماً مقدمي الرعاية الصحية المؤهلين للقرارات الطبية. في حالات الطوارئ، اتصل بخدمات الطوارئ المحلية فوراً.",
    understood: "مفهوم",
    
    welcomeTitle: "مرحباً بك في مِدكير-AI",
    welcomeDescription: "احصل على إرشادات طبية أولية، ارفع نتائج المختبر للتحليل، وتواصل مع أطباء متطوعين من جميع أنحاء العالم. منصتنا المدعومة بالذكاء الاصطناعي تخدم المجتمعات المحرومة بدعم صحي رحيم.",
    
    describeSymptoms: "وصف الأعراض",
    describeSymptomsDesc: "أخبرنا كيف تشعر واحصل على إرشادات تشخيصية أولية",
    uploadLabResults: "رفع نتائج المختبر",
    uploadLabResultsDesc: "اجعل الذكاء الاصطناعي يفسر نتائج فحوصاتك ويراجعها الأطباء",
    previousConsultations: "الاستشارات السابقة",
    previousConsultationsDesc: "راجع تاريخك الطبي واستشارات الذكاء الاصطناعي السابقة",
    
    symptoms: "الأعراض",
    labTests: "فحوص المختبر",
    history: "التاريخ",
    
    howAreYouFeeling: "كيف تشعر اليوم؟",
    describeYourSymptoms: "صف أعراضك بالتفصيل",
    symptomPlaceholder: "أخبرني عن أعراضك، الألم، عدم الراحة، أو أي مخاوف صحية لديك...",
    useVoiceInput: "استخدام الإدخال الصوتي",
    analyzeSymptoms: "تحليل الأعراض",
    analyzing: "جاري تحليل أعراضك...",
    
    selectLanguage: "اختر اللغة",
    changeLanguage: "تغيير اللغة",
    currentLanguage: "اللغة الحالية",
    
    uploadTestResults: "رفع نتائج الفحوصات",
    dragDropFiles: "اسحب واسقط الملفات هنا، أو انقر للاختيار",
    supportedFormats: "الصيغ المدعومة: PDF، JPG، PNG",
    
    submit: "إرسال",
    cancel: "إلغاء",
    save: "حفظ",
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    
    diagnosis: "التشخيص",
    treatment: "العلاج",
    medication: "الدواء",
    consultation: "الاستشارة",
    emergency: "طوارئ",
    
    voiceInput: "الإدخال الصوتي",
    textInput: "إدخال النص",
    speakText: "نطق النص",
    
    createdBy: "تم الإنشاء بغرض إنساني من قبل",
    attributionNotice: "مِدكير-AI هو برنامج مجاني ومفتوح المصدر مصمم لدعم المجتمعات المحرومة. الإسناد إلى فهد ملايل (mlaiel@live.de) إلزامي في جميع النسخ والفروع والمشتقات.",
    alwaysFree: "مجاني دائماً",
    openSource: "مفتوح المصدر",
    humanitarianLicense: "رخصة إنسانية"
  },
  
  sw: {
    appTitle: "MedCare-AI",
    appSubtitle: "Jukwaa la Huduma za Kibinadamu za Afya",
    doctorPortal: "Mlango wa Daktari",
    freeOpenSource: "Bure na Chanzo Wazi",
    
    medicalDisclaimer: "Onyo la Kimatibabu:",
    medicalDisclaimerText: "Chombo hiki cha AI kinatoa mwongozo wa awali tu na SI mbadala wa huduma za kimatibabu za kitaalamu. Daima shauriana na watoa huduma za afya wenye utaalamu kwa maamuzi ya kimatibabu. Katika dharura, wasiliana na huduma za dharura za eneo lako mara moja.",
    understood: "Nimeelewa",
    
    welcomeTitle: "Karibu MedCare-AI",
    welcomeDescription: "Pata mwongozo wa kimatibabu wa awali, pakia matokeo ya maabara kwa uchambuzi, na unganisha na madaktari wa kujitolea duniani kote. Jukwaa letu linaloendeshwa na AI linahudumia jamii zisizopata huduma za kutosha kwa msaada wa kiafya wenye huruma.",
    
    describeSymptoms: "Eleza Dalili",
    describeSymptomsDesc: "Tuambie jinsi unavyojisikia na upate mwongozo wa utambuzi wa awali",
    uploadLabResults: "Pakia Matokeo ya Maabara",
    uploadLabResultsDesc: "Ruhusu AI ifasiri matokeo ya vipimo vyako na madaktari wayakague",
    previousConsultations: "Mashauriano ya Awali",
    previousConsultationsDesc: "Kagua historia yako ya kimatibabu na mashauriano ya awali ya AI",
    
    symptoms: "Dalili",
    labTests: "Vipimo vya Maabara",
    history: "Historia",
    
    howAreYouFeeling: "Unajisikiaje leo?",
    describeYourSymptoms: "Eleza dalili zako kwa undani",
    symptomPlaceholder: "Niambie kuhusu dalili zako, maumivu, usumbufu, au wasiwasi wowote wa afya ulio nao...",
    useVoiceInput: "Tumia Uingizaji wa Sauti",
    analyzeSymptoms: "Chambuza Dalili",
    analyzing: "Inachambuza dalili zako...",
    
    selectLanguage: "Chagua Lugha",
    changeLanguage: "Badilisha Lugha",
    currentLanguage: "Lugha ya Sasa",
    
    uploadTestResults: "Pakia Matokeo ya Vipimo",
    dragDropFiles: "Buruta na udondoshe faili hapa, au bofya kuchagua",
    supportedFormats: "Miundo inayotumika: PDF, JPG, PNG",
    
    submit: "Wasilisha",
    cancel: "Ghairi",
    save: "Hifadhi",
    loading: "Inapakia...",
    error: "Hitilafu",
    success: "Mafanikio",
    
    diagnosis: "Utambuzi",
    treatment: "Matibabu",
    medication: "Dawa",
    consultation: "Shauri",
    emergency: "Dharura",
    
    voiceInput: "Uingizaji wa Sauti",
    textInput: "Uingizaji wa Maandishi",
    speakText: "Sema Maandishi",
    
    createdBy: "Imeundwa kwa madhumuni ya kibinadamu na",
    attributionNotice: "MedCare-AI ni programu ya bure na chanzo wazi iliyoundwa kusaidia jamii zisizopata huduma za kutosha. Kutoa heshima kwa Fahed Mlaiel (mlaiel@live.de) ni lazima katika nakala zote, rasilimali, na vipengele vyote.",
    alwaysFree: "Bure Kila Wakati",
    openSource: "Chanzo Wazi",
    humanitarianLicense: "Leseni ya Kibinadamu"
  },
  
  hi: {
    appTitle: "मेडकेयर-AI",
    appSubtitle: "मानवीय स्वास्थ्य सेवा मंच",
    doctorPortal: "डॉक्टर पोर्टल",
    freeOpenSource: "निःशुल्क और ओपन सोर्स",
    
    medicalDisclaimer: "चिकित्सा अस्वीकरण:",
    medicalDisclaimerText: "यह AI उपकरण केवल प्रारंभिक मार्गदर्शन प्रदान करता है और पेशेवर चिकित्सा देखभाल का विकल्प नहीं है। चिकित्सा निर्णयों के लिए हमेशा योग्य स्वास्थ्य सेवा प्रदाताओं से सलाह लें। आपातकाल में, तुरंत स्थानीय आपातकालीन सेवाओं से संपर्क करें।",
    understood: "समझ गया",
    
    welcomeTitle: "मेडकेयर-AI में आपका स्वागत है",
    welcomeDescription: "प्रारंभिक चिकित्सा मार्गदर्शन प्राप्त करें, विश्लेषण के लिए लैब परिणाम अपलोड करें, और दुनिया भर के स्वयंसेवी डॉक्टरों से जुड़ें। हमारा AI-संचालित मंच दयालु स्वास्थ्य सेवा सहायता के साथ वंचित समुदायों की सेवा करता है।",
    
    describeSymptoms: "लक्षणों का वर्णन करें",
    describeSymptomsDesc: "हमें बताएं कि आप कैसा महसूस कर रहे हैं और प्रारंभिक निदान मार्गदर्शन प्राप्त करें",
    uploadLabResults: "लैब परिणाम अपलोड करें",
    uploadLabResultsDesc: "अपने परीक्षण परिणामों को AI द्वारा व्याख्या करवाएं और डॉक्टरों द्वारा समीक्षा करवाएं",
    previousConsultations: "पिछली परामर्श",
    previousConsultationsDesc: "अपने चिकित्सा इतिहास और पिछली AI परामर्श की समीक्षा करें",
    
    symptoms: "लक्षण",
    labTests: "लैब टेस्ट",
    history: "इतिहास",
    
    howAreYouFeeling: "आज आप कैसा महसूस कर रहे हैं?",
    describeYourSymptoms: "अपने लक्षणों का विस्तार से वर्णन करें",
    symptomPlaceholder: "मुझे अपने लक्षणों, दर्द, परेशानी या किसी भी स्वास्थ्य चिंता के बारे में बताएं...",
    useVoiceInput: "ध्वनि इनपुट का उपयोग करें",
    analyzeSymptoms: "लक्षणों का विश्लेषण करें",
    analyzing: "आपके लक्षणों का विश्लेषण कर रहे हैं...",
    
    selectLanguage: "भाषा चुनें",
    changeLanguage: "भाषा बदलें",
    currentLanguage: "वर्तमान भाषा",
    
    uploadTestResults: "परीक्षण परिणाम अपलोड करें",
    dragDropFiles: "फाइलों को यहाँ खींचें और छोड़ें, या चुनने के लिए क्लिक करें",
    supportedFormats: "समर्थित प्रारूप: PDF, JPG, PNG",
    
    submit: "जमा करें",
    cancel: "रद्द करें",
    save: "सहेजें",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    
    diagnosis: "निदान",
    treatment: "उपचार",
    medication: "दवा",
    consultation: "परामर्श",
    emergency: "आपातकाल",
    
    voiceInput: "ध्वनि इनपुट",
    textInput: "टेक्स्ट इनपुट",
    speakText: "टेक्स्ट बोलें",
    
    createdBy: "मानवीय उद्देश्य से बनाया गया",
    attributionNotice: "मेडकेयर-AI एक निःशुल्क और ओपन-सोर्स सॉफ्टवेयर है जो वंचित समुदायों का समर्थन करने के लिए डिज़ाइन किया गया है। सभी प्रतियों, फोर्क और व्युत्पन्न में फहद म्लैल (mlaiel@live.de) का श्रेय अनिवार्य है।",
    alwaysFree: "हमेशा निःशुल्क",
    openSource: "ओपन सोर्स",
    humanitarianLicense: "मानवीय लाइसेंस"
  }
}

export const getTranslation = (language: string): Translations => {
  return translations[language] || translations.en
}
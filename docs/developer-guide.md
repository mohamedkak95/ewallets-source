# دليل المطور - موقع مقارنة المحافظ الإلكترونية وخدمات الدفع في مصر

## مقدمة

هذا الدليل مخصص للمطورين الذين سيعملون على تطوير وصيانة موقع مقارنة المحافظ الإلكترونية وخدمات الدفع في مصر. يوفر هذا الدليل معلومات تفصيلية عن هيكل المشروع، التقنيات المستخدمة، وكيفية تثبيت وتشغيل المشروع محلياً.

## التقنيات المستخدمة

- **الواجهة الأمامية**: Next.js 14 مع TypeScript
- **تنسيق الواجهة**: Tailwind CSS
- **قاعدة البيانات**: MongoDB
- **واجهة API**: RESTful API مبنية على Next.js API Routes
- **المصادقة**: JWT (JSON Web Tokens)
- **النشر**: Vercel

## متطلبات النظام

- Node.js (الإصدار 18.0.0 أو أحدث)
- npm (الإصدار 9.0.0 أو أحدث) أو yarn (الإصدار 1.22.0 أو أحدث)
- MongoDB (الإصدار 5.0 أو أحدث) أو حساب MongoDB Atlas

## هيكل المشروع

```
ewallets-comparison/
├── docs/                     # ملفات التوثيق
├── migrations/               # ملفات ترحيل قاعدة البيانات
├── public/                   # الملفات العامة (الصور، الأيقونات، إلخ)
├── src/
│   ├── app/                  # صفحات Next.js
│   │   ├── admin/            # صفحات لوحة الإدارة
│   │   ├── api/              # واجهات API
│   │   ├── comparison/       # صفحة المقارنة
│   │   ├── how-to-subscribe/ # صفحات كيفية الاشتراك
│   │   ├── recommendation/   # صفحة التوصيات
│   │   ├── wallets/          # صفحات المحافظ التفصيلية
│   │   ├── layout.tsx        # التخطيط الرئيسي
│   │   └── page.tsx          # الصفحة الرئيسية
│   ├── components/           # مكونات قابلة لإعادة الاستخدام
│   │   ├── layout/           # مكونات التخطيط (الرأس، التذييل، إلخ)
│   │   ├── ui/               # مكونات واجهة المستخدم الأساسية
│   │   ├── wallet/           # مكونات خاصة بالمحافظ
│   │   ├── comparison/       # مكونات خاصة بالمقارنة
│   │   └── subscription/     # مكونات خاصة بالاشتراك
│   ├── hooks/                # React Hooks مخصصة
│   ├── lib/                  # مكتبات ووظائف مساعدة
│   │   ├── db/               # اتصال قاعدة البيانات
│   │   ├── seo/              # وظائف تحسين محركات البحث
│   │   ├── affiliate/        # وظائف التسويق بالعمولة
│   │   └── testing/          # وظائف الاختبار
│   └── models/               # نماذج قاعدة البيانات
├── .env.local                # متغيرات البيئة المحلية
├── .gitignore                # ملفات مستثناة من Git
├── next.config.js            # إعدادات Next.js
├── package.json              # تبعيات المشروع
├── README.md                 # نظرة عامة على المشروع
├── tailwind.config.js        # إعدادات Tailwind CSS
└── tsconfig.json             # إعدادات TypeScript
```

## تثبيت وتشغيل المشروع محلياً

### 1. استنساخ المشروع

```bash
git clone https://github.com/username/ewallets-comparison.git
cd ewallets-comparison
```

### 2. تثبيت التبعيات

```bash
npm install
# أو
yarn install
```

### 3. إعداد متغيرات البيئة

قم بإنشاء ملف `.env.local` في المجلد الرئيسي للمشروع وأضف المتغيرات التالية:

```
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ewallets-comparison?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_jwt_secret_key

# API Keys (إذا لزم الأمر)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_google_analytics_id
```

### 4. تشغيل خادم التطوير

```bash
npm run dev
# أو
yarn dev
```

سيتم تشغيل الخادم على المنفذ 3000. يمكنك الوصول إلى الموقع من خلال `http://localhost:3000`.

## قاعدة البيانات

### نماذج البيانات

المشروع يستخدم Mongoose كـ ODM (Object Document Mapper) للتعامل مع MongoDB. فيما يلي النماذج الرئيسية:

- **EWallet**: نموذج المحافظ الإلكترونية
- **Bank**: نموذج البنوك
- **Service**: نموذج الخدمات
- **User**: نموذج المستخدمين
- **Comparison**: نموذج المقارنات
- **Recommendation**: نموذج التوصيات

### اتصال قاعدة البيانات

يتم إدارة اتصال قاعدة البيانات من خلال الملف `src/lib/db/connection.ts`. يستخدم المشروع نمط Singleton للحفاظ على اتصال واحد بقاعدة البيانات.

## واجهات API

### نقاط النهاية الرئيسية

- **GET /api/wallets**: الحصول على قائمة المحافظ الإلكترونية
- **GET /api/wallets/:id**: الحصول على محفظة إلكترونية محددة
- **POST /api/wallets**: إنشاء محفظة إلكترونية جديدة (مصادقة مطلوبة)
- **PUT /api/wallets/:id**: تحديث محفظة إلكترونية (مصادقة مطلوبة)
- **DELETE /api/wallets/:id**: حذف محفظة إلكترونية (مصادقة مطلوبة)
- **POST /api/comparison**: إنشاء مقارنة جديدة
- **POST /api/recommendation**: الحصول على توصيات بناءً على تفضيلات المستخدم
- **POST /api/auth/login**: تسجيل الدخول للمسؤولين
- **GET /api/auth/me**: الحصول على معلومات المستخدم الحالي (مصادقة مطلوبة)

## المصادقة

يستخدم المشروع JWT (JSON Web Tokens) للمصادقة. يتم إنشاء الرمز المميز عند تسجيل الدخول ويتم إرساله في رأس الطلب للوصول إلى نقاط النهاية المحمية.

## تحسين محركات البحث (SEO)

يستخدم المشروع ميزات Next.js لتحسين محركات البحث، بما في ذلك:

- البيانات الوصفية (Metadata) لكل صفحة
- هيكل البيانات المنظمة (Structured Data)
- الروابط القانونية (Canonical Links)
- خريطة الموقع (Sitemap)
- ملف robots.txt

## التسويق بالعمولة

يوفر المشروع نظام روابط إحالة للتسويق بالعمولة. يتم تتبع النقرات والتحويلات من خلال وحدة `src/lib/affiliate/tracking.ts`.

## الاختبار

يتضمن المشروع مجموعة شاملة من الاختبارات لضمان جودة الكود والوظائف. يمكن تشغيل الاختبارات باستخدام:

```bash
npm run test
# أو
yarn test
```

## النشر على Vercel

### 1. إنشاء حساب Vercel

قم بإنشاء حساب على [Vercel](https://vercel.com) إذا لم يكن لديك حساب بالفعل.

### 2. تثبيت Vercel CLI

```bash
npm install -g vercel
# أو
yarn global add vercel
```

### 3. تسجيل الدخول إلى Vercel

```bash
vercel login
```

### 4. نشر المشروع

```bash
vercel
```

اتبع التعليمات لإكمال عملية النشر. يمكنك أيضاً ربط مستودع GitHub بـ Vercel للنشر التلقائي عند دفع التغييرات.

### 5. إعداد متغيرات البيئة

قم بإضافة متغيرات البيئة المطلوبة في إعدادات المشروع على Vercel.

## تحديث المشروع

### 1. إضافة محافظ إلكترونية جديدة

يمكن إضافة محافظ إلكترونية جديدة من خلال لوحة الإدارة أو عن طريق إضافتها مباشرة إلى قاعدة البيانات.

### 2. تحديث البيانات الحالية

يمكن تحديث بيانات المحافظ الإلكترونية من خلال لوحة الإدارة.

### 3. إضافة ميزات جديدة

لإضافة ميزات جديدة، يرجى اتباع الخطوات التالية:

1. إنشاء فرع جديد في Git
2. تنفيذ الميزة الجديدة
3. إضافة اختبارات للميزة الجديدة
4. دمج الفرع مع الفرع الرئيسي بعد التأكد من عمل الميزة بشكل صحيح

## المساهمة في المشروع

نرحب بالمساهمات في المشروع! يرجى اتباع الخطوات التالية للمساهمة:

1. استنساخ المشروع
2. إنشاء فرع جديد للميزة أو الإصلاح
3. تنفيذ التغييرات
4. إضافة اختبارات للتغييرات
5. إرسال طلب سحب (Pull Request)

## الترخيص

هذا المشروع مرخص بموجب [MIT License](LICENSE).

## التواصل

إذا كان لديك أي استفسار أو اقتراح، يرجى التواصل معنا عبر البريد الإلكتروني: dev@ewallets-comparison.com

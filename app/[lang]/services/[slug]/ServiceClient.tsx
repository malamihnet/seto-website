"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function ServiceClient({
  slug,
  lang
}: {
  slug: string
  lang: string
}) {

  const isArabic = lang === "ar"

  const title = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const servicesArabic: any = {
    "video-editing": "مونتاج الفيديو",
    "color-grading": "تصحيح الألوان",
    "vfx": "المؤثرات البصرية",
    "motion-graphics": "موشن جرافيك",
    "post-production-commercials": "بوست برودكشن للإعلانات",
    "sound-design": "تصميم الصوت",
    "sound-design-audio-mixing": "تصميم ودمج الصوت",
    "audio-mixing": "دمج الصوت",
    "social-media-video-production": "إنتاج فيديو للسوشيال ميديا",
    "film-documentary-editing": "مونتاج الأفلام والوثائقيات",
    "real-estate-films": "أفلام العقارات",
    "digital-platform-video-optimization": "تهيئة الفيديو للمنصات الرقمية",
    "cinematic-storytelling": "السرد السينمائي"
  }

  const serviceName = isArabic
    ? servicesArabic[slug] || servicesArabic[slug.toLowerCase()] || title
    : title

  return (
    // أضفت هنا التنسيق الخاص باتجاه النص حسب اللغة لضمان السيو
    <div className={`pt-28 pb-40 px-6 md:px-16 max-w-[1400px] mx-auto text-white ${isArabic ? "text-right" : "text-left"}`}>

      {/* HERO */}
      <section className="mb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-[900px]"
        >
          <h1 className="text-5xl md:text-7xl text-[#e4da20] uppercase mb-8 leading-tight font-bold">
            {isArabic
              ? `خدمات ${serviceName}`
              : `${serviceName} Services`
            }
          </h1>

          <p className="text-neutral-300 text-xl leading-relaxed">
            {isArabic ? (
              <>
                خدمات <strong>{serviceName}</strong> الاحترافية من <strong>سيتو بوست برودكشن</strong>،
                الاستوديو السينمائي الرائد في العراق المتخصص في المونتاج المتقدم،
                تصحيح الألوان، المؤثرات البصرية وصناعة المحتوى السينمائي
                للعلامات التجارية والإعلانات وصناع الأفلام.
              </>
            ) : (
              <>
                Professional <strong>{serviceName}</strong> services by <strong>Seto's Post-Production</strong>,
                Iraq's leading cinematic post-production studio specializing in high-end editing,
                advanced color grading, visual effects and cinematic storytelling for brands,
                commercial productions and filmmakers.
              </>
            )}
          </p>
        </motion.div>
      </section>

      {/* INTRO SEO */}
      <section className="grid md:grid-cols-2 gap-20 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl text-[#e4da20] uppercase mb-6 font-bold">
            {isArabic ? "الخدمة الاحترافية" : `Professional ${serviceName}`}
          </h2>

          <p className="text-neutral-300 leading-relaxed mb-6">
            {isArabic ? (
              <>
                في <strong>سيتو بوست برودكشن</strong> نقدم خدمات <strong>{serviceName}</strong>
                احترافية مصممة لتحويل اللقطات الخام إلى تجربة سينمائية متكاملة.
                نعتمد على السرد البصري والإيقاع السينمائي وأحدث تقنيات
                ما بعد الإنتاج لإنشاء محتوى مؤثر يصل إلى الجمهور.
              </>
            ) : (
              <>
                At <strong>Seto's Post-Production</strong>, we deliver world-class <strong>{serviceName}</strong>
                services designed to transform raw footage into cinematic visual experiences.
                Our workflow combines storytelling, pacing, visual rhythm and modern post-production
                technology to create powerful content that connects with audiences.
              </>
            )}
          </p>

          <p className="text-neutral-400 leading-relaxed">
            {isArabic
              ? "من الإعلانات التجارية إلى الأفلام الترويجية وإنتاج الفيديو العقاري، يضمن فريقنا أن كل إطار يحقق أعلى المعايير السينمائية."
              : "From commercial advertising to branded films and real estate productions, our studio ensures every frame meets the highest cinematic standards."
            }
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl text-[#e4da20] uppercase mb-6 font-bold">
            {isArabic ? "منهجية العمل" : "Our Approach"}
          </h2>

          <p className="text-neutral-300 leading-relaxed mb-6">
            {isArabic
              ? "يركز فريقنا على بناء السرد البصري، الإحساس، الإيقاع والوضوح البصري لصناعة قصص مؤثرة بصرياً."
              : "Our team focuses on narrative structure, emotion, rhythm and visual clarity to craft compelling visual stories."
            }
          </p>

          <p className="text-neutral-400 leading-relaxed">
            {isArabic
              ? "باستخدام أحدث تقنيات ما بعد الإنتاج وعلوم الألوان وأساليب المونتاج الإبداعية، نضمن أن كل مشروع يحقق أعلى تأثير بصري."
              : "Using modern post-production pipelines, advanced color science and creative editing techniques, we ensure each project delivers maximum visual impact."
            }
          </p>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="mb-32">
        <h2 className="text-3xl text-[#e4da20] uppercase mb-14 font-bold">
          {isArabic ? "ماذا ستحصل" : "What You Get"}
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {(isArabic
            ? [
              "منهج مونتاج سينمائي",
              "سرد بصري احترافي",
              "تصحيح ألوان متقدم",
              "بايبلاين ما بعد الإنتاج",
              "بناء السرد الإبداعي",
              "تهيئة المحتوى للمنصات الرقمية"
            ]
            : [
              "Cinematic Editing Workflow",
              "Professional Visual Storytelling",
              "Advanced Color Science",
              "High-End Post-Production Pipeline",
              "Creative Narrative Structure",
              "Optimized Content For Digital Platforms"
            ]
          ).map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="border border-neutral-800 p-8 hover:border-[#e4da20] transition bg-black"
            >
              <p className="uppercase text-sm tracking-widest font-medium">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="mb-32">
        <h2 className="text-3xl text-[#e4da20] uppercase mb-12 font-bold">
          {isArabic ? "مراحل العمل" : "Our Workflow"}
        </h2>

        <div className="grid md:grid-cols-4 gap-10">
          {(isArabic
            ? [
              "مراجعة اللقطات",
              "المونتاج السينمائي",
              "تحسين الألوان والصورة",
              "تسليم النسخة النهائية"
            ]
            : [
              "Footage Review",
              "Cinematic Editing",
              "Color & Visual Enhancement",
              "Final Master Delivery"
            ]
          ).map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-5xl text-[#e4da20] mb-4 font-bold">
                0{index + 1}
              </p>
              <p className="text-neutral-300 uppercase tracking-wider font-medium">
                {step}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pt-20 border-t border-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl text-[#e4da20] uppercase mb-8 font-bold">
            {isArabic ? "ابدأ مشروعك" : "Start Your Project"}
          </h2>

          <p className="text-neutral-400 max-w-[700px] mx-auto mb-12">
            {isArabic
              ? "اعمل مع سيتو بوست برودكشن، الاستوديو السينمائي الرائد في العراق في مجال المونتاج وتصحيح الألوان والمؤثرات البصرية."
              : "Work with Seto's Post-Production, Iraq's premier cinematic post-production studio delivering professional editing, color grading and visual effects for commercial productions and brands."
            }
          </p>

          <Link
            href={`/${lang}/contact`}
            className="inline-block border border-[#e4da20] px-12 py-5 text-[#e4da20] uppercase hover:bg-[#e4da20] hover:text-black transition font-bold"
          >
            {isArabic ? "ابدأ مشروعك" : "Start a Project"}
          </Link>
        </motion.div>
      </section>

    </div>
  )
}
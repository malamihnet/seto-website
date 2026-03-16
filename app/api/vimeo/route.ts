// 1. هذا السطر الأهم: يجبر Next.js يجيب البيانات فريش كل مرة وما يسويلها كاش يخرب الدنيا
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.vimeo.com/users/setoiq/videos?per_page=100",
      {
        headers: {
          Authorization: `Bearer ${process.env.VIMEO_TOKEN}`,
        },
        // 2. تأكيد إضافي لمنع تخزين الرد القديم
        cache: "no-store",
      }
    );

    const data = await res.json();

    // 3. حماية السيرفر من الانهيار (Error 500) في حال فيميو مرجعلك مصفوفة
    if (!data || !data.data) {
      console.error("Vimeo Error: No data received", data);
      return Response.json([]); 
    }

    const videos = data.data.map((v: any) => ({
      id: Number(v.uri.split("/").pop()),
      title: v.name,
      thumbnail_large: v.pictures.sizes[v.pictures.sizes.length - 1].link,
    }));

    return Response.json(videos);
  } catch (error) {
    // في حال صار أي خطأ بالنت أو السيرفر، ما راح يوكف الموقع
    console.error("API Route Error:", error);
    return Response.json([], { status: 500 });
  }
}
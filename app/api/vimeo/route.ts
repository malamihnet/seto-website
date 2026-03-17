export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = process.env.VIMEO_TOKEN;
    
    // 1. نتأكد إذا التوكن أصلاً موجود بالسيرفر لو Railway مضيعه
    if (!token) {
      return Response.json({ 
        error: "CRITICAL: VIMEO_TOKEN is completely missing on Railway!" 
      }, { status: 500 });
    }

    const res = await fetch(
      "https://api.vimeo.com/users/setoiq/videos?per_page=100",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    // 2. إذا فيميو رفض الطلب، راح نقرأ رسالة الرفض ونطبعها
    if (!res.ok) {
      const errorText = await res.text();
      return Response.json({ 
        error: "Vimeo blocked the request", 
        status: res.status, 
        details: errorText 
      }, { status: 500 });
    }

    const data = await res.json();

    // 3. نتأكد إذا البيانات رجعت فارغة
    if (!data || !data.data) {
      return Response.json({ 
        error: "Vimeo returned data, but 'data.data' is missing", 
        fullResponse: data 
      }, { status: 500 });
    }

    // 4. الكود الطبيعي مالتك
    const videos = data.data.map((v: any) => ({
      id: Number(v.uri.split("/").pop()),
      title: v.name,
      thumbnail_large: v.pictures.sizes[v.pictures.sizes.length - 1].link,
    }));

    return Response.json(videos);

  } catch (error: any) {
    // 5. إذا صار انهيارر داخلي بالسيرفر
    return Response.json({ 
      error: "Server crashed while fetching", 
      message: error.message 
    }, { status: 500 });
  }
}

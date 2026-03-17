export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // نجيب كل أسماء المتغيرات اللي Railway دا يقرأها
    const allEnvKeys = Object.keys(process.env);
    
    // ندور على متغيراتك
    const token = process.env.VIMEO_TOKEN;
    const hasEmail = allEnvKeys.includes("EMAIL_USER");
    const hasTokenKey = allEnvKeys.includes("VIMEO_TOKEN");

    if (!token) {
      return Response.json({ 
        error: "Railway is hiding the variables!",
        isVimeoKeyVisible: hasTokenKey,
        isEmailVisible: hasEmail,
        allVariablesFound: allEnvKeys.filter(k => k.includes("VIMEO") || k.includes("EMAIL"))
      }, { status: 500 });
    }

    // إذا اشتغل التوكن، يكمل طبيعي
    const res = await fetch("https://api.vimeo.com/users/setoiq/videos?per_page=100", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const data = await res.json();
    
    if (!data || !data.data) return Response.json([]);

    const videos = data.data.map((v: any) => ({
      id: Number(v.uri.split("/").pop()),
      title: v.name,
      thumbnail_large: v.pictures.sizes[v.pictures.sizes.length - 1].link,
    }));

    return Response.json(videos);

  } catch (error: any) {
    return Response.json({ error: "Crash", msg: error.message }, { status: 500 });
  }
}
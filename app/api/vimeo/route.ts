export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // ركز هنا: خلينا التوكن مالتك كتابة مباشرة حتى نخلص من مشكلة Railway
    const token = "c645c92e7888500083fda815aea9d770";

    const res = await fetch(
      "https://api.vimeo.com/users/setoiq/videos?per_page=100",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!data || !data.data) {
      return Response.json([]); 
    }

    const videos = data.data.map((v: any) => ({
      id: Number(v.uri.split("/").pop()),
      title: v.name,
      thumbnail_large: v.pictures.sizes[v.pictures.sizes.length - 1].link,
    }));

    return Response.json(videos);
  } catch (error) {
    return Response.json([], { status: 500 });
  }
}
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json();

  const client = await clientPromise;
  const db = client.db("Clink");

  const url_data = db.collection("urls");

  const existingUrl = await url_data.findOne({ shortTerm: body.shortTerm });
  if (existingUrl) {
    return Response.json({
      success: false,
      message:
        "Short term URL already exists. Please choose another shortTerm.",
    });
  } else {
    const result = await url_data.insertOne({
      url: body.url,
      shortTerm: body.shortTerm,
    });
    return Response.json({
      success: true,
      message: "URL Generated Succesfully",
    });
  }
}

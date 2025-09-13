import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const shortTerm = (await params).shortTerm;

  const client = await clientPromise;
  const db = client.db("Clink");

  const url_data = db.collection("urls");

  const existingUrl = await url_data.findOne({ shortTerm: shortTerm });
  if (existingUrl) {
    redirect(existingUrl.url);
  } else {
    redirect("/");
  }
}

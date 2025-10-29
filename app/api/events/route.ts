import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json({ message: "Invalid format", error: error }, { status: 400 });
    }

    const file = formData.get("image") as File;

    if (!file) return NextResponse.json({ message: "Image is required!" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image", folder: "NextCourse" }, (error, results) => {
          if (error) return reject(error);

          resolve(results);
        })
        .end(buffer);
    });

    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create(event);

    return NextResponse.json({ message: "Event created successfully!", event: createdEvent }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Event creation failed!", error: e instanceof Error ? e.message : "Unknown" },
      { status: 500 },
    );
  }
}

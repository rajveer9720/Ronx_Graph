import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userWalletAddress = url.searchParams.get("userWalletAddress");

    if (!userWalletAddress) {
      return NextResponse.json({ error: "userWalletAddress is required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ userWalletAddress });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error during fetch:", error);
    return NextResponse.json({ error: `An error occurred: ${error.message}` }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userWalletAddress, username } = await req.json();

    if (!userWalletAddress || !username) {
      return NextResponse.json({ error: "userWalletAddress and username are required" }, { status: 400 });
    }

    if (username.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters long" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ userWalletAddress });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const result = await db.collection("users").updateOne({ userWalletAddress }, { $set: { username } });

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "No changes made. Username might already be the same." }, { status: 400 });
    }

    return NextResponse.json({ message: "Username updated successfully" });
  } catch (error) {
    console.error("Error during update:", error.message);
    return NextResponse.json({ error: `An error occurred while updating the username: ${error.message}` }, { status: 500 });
  }
}

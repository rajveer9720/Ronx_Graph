import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { userWalletAddress, profilePic, personalLink, username } = await req.json();

    // Validate input fields
    if (!userWalletAddress || !profilePic || !personalLink || !username) {
      return NextResponse.json(
        { error: "All fields (userWalletAddress, profilePic, personalLink, username) are required." },
        { status: 400 }
      );
    }

    // Connect to the database
    const { db } = await connectToDatabase();

    // Check if the user already exists
    const existingUser = await db.collection("users").findOne({ userWalletAddress });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with the given wallet address already exists." },
        { status: 400 }
      );
    }

    // Fetch the last inserted userId and increment by 1
    //fetch number of users
    //last user fetch userId
    //increment userId by 1
    const lastUser = await db.collection("users").find().sort({ userId: -1 }).limit(1).toArray();
    console.log("Last User:", lastUser); // Log the last user for debugging
    // Ensure userId is a valid number before incrementing
    const lastUserId = lastUser.length > 0 ? Number(lastUser[0].userId) : 0; // Fallback to 0 if no users exist
    console.log("Last UserId (converted to number):", lastUserId); // Log the converted userId for debugging

    const newUserId = lastUserId + 1; // Increment the last userId by 1
    console.log("New UserId to be assigned:", newUserId); // Log the new userId

    // If newUserId is not a valid number, throw an error
    if (isNaN(newUserId)) {
      console.error("Invalid userId generated:", newUserId); // Add log to track invalid IDs
      return NextResponse.json(
        { error: "Invalid userId generated." },
        { status: 500 }
      );
    }

    // Insert the user into the database with the new userId
    const result = await db.collection("users").insertOne({
      userId: newUserId,
      userWalletAddress,
      profilePic,
      personalLink,
      username,
    });

    // Check if the insert was successful
    if (!result.insertedId) {
      return NextResponse.json(
        { error: "An error occurred while inserting the user data." },
        { status: 500 }
      );
    }

    // Return a success response
    return NextResponse.json(
      { message: "User created successfully", userId: result.insertedId, newUserId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error during user creation:", error.message);

    // Return a generic error response
    return NextResponse.json(
      { error: `An unexpected error occurred: ${error.message}` },
      { status: 500 }
    );
  }
}

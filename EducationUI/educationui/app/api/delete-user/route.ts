import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';

export async function DELETE(req: NextApiRequest) {
  // Assuming userId is sent in the request body. 
  // You might want to validate this to ensure it's provided.
  const { userId } = req.body;

  if (!userId) {
    return NextResponse.json({ error: 'UserId is required' }, { status: 400 });
  }

  try {
    await clerkClient.users.deleteUser(userId);
    return NextResponse.json({ message: 'User deleted' });
  }
  catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}
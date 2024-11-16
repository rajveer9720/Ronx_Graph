// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, COLLECTION_NAME } from '../../lib/mongodb';
import User from '@/models/Users';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();

    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

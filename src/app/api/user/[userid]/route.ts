// src/app/api/user/[userid]/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
// import getCollection  from '@/lib/mongodb';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check that the request method is GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);  // Specify allowed methods in response header
    res.status(405).end(`Method ${req.method} Not Allowed`); // Return 405 if the method is not GET
    return;
  }
  const { userid } = req.query;
  try {
    const collection = await getCollection();
    // Convert userid from string to a number if it’s stored as a number in your MongoDB database
    const user = await collection.findOne({ userid: Number(userid) });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Unable to fetch user data' });
  }
}
// pages/api/getContext.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { getContext } from "@/lib/context";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { content, fileKey } = req.query;
  // @ts-ignore
  const context = await getContext(content, fileKey);
  res.json({ context });
}
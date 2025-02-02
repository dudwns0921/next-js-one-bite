import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
    return res.json({ revalidation: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Revalidation Error" });
  }
}

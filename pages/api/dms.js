import { getToken } from "next-auth/jwt";
import axios from "axios";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });


  console.log("Access Token:", token?.accessToken);
console.log("Access Token Secret:", token?.accessTokenSecret);

  if (!token || !token.accessToken || !token.accessTokenSecret) {
    return res.status(401).json({ error: "Not authenticated" });
  }


  try {
    // Use Twitter's API to fetch Direct Messages

    // "https://api.x.com/2/dm_events",


    console.log("INSIDE OF THE API CALL");
    const response = await axios.get(
        "https://api.twitter.com/1.1/direct_messages/events/list.json",
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    console.log("DMs fetched:", response.data.events);

    // Extract user information from messages
    const events = response.data.events;
    const participants = events.map((event) => ({
      id: event.message_create.sender_id,
      name: event.message_create.sender_id, // Replace with actual user name fetching logic
    }));

    return res.status(200).json(participants);
  } catch (error) {
    console.error("Error fetching DMs:", error.response.data);
    return res.status(500).json({ error: "Failed to fetch DMs" });
  }
};
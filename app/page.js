'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (session) {
      console.log("Fetching DMs...");
      fetch("/api/dms")
        .then((res) => res.json())
        .then((data) => setParticipants(data))
        .catch((err) => console.error("Error fetching DMs:", err));
    }
  }, [session]);

  return (
    <div>
      <h1>Sign In</h1>
      {session ? (
        <div>
          <p>Welcome, {session.user.name}</p>

          {/* list of participants */}
          <ul>
            {participants.map((participant) => (
              <li key={participant.id}>{participant.name}</li>
            ))}
          </ul>
          {/* search bar */}
          <div style={{ margin: "20px 0" }}>
            <input
              type="text"
              placeholder="Enter a query for your dms..."
              style={{
                padding: "10px",
                width: "100%",
                maxWidth: "400px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>

          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => signIn("twitter")}>Sign In with Twitter</button>
      )}
    </div>
  );
}

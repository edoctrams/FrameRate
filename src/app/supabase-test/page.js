"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SupabaseTest() {
  const [message, setMessage] = useState("Testing connection...");

  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .limit(1);

      if (error) {
        console.error("Supabase error:", error);
        setMessage(`Connection failed: ${error.message}`);
        return;
      }

      console.log("Supabase response:", data);
      setMessage("Supabase connection successful!");
    }

    testConnection();
  }, []);

  return (
    <main style={{ padding: "40px" }}>
      <h1>Supabase Connection Test</h1>
      <p>{message}</p>
    </main>
  );
}
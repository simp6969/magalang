import { NextResponse } from "next/server";
import getDb from "../../lib/db";

export async function GET() {
  try {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM scores ORDER BY score ASC").all();
    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch scores" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userid, score, firstname, lastname } = await request.json();

    if (!userid || typeof score !== "number") {
      return NextResponse.json({ error: "userid and numeric score required" }, { status: 400 });
    }

    const db = getDb();
    const existing = db.prepare("SELECT score FROM scores WHERE userid = ?").get(userid);

    if (existing) {
      // Only update if new score is better (lower time)
      const bestScore = Math.min(existing.score, score);
      db.prepare(
        "UPDATE scores SET score = ?, firstname = ?, lastname = ? WHERE userid = ?"
      ).run(bestScore, firstname || "", lastname || "", userid);
    } else {
      db.prepare(
        "INSERT INTO scores (userid, score, firstname, lastname) VALUES (?, ?, ?, ?)"
      ).run(userid, score, firstname || "", lastname || "");
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save score" }, { status: 500 });
  }
}

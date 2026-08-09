import { NextResponse } from "next/server";
import getDb from "../../lib/db";

export async function GET() {
  try {
    const db = getDb();
    const rows = db
      .prepare(
        `SELECT userid, firstname, lastname, score
         FROM scores
         ORDER BY score ASC
         LIMIT 100`
      )
      .all();
    return NextResponse.json(rows);
  } catch (err) {
    console.error("[GET /api/score]", err);
    return NextResponse.json(
      { error: "Failed to fetch scores" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userid, score, firstname, lastname } = body;

    // Validate required fields
    if (!userid || typeof userid !== "string" || userid.trim() === "") {
      return NextResponse.json({ error: "Valid userid is required" }, { status: 400 });
    }

    if (
      typeof score !== "number" ||
      !Number.isFinite(score) ||
      score <= 0 ||
      score > 86400 // cap at 24 hours — no real game takes longer
    ) {
      return NextResponse.json(
        { error: "score must be a positive number ≤ 86400" },
        { status: 400 }
      );
    }

    const safeFirstname = String(firstname ?? "").slice(0, 100).trim();
    const safeLastname  = String(lastname  ?? "").slice(0, 100).trim();
    const safeScore     = Math.round(score); // store as integer seconds

    const db = getDb();
    const existing = db
      .prepare("SELECT score FROM scores WHERE userid = ?")
      .get(userid);

    if (existing) {
      if (safeScore < existing.score) {
        // Only overwrite with a better (lower) time
        db.prepare(
          `UPDATE scores
           SET score = ?, firstname = ?, lastname = ?, updated_at = datetime('now')
           WHERE userid = ?`
        ).run(safeScore, safeFirstname, safeLastname, userid);
      }
      // Always return success even if score not updated (not a client error)
    } else {
      db.prepare(
        `INSERT INTO scores (userid, score, firstname, lastname)
         VALUES (?, ?, ?, ?)`
      ).run(userid, safeScore, safeFirstname, safeLastname);
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("[POST /api/score]", err);
    return NextResponse.json(
      { error: "Failed to save score" },
      { status: 500 }
    );
  }
}

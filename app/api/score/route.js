import { NextResponse } from "next/server";
import { getDb, initDb } from "../../lib/db";

// Ensure the table is created
let isInitialized = false;
async function ensureDb() {
  if (!isInitialized) {
    await initDb();
    isInitialized = true;
  }
}

export async function GET() {
  try {
    await ensureDb();
    const db = getDb();
    const { rows } = await db.query(`
      SELECT userid, firstname, lastname, score
      FROM scores
      ORDER BY score ASC
      LIMIT 100
    `);
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
    await ensureDb();
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
      score > 86400 // cap at 24 hours
    ) {
      return NextResponse.json(
        { error: "score must be a positive number ≤ 86400" },
        { status: 400 }
      );
    }

    const safeFirstname = String(firstname ?? "").slice(0, 100).trim();
    const safeLastname  = String(lastname  ?? "").slice(0, 100).trim();
    const safeScore     = Math.round(score);

    const db = getDb();
    const { rows: existingRows } = await db.query(
      "SELECT score FROM scores WHERE userid = $1",
      [userid]
    );

    if (existingRows.length > 0) {
      const existing = existingRows[0];
      if (safeScore < existing.score) {
        // Only overwrite with a better (lower) time
        await db.query(
          `UPDATE scores
           SET score = $1, firstname = $2, lastname = $3, updated_at = NOW()
           WHERE userid = $4`,
          [safeScore, safeFirstname, safeLastname, userid]
        );
      }
    } else {
      await db.query(
        `INSERT INTO scores (userid, score, firstname, lastname)
         VALUES ($1, $2, $3, $4)`,
        [userid, safeScore, safeFirstname, safeLastname]
      );
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

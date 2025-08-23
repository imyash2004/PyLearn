import { NextRequest, NextResponse } from "next/server"

type RunRequest = {
  code: string
  stdin?: string
  language?: string
  version?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RunRequest
    const language = body.language || "python"
    const version = body.version || "3.10.0"
    const code = body.code || ""
    const stdin = body.stdin || ""

    if (!code.trim()) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 })
    }

    // Piston public instance; for production, consider hosting your own.
    const PISTON_URL = "https://emkc.org/api/v2/piston/execute"

    const pistonRes = await fetch(PISTON_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language,
        version,
        files: [{ name: "main.py", content: code }],
        stdin,
      }),
      // 15s timeout safeguard via AbortController
      signal: AbortSignal.timeout?.(15000),
    })

    if (!pistonRes.ok) {
      const text = await pistonRes.text()
      return NextResponse.json(
        { error: `Execution API error (${pistonRes.status})`, details: text },
        { status: 502 },
      )
    }

    const data = await pistonRes.json()
    // Normalize output
    const stdout: string = data.run?.stdout ?? ""
    const stderr: string = data.run?.stderr ?? ""
    const output = [stdout, stderr && `Error:\n${stderr}`].filter(Boolean).join("\n")
    const ran = {
      stdout,
      stderr,
      output,
      code: data.run?.code ?? 0,
      signal: data.run?.signal ?? null,
      language,
      version: data.version ?? version,
    }

    return NextResponse.json(ran)
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to run code", details: err?.message || String(err) },
      { status: 500 },
    )
  }
}

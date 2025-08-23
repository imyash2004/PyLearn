import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export async function GET(request: NextRequest, { params }: { params: { module: string; lesson: string } }) {
  try {
    const awaitedParams = await params;
    const { module, lesson } = awaitedParams;
    const filePath = path.join(process.cwd(), "content", module, `${lesson}.md`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContent);

    // Extract headings for table of contents
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const headings: Array<{ id: string; text: string; level: number }> = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].replace(/[^\w\s]/g, "").trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      headings.push({ id, text, level });
    }

    return NextResponse.json({
      frontmatter,
      content,
      headings,
    });
  } catch (error) {
    console.error("Error loading lesson:", error);
    return NextResponse.json({ error: "Failed to load lesson" }, { status: 500 });
  }
}

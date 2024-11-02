import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const NOTES_DIRECTORY = path.join(process.cwd(), 'src/content/notes');

// Ensure notes directory exists
if (!fs.existsSync(NOTES_DIRECTORY)) {
  fs.mkdirSync(NOTES_DIRECTORY, { recursive: true });
}

export async function GET() {
  try {
    const files = fs.readdirSync(NOTES_DIRECTORY);
    const notes = files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const filePath = path.join(NOTES_DIRECTORY, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        
        return {
          id: parseInt(file.replace('.mdx', '')),
          title: data.title || 'Untitled',
          content: content,
          date: data.date || new Date().toLocaleString(),
          isStatic: data.isStatic || false,
          isPinned: data.isPinned || false
        };
      })
      .sort((a, b) => {
        // Sort by pinned status first, then by date
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.id - a.id;
      });

    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const note = await request.json();
    const fileName = `${note.id}.mdx`;
    const filePath = path.join(NOTES_DIRECTORY, fileName);

    const frontmatter = {
      title: note.title,
      date: note.date,
      id: note.id,
      isStatic: false,
      isPinned: note.isPinned || false
    };

    const fileContent = matter.stringify(note.content, frontmatter);
    fs.writeFileSync(filePath, fileContent);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
} 
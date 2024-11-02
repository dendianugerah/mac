import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const NOTES_DIRECTORY = path.join(process.cwd(), 'src/content/notes');

// Update a note
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const note = await request.json();
    const fileName = `${params.id}.mdx`;
    const filePath = path.join(NOTES_DIRECTORY, fileName);

    const frontmatter = {
      title: note.title,
      date: note.date,
      id: note.id,
      isStatic: false
    };

    const fileContent = matter.stringify(note.content, frontmatter);
    fs.writeFileSync(filePath, fileContent);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update note' }, 
      { status: 500 }
    );
  }
}

// Delete a note
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fileName = `${params.id}.mdx`;
    const filePath = path.join(NOTES_DIRECTORY, fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete note' }, 
      { status: 500 }
    );
  }
} 
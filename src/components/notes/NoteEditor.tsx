import { Note } from '@/types';
import { motion } from 'framer-motion';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useState, useEffect } from 'react';

interface NoteEditorProps {
  note: Note;
  isDarkMode: boolean;
  onUpdate: (note: Note) => void;
}

export const NoteEditor = ({ note, isDarkMode, onUpdate }: NoteEditorProps) => {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    if (note.isStatic) {
      const loadMDX = async () => {
        const mdxSource = await serialize(note.content);
        setMdxSource(mdxSource);
      };
      loadMDX();
    }
  }, [note.content, note.isStatic]);

  return (
    <motion.div
      key={note.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.15 }}
      className="p-6"
    >
      <input
        type="text"
        value={note.title}
        onChange={(e) => onUpdate({ ...note, title: e.target.value })}
        className={`text-[20px] font-semibold mb-1 w-full focus:outline-none 
          ${isDarkMode ? 'text-white bg-[#2a2a2a]' : 'text-[#000000] bg-white'}`}
      />
      <p className={`text-[12px] ${isDarkMode ? 'text-[#b3b3b3]' : 'text-[#888888]'} mb-4`}>
        {note.date}
      </p>
      
      {note.isStatic ? (
        // Read-only MDX view for static notes
        <div className={`prose max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
          {mdxSource && <MDXRemote {...mdxSource} />}
        </div>
      ) : (
        // Editable textarea for non-static notes
        <textarea
          value={note.content}
          onChange={(e) => onUpdate({ ...note, content: e.target.value })}
          className={`w-full h-[calc(100vh-280px)] resize-none focus:outline-none 
            ${isDarkMode ? 'text-white bg-[#2a2a2a]' : 'text-[#000000] bg-white'} 
            text-[14px] leading-relaxed`}
        />
      )}
    </motion.div>
  );
}; 
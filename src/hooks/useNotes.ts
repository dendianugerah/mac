import { useState, useEffect, useCallback } from 'react';
import { Note } from '@/types';
import debounce from 'lodash/debounce';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      if (!response.ok) throw new Error('Failed to fetch notes');
      const notesData = await response.json();
      setNotes(notesData);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(async (note: Note) => {
      try {
        const response = await fetch(`/api/notes/${note.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(note)
        });

        if (!response.ok) throw new Error('Failed to update note');
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }, 500),
    []
  );

  const addNote = async () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newNote: Note = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '',
      date: `Today at ${formattedTime}`,
      isStatic: false
    };

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote)
      });

      if (!response.ok) throw new Error('Failed to create note');
      
      setNotes(prev => [newNote, ...prev]);
      setSelectedNote(newNote);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const deleteNote = async (id: number) => {
    const noteToDelete = notes.find(note => note.id === id);
    if (noteToDelete?.isStatic) return;

    try {
      const response = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete note');

      setNotes(prev => prev.filter(note => note.id !== id));
      if (selectedNote?.id === id) {
        setSelectedNote(null);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const updateNote = (updatedNote: Note) => {
    if (updatedNote.isStatic) return;

    // Update UI immediately
    setNotes(prev => prev.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
    setSelectedNote(updatedNote);

    // Debounced save to server
    debouncedSave(updatedNote);
  };

  // Cleanup debounced function
  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  return {
    notes,
    selectedNote,
    setSelectedNote,
    addNote,
    deleteNote,
    updateNote,
    isLoading
  };
};
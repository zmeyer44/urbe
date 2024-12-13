import { demoNotes } from '@/constants';

export function getNoteById(id: string) {
  return demoNotes.find((note) => note.id === id);
}

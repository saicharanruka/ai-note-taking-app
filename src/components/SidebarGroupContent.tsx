"use client";

import Fuse from "fuse.js";
import { Note } from "@prisma/client";
import {
  SidebarGroupContent as SidebarGroupContentShadcn,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useMemo, useState } from "react";
import SelectNoteButton from "./SelectNoteButton";
import DeleteNoteButton from "./ui/DeleteNoteButton";

type Props = {
  notes: Note[];
};

function SidebarGroupContent({ notes }: Props) {
  const [searchText, setSearchText] = useState("");
  const [localNotes, setLocalNotes] = useState<Note[]>(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, { keys: ["text"], threshold: 0.4 });
  }, [localNotes]);
  const filteredNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : localNotes;

  const deleteNoteLocal = (id: string) => {
    setLocalNotes(localNotes.filter((n) => n.id !== id));
  };

  return (
    <SidebarGroupContentShadcn>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-2 size-4" />
        <Input
          className="bg-muted pl-8"
          placeholder="Search notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <SidebarMenu className="mt-4">
        {filteredNotes.map((note) => (
          <SidebarMenuItem key={note.id} className="group/item">
            <SelectNoteButton note={note} />
            <DeleteNoteButton
              noteId={note.id}
              deleteNoteLocal={deleteNoteLocal}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContentShadcn>
  );
}

export default SidebarGroupContent;

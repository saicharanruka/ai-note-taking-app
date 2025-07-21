"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { createNoteAction } from "@/actions/notes";

type Props = {
  user: User | null;
};

function NewNoteButton({ user }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickNewNote = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setIsLoading(true);

      const uuid = uuidv4();
      await createNoteAction(uuid);
      router.push(`/?noteId=${uuid}`);

      toast.success("Note created successfully!");

      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      onClick={handleClickNewNote}
      className="w-24"
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : "Create Note"}
    </Button>
  );
}

export default NewNoteButton;

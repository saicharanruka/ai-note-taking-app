"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./button";
import { Loader2, Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteNoteAction } from "@/actions/notes";

type Props = {
  noteId: string;
  deleteNoteLocal: (noteId: string) => void;
};

function DeleteNoteButton({ noteId, deleteNoteLocal }: Props) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const handleDeleteNote = () => {
    startTransition(async () => {
      const { errorMessage } = await deleteNoteAction(noteId);

      if (!errorMessage) {
        toast.success("Note deleted successfully");
        deleteNoteLocal(noteId);

        if ((noteId = noteIdParam)) {
          router.replace("/");
        }
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="absolute top-1/2 right-2 size-7 -translate-y-1/2 p-0 opacity-0 transition group-hover/item:opacity-100 [&_svg]:size-3"
          variant="destructive"
        >
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this note ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your note
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90 w-24 text-white"
            onClick={handleDeleteNote}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteNoteButton;

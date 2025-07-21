"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    await new Promise((res) => setTimeout(res, 2000));
    const error = null;

    if (error) {
      toast.error(error);
      setIsLoading(false);
      throw new Error(error);
    }

    toast.success("Logged out successfully");
    router.push("/");

    setIsLoading(false);
  }

  return (
    <Button
      className="w-24"
      variant="outline"
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  );
}

export default LogoutButton;

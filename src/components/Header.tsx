import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import DarkModeToggle from "@/components/DarkModeToggle";
import LogoutButton from "./LogoutButton";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "./ui/sidebar";

async function Header() {
  const user = await getUser();

  return (
    <header className="bg-popover sshadow-2xl relative flex h-24 items-center justify-between rounded-lg px-3 shadow-2xl shadow-blue-500/40">
      <SidebarTrigger className="absolute top-1 left-1" />
      <Link href="/" className="flex items-center gap-3 px-2">
        <Image
          src="/logo.png"
          alt="AI Notes Logo"
          height={60}
          width={60}
          priority
          className="rounded-full"
        />
        <h1 className="flex flex-col text-xl leading-6 font-semibold">
          AI Notes
        </h1>
      </Link>
      <div className="flex gap-4">
        {user ? (
          <LogoutButton />
        ) : (
          <>
            <Button asChild className="hidden sm:block">
              <Link href={"/signup"}>Signup</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={"/login"}>Login</Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;

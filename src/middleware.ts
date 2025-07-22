// import { type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
// import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // checks if route is login or signup then redirect to home page if alreasy logged in
  const isAuthRoute =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  if (isAuthRoute) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      return NextResponse.redirect(
        new URL("/", process.env.NEXT_PUBLIC_BASE_URL),
      );
    }
  }
  // -----------------------------------------------------

  // fetching the lastest note to show as soon as you login
  const { searchParams, pathname } = new URL(request.url);
  if (!searchParams.get("noteId") && pathname === "/") {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { newestNoteId } = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/fetch-newest-note?userId=${user.id}`,
      ).then((res) => res.json());

      if (newestNoteId) {
        const url = request.nextUrl.clone();
        url.searchParams.set("noteId", newestNoteId);
        return NextResponse.redirect(url);
      } else {
        // creating a new note if there isn't any
        const { noteId } = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-new-note?userId=${user.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          },
        ).then((res) => res.json());

        const url = request.nextUrl.clone();
        url.searchParams.set("noteId", noteId);
        return NextResponse.redirect(url);
      }
    }
  }

  //   if (
  //     !user &&
  //     !request.nextUrl.pathname.startsWith("/login") &&
  //     !request.nextUrl.pathname.startsWith("/auth")
  //   ) {
  //     // no user, potentially respond by redirecting the user to the login page
  //     const url = request.nextUrl.clone();
  //     url.pathname = "/login";
  //     return NextResponse.redirect(url);
  //   }

  return supabaseResponse;
}

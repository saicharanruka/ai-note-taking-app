import "@/app/styles/globals.css";
import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import NoteProvider from "@/providers/NoteProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Note Taking App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NoteProvider>
            <SidebarProvider>
              <AppSidebar />

              <div className="flex min-h-screen w-full flex-col">
                <Header />
                <main className="flex w-full flex-1 px-4 pt-10 xl:pt-8">
                  {children}
                </main>
              </div>
            </SidebarProvider>
            <Toaster position="top-center" richColors />
          </NoteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

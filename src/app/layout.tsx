import type { Metadata } from "next";
import "@/app/styles/globals.css";

export const metadata: Metadata = {
	title: "GOAT Notes",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={` antialiased`}>{children}</body>
		</html>
	);
}

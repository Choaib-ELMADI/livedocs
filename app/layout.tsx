import { Inter as FontSans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Provider from "./Provider";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";
import "./globals.css";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "LiveDocs",
	description:
		"A Google Docs clone with real-time collaboration and authentication.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
				variables: { colorPrimary: "#3371FF", fontSize: "16px" },
			}}
		>
			<html lang="en" suppressHydrationWarning>
				<body
					className={cn(
						"min-h-screen font-sans antialiased",
						fontSans.variable
					)}
				>
					<Provider>{children}</Provider>
				</body>
			</html>
		</ClerkProvider>
	);
}

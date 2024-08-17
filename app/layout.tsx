import { Inter as FontSans } from "next/font/google";
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
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
			>
				{children}
			</body>
		</html>
	);
}

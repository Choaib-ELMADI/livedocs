"use client";

import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import {
	SignInButton,
	UserButton,
	SignedOut,
	SignedIn,
} from "@clerk/clerk-react";
import React from "react";

const Document = () => {
	return (
		<div>
			<Header>
				<div className="flex w-fit items-center justify-center gap-2">
					<p className="document-title">Share</p>
				</div>
				<SignedOut>
					<SignInButton />
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</Header>
			<Editor />
		</div>
	);
};

export default Document;

"use client";

import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import FloatingToolbarPlugin from "./plugins/FloatingToolbarPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode } from "@lexical/rich-text";
import Theme from "./plugins/Theme";
import {
	liveblocksConfig,
	FloatingComposer,
	LiveblocksPlugin,
	FloatingThreads,
} from "@liveblocks/react-lexical";
import Loader from "../Loader";
import React from "react";

function Placeholder() {
	return <div className="editor-placeholder">Start typing here...</div>;
}

export function Editor({
	roomId,
	currentUserType,
}: {
	roomId: string;
	currentUserType: UserType;
}) {
	const initialConfig = liveblocksConfig({
		namespace: "Editor",
		nodes: [HeadingNode],
		onError: (error: Error) => {
			console.error(error);
			throw error;
		},
		theme: Theme,
		editable: currentUserType === "editor",
	});

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<div className="editor-container size-full">
				<div className="toolbar-wrapper flex min-w-full justify-between">
					<ToolbarPlugin />
					{currentUserType === "editor" && <p>Delete</p>}
				</div>

				<div className="editor-wrapper flex flex-col items-center justify-start">
					{/* {status === "not-loaded" || status === "loading" ? (
						<Loader />
					) : ( */}

					<div className="editor-inner h-fit min-h-[1100px] relative mb-5 w-full max-w-[800px] shadow-md lg:mb-10">
						<RichTextPlugin
							contentEditable={
								<ContentEditable className="editor-input h-full" />
							}
							placeholder={<Placeholder />}
							ErrorBoundary={LexicalErrorBoundary}
						/>
						{currentUserType === "editor" && <FloatingToolbarPlugin />}
						<HistoryPlugin />
						<AutoFocusPlugin />
					</div>

					{/* )} */}

					{/* <LiveblocksPlugin>
						<FloatingComposer className="w-[350px]" />
						<FloatingThreads threads={threads} />
						<Comments />
					</LiveblocksPlugin> */}
				</div>
			</div>
		</LexicalComposer>
	);
}

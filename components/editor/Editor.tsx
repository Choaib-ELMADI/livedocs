"use client";

import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode } from "@lexical/rich-text";
import Theme from "./plugins/Theme";
import React from "react";

function Placeholder() {
	return <div className="editor-placeholder">Start typing here...</div>;
}

export function Editor() {
	const initialConfig = {
		namespace: "Editor",
		nodes: [HeadingNode],
		onError: (error: Error) => {
			console.error(error);
			throw error;
		},
		theme: Theme,
	};

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<div className="editor-container size-full">
				<ToolbarPlugin />

				<div className="editor-inner min-h-[calc(100vh_-_45px)]">
					<RichTextPlugin
						contentEditable={
							<ContentEditable className="editor-input h-full" />
						}
						placeholder={<Placeholder />}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<HistoryPlugin />
					<AutoFocusPlugin />
				</div>
			</div>
		</LexicalComposer>
	);
}

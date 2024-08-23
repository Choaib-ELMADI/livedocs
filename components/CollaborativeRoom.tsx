"use client";

import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "./ActiveCollaborators";
import React, { useRef, useState } from "react";
import { Editor } from "./editor/Editor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import Header from "./Header";
import Loader from "./Loader";

const CollaborativeRoom = ({
	roomId,
	roomMetadata,
}: CollaborativeRoomProps) => {
	const currentUserType = "editor";

	const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const updateTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {};

	return (
		<RoomProvider id={roomId}>
			<ClientSideSuspense fallback={<Loader />}>
				<div className="collaborative-room">
					<Header>
						<div
							ref={containerRef}
							className="flex w-fit items-center justify-center gap-2"
						>
							{isEditing && !isLoading ? (
								<Input
									type="text"
									value={documentTitle}
									ref={inputRef}
									placeholder="Edit title"
									onChange={(e) => setDocumentTitle(e.target.value)}
									onKeyDown={updateTitleHandler}
									disabled={!isEditing}
									className="document-title-input"
								/>
							) : (
								<>
									<p className="document-title">{documentTitle}</p>
								</>
							)}

							{/* @ts-ignore */}
							{!isEditing && currentUserType === "editor" && (
								<Image
									src="/assets/icons/edit.svg"
									alt="Edit"
									width={24}
									height={24}
									draggable="false"
									onClick={() => setIsEditing(true)}
									className="cursor-pointer"
								/>
							)}

							{/* @ts-ignore */}
							{!isEditing && currentUserType !== "editor" && (
								<p className="view-only-tag">View only</p>
							)}

							{isLoading && <p className="text-sm text-gray-400">Saving...</p>}
						</div>
						<div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
							<ActiveCollaborators />
							<SignedOut>
								<SignInButton />
							</SignedOut>
							<SignedIn>
								<UserButton />
							</SignedIn>
						</div>
					</Header>
					<Editor />
				</div>
			</ClientSideSuspense>
		</RoomProvider>
	);
};

export default CollaborativeRoom;

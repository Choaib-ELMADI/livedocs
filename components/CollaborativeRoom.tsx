"use client";

import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { updateDocument } from "@/lib/actions/room.actions";
import React, { useEffect, useRef, useState } from "react";
import ActiveCollaborators from "./ActiveCollaborators";
import { Editor } from "./editor/Editor";
import { Input } from "./ui/input";
import Image from "next/image";
import Header from "./Header";
import Loader from "./Loader";

const CollaborativeRoom = ({
	roomId,
	roomMetadata,
	currentUserType,
	users,
}: CollaborativeRoomProps) => {
	const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setIsEditing(false);
				if (documentTitle) {
					updateDocument({ roomId, title: documentTitle });
				}
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [roomId, documentTitle]);

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEditing]);

	const updateTitleHandler = async (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === "Enter") {
			setIsLoading(true);

			try {
				if (documentTitle && documentTitle !== roomMetadata.title) {
					const updatedDocument = await updateDocument({
						roomId,
						title: documentTitle,
					});

					if (updatedDocument) {
						setIsEditing(false);
					}
				}
			} catch (error) {
				console.log(`Error occured while updating the title: ${error}`);
			}

			setIsLoading(false);
		}
	};

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
					<Editor roomId={roomId} currentUserType={currentUserType} />
				</div>
			</ClientSideSuspense>
		</RoomProvider>
	);
};

export default CollaborativeRoom;

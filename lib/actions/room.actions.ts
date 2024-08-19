"use server";

import { revalidatePath } from "next/cache";
import { liveblocks } from "../liveblocks";
import { parseStringify } from "../utils";
import { nanoid } from "nanoid";

export const createDocument = async ({
	userId,
	email,
}: CreateDocumentParams) => {
	const roomId = nanoid();

	try {
		const metadata = {
			creatorId: userId,
			email,
			title: "Untitled",
		};

		const usersAccesses: RoomAccesses = {
			[email]: ["room:write"],
		};

		const room = await liveblocks.createRoom(roomId, {
			defaultAccesses: ["room:write"],
			usersAccesses,
			metadata,
		});

		revalidatePath("/");

		return parseStringify(room);
	} catch (error) {
		console.log(`Error occured while creating a room: ${error}`);
	}
};

export const getDocument = async ({
	roomId,
	userId,
}: {
	roomId: string;
	userId: string;
}) => {
	try {
		const room = await liveblocks.getRoom(roomId);

		// TODO: BRING IT BACK
		// const hasAccess = Object.keys(room.usersAccesses).includes(userId);
		// if (!hasAccess) {
		// 	throw new Error("You don't have access to this document.");
		// }

		return parseStringify(room);
	} catch (error) {
		console.log(`Error occured while getting a document: ${error}`);
	}
};

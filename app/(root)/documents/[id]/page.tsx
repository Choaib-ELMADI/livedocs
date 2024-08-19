import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getDocument } from "@/lib/actions/room.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Document = async ({ params: { id } }: SearchParamProps) => {
	const clerkUser = await currentUser();
	if (!clerkUser) redirect("/sign-in");

	const room = await getDocument({
		roomId: id,
		userId: clerkUser.emailAddresses[0].emailAddress,
	});
	if (!room) redirect("/");

	// TODO: MANAGE PERMISSIONS

	return (
		<main className="w-full flex flex-col items-center">
			<CollaborativeRoom roomId={id} roomMetadata={room.metadata} />
		</main>
	);
};

export default Document;

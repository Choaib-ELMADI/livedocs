import CollaborativeRoom from "@/components/CollaborativeRoom";
import { getClerkUsers } from "@/lib/actions/user.actions";
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

	const userIds = room.userAccesses ? Object.keys(room.userAccesses) : [];
	const users = await getClerkUsers({ userIds });
	const usersData = users.map((user: User) => ({
		...user,
		userType: room.userAccesses[user.email]?.includes("room:write")
			? "editor"
			: "viewer",
	}));

	const currentUserType = room?.userAccesses?.[
		clerkUser?.emailAddresses?.[0]?.emailAddress
	]?.includes("room:write")
		? "editor"
		: "viewer";

	return (
		<main className="w-full flex flex-col items-center">
			<CollaborativeRoom
				roomId={id}
				roomMetadata={room.metadata}
				currentUserType={currentUserType}
				users={usersData}
			/>
		</main>
	);
};

export default Document;

import { currentUser } from "@clerk/nextjs/server";
import { liveblocks } from "@/lib/liveblocks";
import { redirect } from "next/navigation";
import { getUserColor } from "@/lib/utils";

export async function POST() {
	const clerkUser = await currentUser();

	if (!clerkUser) redirect("/sign-in");

	const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

	const user = {
		id,
		info: {
			id,
			name: `${firstName} ${lastName}`,
			email: emailAddresses[0].emailAddress,
			avatar: imageUrl,
			color: getUserColor(id),
		},
	};

	const { status, body } = await liveblocks.identifyUser(
		{ userId: user.info.email, groupIds: [] },
		{ userInfo: user.info }
	);

	return new Response(body, { status });
}

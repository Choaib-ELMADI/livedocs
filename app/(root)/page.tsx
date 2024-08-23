import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { getDocuments } from "@/lib/actions/room.actions";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { currentUser } from "@clerk/nextjs/server";
import { dateConverter } from "@/lib/utils";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = async () => {
	const clerkUser = await currentUser();
	if (!clerkUser) redirect("/sign-in");

	const documents = await getDocuments(
		clerkUser.emailAddresses[0].emailAddress
	);

	return (
		<main className="home-container">
			<Header className="sticky left-0 top-0">
				<div className="flex items-center gap-2 lg:gap-4">
					Notification List
					<SignedIn>
						<UserButton />
					</SignedIn>
					<SignedOut>
						<SignInButton />
					</SignedOut>
				</div>
			</Header>
			{documents.data.length > 0 ? (
				<div className="document-list-container">
					<div className="document-list-title">
						<h3 className="text-2xl font-semibold">All documents</h3>
						<AddDocumentBtn
							userId={clerkUser.id}
							email={clerkUser.emailAddresses[0].emailAddress}
						/>
					</div>
					<ul className="document-ul">
						{documents.data.map((doc: any) => (
							<li key={doc.id} className="document-list-item">
								<Link
									href={`/documents/${doc.id}`}
									className="flex flex-1 items-center gap-4"
								>
									<div className="hidden rounded-md bg-dark-500 p-2 sm:block">
										<Image
											src="/assets/icons/doc.svg"
											alt="Document"
											width={40}
											height={40}
											draggable="false"
										/>
									</div>
									<div className="space-y-1">
										<p className="line-clamp-1 text-lg">{doc.metadata.title}</p>
										<p className="text-sm font-light text-blue-100">
											Created about {dateConverter(doc.createdAt)}
										</p>
									</div>
								</Link>
								{/* TODO: Add a delete button */}
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className="document-list-empty">
					<Image
						src="/assets/icons/doc.svg"
						alt="Document List Empty"
						width={40}
						height={40}
						draggable="false"
						className="mx-auto"
					/>
					<AddDocumentBtn
						userId={clerkUser.id}
						email={clerkUser.emailAddresses[0].emailAddress}
					/>
				</div>
			)}
		</main>
	);
};

export default Home;

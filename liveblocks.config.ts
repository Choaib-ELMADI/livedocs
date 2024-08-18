declare global {
	interface Liveblocks {
		// Each user's Presence, for useMyPresence, useOthers, etc.
		Presence: {};

		// The Storage tree for the room, for useMutation, useStorage, etc.
		Storage: {};

		// Custom user info set when authenticating with a secret key
		UserMeta: {
			id: string;
			info: {
				id: string;
				name: string;
				email: string;
				avatar: string;
				color: string;
			};
		};

		// Custom events, for useBroadcastEvent, useEventListener
		RoomEvent: {};

		// Custom metadata set on threads, for useThreads, useCreateThread, etc.
		ThreadMetadata: {};

		// Custom room info set with resolveRoomsInfo, for useRoomInfo
		RoomInfo: {};
	}
}

export {};

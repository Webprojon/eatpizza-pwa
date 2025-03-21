"use client";

import { useEffect, useRef, useState } from "react";
import { onMessage, Unsubscribe, Messaging } from "firebase/messaging";
import { useRouter } from "next/navigation";
import { fetchToken, messaging } from "../../firebase";

async function getNotificationPermissionAndToken(): Promise<string | null> {
	if (!("Notification" in window)) {
		console.info("This browser does not support desktop notification");
		return null;
	}

	if (Notification.permission === "granted") {
		return await fetchToken();
	}

	if (Notification.permission !== "denied") {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			return await fetchToken();
		}
	}

	console.log("Notification permission not granted.");
	return null;
}

type UseFcmTokenReturn = {
	token: string | null;
	notificationPermissionStatus: NotificationPermission | null;
};

const useFcmToken = (): UseFcmTokenReturn => {
	const router = useRouter();
	const [notificationPermissionStatus, setNotificationPermissionStatus] =
		useState<NotificationPermission | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const retryLoadToken = useRef<number>(0);
	const isLoading = useRef<boolean>(false);

	const loadToken = async (): Promise<void> => {
		if (isLoading.current) return;
		isLoading.current = true;

		const token = await getNotificationPermissionAndToken();

		if (Notification.permission === "denied") {
			setNotificationPermissionStatus("denied");
			console.info(
				"%cPush Notifications issue - permission denied",
				"color: green; background: #c7c7c7; padding: 8px; font-size: 20px",
			);
			isLoading.current = false;
			return;
		}

		if (!token) {
			if (retryLoadToken.current >= 3) {
				alert("Unable to load token, refresh the browser");
				console.info(
					"%cPush Notifications issue - unable to load token after 3 retries",
					"color: green; background: #c7c7c7; padding: 8px; font-size: 20px",
				);
				isLoading.current = false;
				return;
			}

			retryLoadToken.current += 1;
			console.error("An error occurred while retrieving token. Retrying...");
			isLoading.current = false;
			await loadToken();
			return;
		}

		setNotificationPermissionStatus(Notification.permission);
		setToken(token);
		isLoading.current = false;
	};

	useEffect(() => {
		if ("Notification" in window) {
			loadToken();
		}
	}, []);

	useEffect(() => {
		const setupListener = async (): Promise<Unsubscribe | null> => {
			if (!token) return null;
			console.log(`onMessage registered with token ${token}`);

			const m: Messaging | null = await messaging();
			if (!m) return null;

			const unsubscribe: Unsubscribe = onMessage(m, (payload) => {
				if (Notification.permission !== "granted") return;
				console.log("Foreground push notification received:", payload);

				const link: string | undefined =
					payload.fcmOptions?.link || payload.data?.link;
				const notification = new Notification(
					payload.notification?.title || "New message",
					{
						body: payload.notification?.body || "This is a new message",
						data: link ? { url: link } : undefined,
					},
				);

				notification.onclick = (event) => {
					event.preventDefault();
					const target = event.target as Notification & {
						data?: { url?: string };
					};
					const link = target?.data?.url;
					if (link) {
						router.push(link);
					} else {
						console.log("No link found in the notification payload");
					}
				};
			});

			return unsubscribe;
		};

		let unsubscribe: Unsubscribe | null = null;

		setupListener().then((unsub) => {
			if (unsub) {
				unsubscribe = unsub;
			}
		});

		return () => unsubscribe?.();
	}, [token, router]);

	return { token, notificationPermissionStatus };
};

export default useFcmToken;

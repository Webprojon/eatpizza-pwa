import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config();
const serviceAccount = JSON.parse(process.env.SERVICE_KEY || "{}");

// `private_key` may contain `\n` issue, fix it
if (serviceAccount.private_key) {
	serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
}

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
	});
}

export async function POST(request: NextRequest) {
	const { token, title, message, link } = await request.json();

	const payload: Message = {
		token,
		notification: {
			title: title,
			body: message,
		},
		webpush: link
			? {
					fcmOptions: {
						link,
					},
				}
			: undefined,
	};

	try {
		await admin.messaging().send(payload);

		return NextResponse.json({ success: true, message: "Notification sent!" });
	} catch (error) {
		console.error("FCM Error:", error);
		return NextResponse.json({ success: false, error });
	}
}

import {
	getKindeServerSession,
	LoginLink,
	LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import noAvatar from "../../../public/general-imgs/noAvatar.png";

export default async function Profile() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	const btnStyles =
		"w-full sm:w-[7rem] text-center bg-gradient-green bg-gradient-green-hover font-semibold text-white transition-all rounded-md py-2 px-6";

	return (
		<div className="flex flex-col max-w-[1250px] mx-auto text-lg px-3 md:px-0 mt-8 md:mt-14">
			{!user ? (
				<>
					<p className="mb-4">
						<span className="font-semibold">Hey there! ✌️ </span>
						Please do not forget to login to be able to access our products.
					</p>
					<LoginLink className={btnStyles}>Login</LoginLink>
				</>
			) : (
				<>
					<div className="flex flex-col gap-y-3 mb-6">
						<Image
							src={(user && user.picture) || noAvatar}
							width={200}
							height={200}
							alt="user img"
							className="w-14 h-14 rounded-full object-cover"
						/>
						<p>
							<span className="font-semibold">Name: </span>
							{user?.given_name}
						</p>
						<p>
							<span className="font-semibold">Surname: </span>
							{user?.family_name}
						</p>
						<p>
							<span className="font-semibold">Email: </span>
							{user?.email}
						</p>
					</div>
					<LogoutLink className={btnStyles}>Logout</LogoutLink>
				</>
			)}
		</div>
	);
}

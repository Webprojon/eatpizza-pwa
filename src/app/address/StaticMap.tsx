import React from "react";

export default function StaticMap() {
	return (
		<iframe
			src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d41821.33043349338!2d21.04545425918216!3d52.24534182763817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2spl!4v1712224008631!5m2!1sen!2spl"
			className="w-full md:w-[60%] h-[28vh] md:h-[45vh] rounded-md"
			loading="lazy"
		></iframe>
	);
}

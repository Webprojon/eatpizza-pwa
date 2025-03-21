export default function loading() {
	return (
		<div className="flex items-center justify-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
			<div className="border-slate-700 dark:border-slate-300 border-2 border-t-transparent dark:border-t-transparent w-10 h-10 rounded-full animate-spin"></div>
		</div>
	);
}

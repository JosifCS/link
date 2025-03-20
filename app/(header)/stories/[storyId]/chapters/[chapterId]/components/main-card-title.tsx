export function MainCardTitle({ title }: { title: string }) {
	return (
		<div className="flex justify-between">
			<h2
				className="font-medium text-lg h-10 mb-2"
				style={{ lineHeight: "40px" }}
			>
				{title}
			</h2>
		</div>
	)
}

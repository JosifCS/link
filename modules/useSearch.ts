import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

export function useSearch<T extends { text: string; id: number }>({
	options,
	selectedId,
	path,
}: {
	options: T[]
	selectedId: number
	path: string
}) {
	const { push } = useRouter()
	const [searchValue, setSearchValue] = useState<string>("")

	const filtered = useMemo<T[]>(() => {
		if (searchValue.length) {
			const stl = searchValue.toLowerCase()
			return options.filter((x) => x.text.toLowerCase().includes(stl))
		}

		return options
	}, [options, searchValue])

	useEffect(() => {
		if (
			searchValue.length &&
			filtered.length &&
			selectedId != filtered[0].id
		) {
			push(`${path}/${filtered[0].id}`)
		}
	}, [filtered])

	return { filtered, searchValue, setSearchValue }
}

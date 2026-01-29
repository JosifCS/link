"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export function Counter() {
	const [counter, setCounter] = useState(0)
	const { push } = useRouter()

	function addOne() {
		setCounter((o) => ++o)
		push(`?count=${counter + 1}`)
	}

	return (
		<>
			<p>Count: {counter}</p>
			<button type="button" onClick={addOne}>
				+1
			</button>
		</>
	)
}

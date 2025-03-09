import { importStory } from "@/actions/import"
import { Dialog } from "@/components/dialog"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"

// TODO locales

export default async function Page() {
	return (
		<Dialog title={"Import příběhu"} description="JSON soubor.">
			<Form action={importStory}>
				<FormInput
					title="Příběh"
					name="schema"
					type="file"
					accept="application/json"
				/>

				<DialogFooter>
					<Button type="submit">Importovat</Button>
				</DialogFooter>
			</Form>
		</Dialog>
	)
}

import { create } from "zustand"

type ChapterState = {
	dialogId: number | null
	sentenceId: number | null
	level: () => "chapter" | "dialog" | "sentence"
	setChapter: () => void
	setDialog: (diloagId: number) => void
	setSentence: (sentenceId: number) => void
}

export const useChapterState = create<ChapterState>()((set, get) => ({
	dialogId: null,
	sentenceId: null,
	level: () =>
		get().sentenceId != null
			? "sentence"
			: get().dialogId != null
				? "dialog"
				: "chapter",
	setChapter: () => set((state) => ({ dialogId: null, sentenceId: null })),
	setDialog: (dialogId) => set((state) => ({ dialogId, sentenceId: null })),
	setSentence: (sentenceId) => set((state) => ({ sentenceId })),
}))

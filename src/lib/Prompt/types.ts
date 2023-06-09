export type PromptProps = {
    title: string
    onDismiss: () => void
    onSubmit: () => void
    disabled?: boolean
    loading?: boolean
    width?: number
}

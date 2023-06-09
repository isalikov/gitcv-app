export type PromptProps = {
    buttonText: string
    title: string
    onDismiss: () => void
    onSubmit: () => void
    disabled?: boolean
    loading?: boolean
    width?: number
}

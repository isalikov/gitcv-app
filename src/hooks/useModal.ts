import { useEffect, useState } from 'react'

import { Nil, Overlay } from '@gitcv/lib'

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleClose()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)

        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    return {
        handleOpen,
        handleClose,
        Modal: isOpen ? Overlay : Nil,
    }
}

export default useModal

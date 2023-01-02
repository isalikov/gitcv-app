import { PropsWithChildren } from 'react'

import styles from './styles.scss'
import { ButtonProps } from './types'

const Button = ({ children }: PropsWithChildren<ButtonProps>) => {
    return (
        <button type="button" className={styles.container}>
            {children}
        </button>
    )
}

export default Button

import Icon from 'feather-react'
import { Tooltip } from 'primereact/tooltip'

import { Link } from 'react-router-dom'

import { useModal } from '@gitcv/hooks'

import { AsideButton, Container } from './styled'
import useAside from './useAside'
import { GenerateCvDialog } from '../GenerateCvDialog'

const Aside = () => {
    const { isDashActive, isLinkActive, links } = useAside()
    const { handleClose, handleOpen, Modal } = useModal()

    return (
        <Container>
            <Link to="/">
                <AsideButton isActive={isDashActive}>
                    <Icon name="settings" size={20} />
                </AsideButton>
            </Link>

            {links.map((link) => (
                <Link to={link.to} key={link.id}>
                    <AsideButton
                        isActive={isLinkActive(link.to)}
                        className={`link-${link.to}`}
                    >
                        <Icon name="file-text" size={20} />
                    </AsideButton>
                    <Tooltip content={link.title} target={`.link-${link.to}`} />
                </Link>
            ))}

            <AsideButton onClick={handleOpen}>
                <Icon name="plus" size={20} />
            </AsideButton>

            <Modal>
                <GenerateCvDialog onComplete={handleClose} />
            </Modal>
        </Container>
    )
}

export default Aside

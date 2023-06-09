import { InputText } from 'primereact/inputtext'

import { Message } from '@gitcv/components'

import { useLocale } from '@gitcv/hooks'

import {
    Container,
    Header,
    HeaderRow,
    ContactRow,
    ContactLabel,
    ContactContainer,
    Button,
} from './styled'
import useContacts from './useContacts'

const Contacts = () => {
    const { getMessage } = useLocale()

    const {
        contacts,
        handleAdd,
        handleAppend,
        handleChange,
        handleRemove,
        isAppend,
        setTempKey,
        setTempValue,
        tempKey,
        tempValue,
    } = useContacts()

    return (
        <Container>
            <Header>
                <HeaderRow>
                    {!isAppend && (
                        <>
                            <Button
                                rounded
                                text
                                icon="pi pi-plus"
                                severity="secondary"
                                size="small"
                                onClick={handleAdd}
                            />
                            <Message align="center">
                                {getMessage('text.contacts')}
                            </Message>
                        </>
                    )}
                    {isAppend && (
                        <>
                            <Button
                                rounded
                                text
                                icon="pi pi-check"
                                severity="secondary"
                                size="small"
                                onClick={handleAppend}
                            />
                            <ContactContainer>
                                <ContactLabel>Key</ContactLabel>
                                <InputText
                                    autoFocus
                                    value={tempKey}
                                    className="p-inputtext-sm w-14rem"
                                    onChange={(e) => setTempKey(e.target.value)}
                                />
                            </ContactContainer>
                            <ContactContainer>
                                <ContactLabel>Value</ContactLabel>
                                <InputText
                                    value={tempValue}
                                    className="p-inputtext-sm w-14rem"
                                    onChange={(e) =>
                                        setTempValue(e.target.value)
                                    }
                                />
                            </ContactContainer>
                        </>
                    )}
                </HeaderRow>
            </Header>

            {Object.keys(contacts).map((key) => (
                <ContactRow key={key}>
                    <Button
                        size="small"
                        icon="pi pi-times"
                        rounded
                        text
                        severity="secondary"
                        onClick={() => handleRemove(key)}
                    />
                    <ContactContainer>
                        <ContactLabel>{key}</ContactLabel>
                        <InputText
                            className="p-inputtext-sm w-28rem"
                            value={contacts[key]}
                            onChange={(e) => handleChange(key, e.target.value)}
                        />
                    </ContactContainer>
                </ContactRow>
            ))}
        </Container>
    )
}

export default Contacts

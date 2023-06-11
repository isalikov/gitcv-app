import FeatherIcon from 'feather-react'
import { InputText } from 'primereact/inputtext'

import {
    Container,
    AddRow,
    ContactRow,
    ContactLabel,
    ContactContainer,
    Button,
} from './styled'
import useContacts from './useContacts'

const Contacts = () => {
    const {
        disabled,
        contacts,
        key,
        value,
        setKey,
        setValue,
        handleAdd,
        handleChange,
        handleRemove,
    } = useContacts()

    return (
        <Container>
            {Object.keys(contacts).map((keyString) => (
                <ContactRow key={keyString}>
                    <Button onClick={() => handleRemove(keyString)}>
                        <FeatherIcon name="x" />
                    </Button>
                    <ContactContainer>
                        <ContactLabel>{keyString}</ContactLabel>
                        <InputText
                            className="p-inputtext-sm"
                            value={contacts[keyString]}
                            onChange={(e) =>
                                handleChange(keyString, e.target.value)
                            }
                        />
                    </ContactContainer>
                </ContactRow>
            ))}
            <AddRow>
                <Button type="button" onClick={handleAdd} disabled={disabled}>
                    <FeatherIcon name="check" />
                </Button>
                <ContactContainer>
                    <ContactLabel>Key</ContactLabel>
                    <InputText
                        value={key}
                        className="p-inputtext-sm"
                        onChange={(e) => setKey(e.target.value)}
                    />
                </ContactContainer>
                <ContactContainer>
                    <ContactLabel>Value</ContactLabel>
                    <InputText
                        value={value}
                        className="p-inputtext-sm"
                        onChange={(e) => setValue(e.target.value)}
                    />
                </ContactContainer>
            </AddRow>
        </Container>
    )
}

export default Contacts

import FeatherIcon from 'feather-react'

import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'

import { useLocale } from '@gitcv/hooks'

import { Container, Row, Button, Title } from './styled'
import useLanguages from './useLanguages'

const Languages = () => {
    const { getMessage } = useLocale()

    const {
        disabled,
        handleAdd,
        handleRemove,
        level,
        levels,
        setLevel,
        setTitle,
        title,
        value,
    } = useLanguages()

    return (
        <Container>
            {value.map((skill) => (
                <Row key={skill.uuid}>
                    <Button
                        type="button"
                        onClick={() => handleRemove(skill.uuid)}
                    >
                        <FeatherIcon name="x" />
                    </Button>
                    <Title>{skill.title}</Title>
                </Row>
            ))}
            <Row>
                <Button type="button" onClick={handleAdd} disabled={disabled}>
                    <FeatherIcon name="check" />
                </Button>
                <InputText
                    className="p-inputtext-sm"
                    value={title}
                    placeholder={getMessage('label.title')}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Dropdown
                    className="p-inputtext-sm"
                    placeholder={getMessage('label.level')}
                    value={level}
                    options={levels}
                    onChange={(e) => setLevel(e.target.value)}
                />
            </Row>
        </Container>
    )
}

export default Languages

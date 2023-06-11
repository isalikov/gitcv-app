import Icon from 'feather-react'

import FeatherIcon from 'feather-react'

import { InputText } from 'primereact/inputtext'

import { useLocale } from '@gitcv/hooks'

import { Container, Row, Button, Title } from './styled'
import useSkills from './useSkills'

const Skills = () => {
    const { getMessage } = useLocale()

    const { value, handleAdd, handleRemove, title, setTitle, disabled } =
        useSkills()

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
                    placeholder={getMessage('label.placeholder.skill')}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Row>
        </Container>
    )
}

export default Skills

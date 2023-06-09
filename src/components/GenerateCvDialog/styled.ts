import { InputText as InputTextComponent } from 'primereact/inputtext'
import { MultiSelect as MultiSelectComponent } from 'primereact/multiselect'

import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`

export const MultiSelect = styled(MultiSelectComponent)`
    width: 442px;
`

export const InputText = styled(InputTextComponent)`
    width: 100%;
`

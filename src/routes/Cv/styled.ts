import { ScrollPanel } from 'primereact/scrollpanel'
import styled from 'styled-components'

export const Container = styled(ScrollPanel)`
    height: 100vh;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px;
    max-width: 800px;
`

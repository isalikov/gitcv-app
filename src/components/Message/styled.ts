import FeaterIcon from 'feather-react'
import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    grid-template-columns: 20px 1fr;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
`

export const Text = styled.p`
    margin: 0;
    line-height: 24px;
    color: ${(props) => props.theme.colors.medium};
    vertical-align: top;
`

export const Icon = styled(FeaterIcon)`
    color: ${(props) => props.theme.colors.dark};
    transform: translateY(2px);
`

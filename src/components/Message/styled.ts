import FeatherIcon from 'feather-react'
import styled from 'styled-components'

export const Icon = styled(FeatherIcon)`
    color: ${(props) => props.theme.colors.dark};
`

export const Container = styled.div`
    display: grid;
    grid-template-columns: 20px 1fr;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
`

export const Text = styled.span`
    margin: 0;
    line-height: 18px;
    color: ${(props) => props.theme.colors.medium};
    vertical-align: top;
    font-size: 13px;
`

import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    gap: 12px;
`

export const Fields = styled.div`
    display: grid;
    grid-template-rows: 40px 40px auto 50px;
    gap: 12px;
    flex: 1 1 auto;
`

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ReposCounter = styled.span`
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 13px;
    gap: 6px;
`

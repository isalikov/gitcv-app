import styled from 'styled-components'

export const Container = styled.div`
    position: fixed;
    right: 15px;
    bottom: 15px;
    height: 40px;
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: rgba(32, 32, 32, 0.05);
    padding: 0 14px;
    border-radius: 24px;
`

export const Title = styled.span`
    font-weight: 500;
    font-size: 12px;
`

export const Done = styled.div`
    display: flex;
    width: 22px;
    height: 22px;
    align-items: center;
    justify-content: center;
    color: var(--green-700);
`

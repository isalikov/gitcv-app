import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.colors.light};
    height: 260px;
    padding: 12px;
    align-items: center;
    flex-direction: column;
    gap: 24px;
    position: relative;
    overflow: hidden;
`

export const Image = styled.img`
    width: 160px;
    height: 160px;
    border-radius: 50%;
`

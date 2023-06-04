import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    align-items: flex-start;
    padding: 30px;
    border: 1px solid ${(props) => props.theme.colors.line.default};
    margin: 30px;
    border-radius: 8px;
`

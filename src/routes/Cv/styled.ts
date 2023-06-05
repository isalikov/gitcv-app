import styled from 'styled-components'

export const Container = styled.div`
    width: 800px;
    display: flex;
    flex-direction: column;
    margin: 100px auto;
    border: 1px solid ${(props) => props.theme.colors.line.default};
    padding: 50px;
    border-radius: 8px;
`

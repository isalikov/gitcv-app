import styled from 'styled-components'

export const ChangeOverlay = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    position: absolute;
    height: 100px;
    width: 100%;
    bottom: 0;
    display: none;
    align-items: center;
    flex-direction: column;
    padding: 15px 0;
    user-select: none;
`

export const Container = styled.div`
    display: flex;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.colors.light};
    height: 200px;
    padding: 12px;
    align-items: center;
    flex-direction: column;
    gap: 24px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &:hover ${ChangeOverlay} {
        display: flex;
    }
`

export const Image = styled.img`
    width: 140px;
    height: 140px;
    border-radius: 50%;
`

export const Label = styled.span`
    display: flex;
    font-size: 13px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.light};
    background-color: ${(props) => props.theme.colors.dark};
    height: 22px;
    align-items: center;
    padding: 0 8px;
    border-radius: 12px;
`

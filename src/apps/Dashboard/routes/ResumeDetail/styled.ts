import styled from '@emotion/styled';

export const StyledContainer = styled.div`
  max-width: 1200px;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
`;

export const StyledTitleSection = styled.div`
  flex: 1;
`;

export const StyledTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

export const StyledSubtitle = styled.p`
  font-size: 14px;
  color: #666;
`;

export const StyledActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const StyledButton = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #0052a3;
  }
`;

export const StyledSecondaryButton = styled(StyledButton)`
  background-color: white;
  color: #0066cc;
  border: 1px solid #0066cc;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const StyledContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledSection = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledSectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
`;

export const StyledInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

export const StyledInfoItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
`;

export const StyledInfoLabel = styled.div`
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StyledInfoValue = styled.div`
  font-size: 14px;
  color: #333;
`;

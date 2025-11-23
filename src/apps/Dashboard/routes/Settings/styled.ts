import styled from '@emotion/styled';

export const StyledContainer = styled.div`
  max-width: 1200px;
`;

export const StyledTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 32px;
  color: #333;
`;

export const StyledSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

export const StyledSectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const StyledUserInfoGrid = styled.div`
  display: grid;
  gap: 16px;
`;

export const StyledInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const StyledInfoLabel = styled.span`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

export const StyledInfoValue = styled.span`
  font-size: 14px;
  color: #333;
`;

export const StyledSessionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledSessionCard = styled.div`
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledSessionInfo = styled.div`
  flex: 1;
`;

export const StyledSessionText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

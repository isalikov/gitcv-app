import styled from '@emotion/styled';
import { Link } from '@tanstack/react-router';

export const StyledContainer = styled.div`
  max-width: 1200px;
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const StyledTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
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
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

export const StyledResumeCard = styled(Link)`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

export const StyledResumeTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

export const StyledResumeDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
`;

export const StyledResumeFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

export const StyledResumeSlug = styled.span`
  font-size: 12px;
  color: #999;
`;

export const StyledResumeStatus = styled.span<{ isPublic: boolean }>`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 12px;
  background-color: ${(props) => (props.isPublic ? '#e6f7ff' : '#f5f5f5')};
  color: ${(props) => (props.isPublic ? '#0066cc' : '#999')};
`;

export const StyledEmptyState = styled.div`
  text-align: center;
  padding: 64px 24px;
  color: #666;
`;

export const StyledEmptyStateTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

export const StyledEmptyStateText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
`;

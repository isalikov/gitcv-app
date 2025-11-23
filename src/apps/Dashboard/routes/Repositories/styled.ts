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

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`;

export const StyledRepositoryCard = styled(Link)`
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

export const StyledRepoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const StyledRepoName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0066cc;
  margin: 0;
`;

export const StyledLanguage = styled.span<{ language?: string }>`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 12px;
  background-color: #e6f7ff;
  color: #0066cc;
`;

export const StyledRepoDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.5;
  min-height: 40px;
`;

export const StyledRepoStats = styled.div`
  display: flex;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
`;

export const StyledStat = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
`;

export const StyledStatIcon = styled.span`
  font-size: 16px;
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
`;

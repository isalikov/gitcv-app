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

export const StyledSubtitle = styled.a`
  font-size: 14px;
  color: #0066cc;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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

export const StyledStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;

export const StyledStatCard = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

export const StyledStatValue = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #0066cc;
  margin-bottom: 4px;
`;

export const StyledStatLabel = styled.div`
  font-size: 13px;
  color: #666;
`;

export const StyledReadmeContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 24px;

  /* Markdown styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    color: #333;
  }

  h1 {
    font-size: 32px;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 8px;
  }

  h2 {
    font-size: 24px;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 8px;
  }

  h3 {
    font-size: 20px;
  }

  p {
    margin-bottom: 16px;
    line-height: 1.6;
    color: #333;
  }

  code {
    background-color: #f5f5f5;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
  }

  pre {
    background-color: #f5f5f5;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 16px;

    code {
      background-color: transparent;
      padding: 0;
    }
  }

  ul,
  ol {
    margin-bottom: 16px;
    padding-left: 24px;

    li {
      margin-bottom: 8px;
      line-height: 1.6;
    }
  }

  blockquote {
    border-left: 4px solid #0066cc;
    padding-left: 16px;
    margin: 16px 0;
    color: #666;
  }

  a {
    color: #0066cc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 16px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;

    th,
    td {
      border: 1px solid #e0e0e0;
      padding: 12px;
      text-align: left;
    }

    th {
      background-color: #f5f5f5;
      font-weight: 600;
    }
  }

  hr {
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 24px 0;
  }
`;

export const StyledEmptyReadme = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #999;
  font-size: 14px;
`;

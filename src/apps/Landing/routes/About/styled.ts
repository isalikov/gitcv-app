import styled from '@emotion/styled';

export const StyledContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px;
`;

export const StyledTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #333;
`;

export const StyledSection = styled.section`
  margin-bottom: 40px;
`;

export const StyledSectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #444;
`;

export const StyledParagraph = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #666;
  margin-bottom: 16px;
`;

export const StyledFeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin: 32px 0;
`;

export const StyledFeatureCard = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid #667eea;
`;

export const StyledFeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
`;

export const StyledFeatureDescription = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #666;
`;

export const StyledHighlight = styled.span`
  color: #667eea;
  font-weight: 600;
`;

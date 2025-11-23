import styled from '@emotion/styled';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
`;

export const StyledCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

export const StyledTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const StyledSubtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
  line-height: 1.6;
`;

export const StyledButton = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 16px 48px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const StyledFeatures = styled.div`
  margin-top: 48px;
  text-align: left;
`;

export const StyledFeatureItem = styled.div`
  margin-bottom: 16px;
  padding-left: 32px;
  position: relative;
  color: #555;

  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
    font-size: 20px;
  }
`;

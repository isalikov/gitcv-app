import styled from '@emotion/styled';

export const StyledContainer = styled.div`
  max-width: 1200px;
`;

export const StyledTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

export const StyledSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

export const StyledCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledCardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

export const StyledCardValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #0066cc;
`;

export const StyledUserInfo = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const StyledAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

export const StyledUserDetails = styled.div`
  flex: 1;
`;

export const StyledUserName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #333;
`;

export const StyledUserEmail = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

export const StyledUserBio = styled.p`
  font-size: 14px;
  color: #666;
`;

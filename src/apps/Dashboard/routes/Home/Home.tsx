import { useGetMeQuery } from '@store';

import {
  StyledAvatar,
  StyledCard,
  StyledCardTitle,
  StyledCardValue,
  StyledContainer,
  StyledGrid,
  StyledSubtitle,
  StyledTitle,
  StyledUserBio,
  StyledUserDetails,
  StyledUserEmail,
  StyledUserInfo,
  StyledUserName,
} from './styled';

export const Home = () => {
  const { data: meData, isLoading } = useGetMeQuery();

  if (isLoading) {
    return <StyledContainer>Loading...</StyledContainer>;
  }

  if (!meData) {
    return <StyledContainer>No data available</StyledContainer>;
  }

  return (
    <StyledContainer>
      <StyledTitle>Welcome back, {meData.user.name || meData.user.username}!</StyledTitle>
      <StyledSubtitle>Here's an overview of your profile</StyledSubtitle>

      <StyledUserInfo>
        {meData.user.avatar_url && <StyledAvatar src={meData.user.avatar_url} alt="Avatar" />}
        <StyledUserDetails>
          <StyledUserName>{meData.user.name || meData.user.username}</StyledUserName>
          <StyledUserEmail>{meData.user.email}</StyledUserEmail>
          {meData.user.bio && <StyledUserBio>{meData.user.bio}</StyledUserBio>}
        </StyledUserDetails>
      </StyledUserInfo>

      <StyledGrid>
        <StyledCard>
          <StyledCardTitle>Resumes</StyledCardTitle>
          <StyledCardValue>{meData.resumes.length}</StyledCardValue>
        </StyledCard>
        <StyledCard>
          <StyledCardTitle>Repositories</StyledCardTitle>
          <StyledCardValue>{meData.repositories.length}</StyledCardValue>
        </StyledCard>
      </StyledGrid>
    </StyledContainer>
  );
};

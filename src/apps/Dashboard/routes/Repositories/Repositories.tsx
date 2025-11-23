import { useGetMeQuery } from '@store';

import {
  StyledContainer,
  StyledEmptyState,
  StyledEmptyStateText,
  StyledEmptyStateTitle,
  StyledGrid,
  StyledHeader,
  StyledLanguage,
  StyledRepoDescription,
  StyledRepoHeader,
  StyledRepoName,
  StyledRepoStats,
  StyledRepositoryCard,
  StyledStat,
  StyledStatIcon,
  StyledTitle,
} from './styled';

export const Repositories = () => {
  const { data: meData, isLoading } = useGetMeQuery();

  if (isLoading) {
    return <StyledContainer>Loading...</StyledContainer>;
  }

  const repositories = meData?.repositories || [];

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>My Repositories</StyledTitle>
      </StyledHeader>

      {repositories.length > 0 ? (
        <StyledGrid>
          {repositories.map((repo) => (
            <StyledRepositoryCard key={repo.id} to={`/repositories/${repo.id}`}>
              <StyledRepoHeader>
                <StyledRepoName>{repo.name}</StyledRepoName>
                {repo.language && (
                  <StyledLanguage language={repo.language}>{repo.language}</StyledLanguage>
                )}
              </StyledRepoHeader>
              <StyledRepoDescription>
                {repo.description || 'No description provided'}
              </StyledRepoDescription>
              <StyledRepoStats>
                <StyledStat>
                  <StyledStatIcon>⭐</StyledStatIcon>
                  {repo.stargazers_count}
                </StyledStat>
                <StyledStat>
                  <StyledStatIcon>🍴</StyledStatIcon>
                  {repo.forks_count}
                </StyledStat>
              </StyledRepoStats>
            </StyledRepositoryCard>
          ))}
        </StyledGrid>
      ) : (
        <StyledEmptyState>
          <StyledEmptyStateTitle>No repositories yet</StyledEmptyStateTitle>
          <StyledEmptyStateText>Your GitHub repositories will appear here</StyledEmptyStateText>
        </StyledEmptyState>
      )}
    </StyledContainer>
  );
};

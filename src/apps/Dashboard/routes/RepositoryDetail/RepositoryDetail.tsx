import { useGetMeQuery, useSyncRepositoryMutation } from '@store';
import { useParams } from '@tanstack/react-router';

import ReactMarkdown from 'react-markdown';

import {
  StyledActions,
  StyledButton,
  StyledContainer,
  StyledContent,
  StyledEmptyReadme,
  StyledHeader,
  StyledInfoGrid,
  StyledInfoItem,
  StyledInfoLabel,
  StyledInfoValue,
  StyledReadmeContainer,
  StyledSection,
  StyledSectionTitle,
  StyledStatCard,
  StyledStatLabel,
  StyledStatValue,
  StyledStatsGrid,
  StyledSubtitle,
  StyledTitle,
  StyledTitleSection,
} from './styled';

export const RepositoryDetail = () => {
  const { id } = useParams({ from: '/dashboard/repositories/$id' });
  const { data: meData, isLoading } = useGetMeQuery();
  const [syncRepository, { isLoading: syncing }] = useSyncRepositoryMutation();

  const repository = meData?.repositories.find((repo) => repo.id === Number(id));

  const handleSync = async () => {
    if (!repository) return;

    try {
      await syncRepository(repository.github_id).unwrap();
      alert('Repository synced successfully!');
    } catch (error) {
      console.error('Failed to sync repository:', error);
      alert('Failed to sync repository');
    }
  };

  if (isLoading) {
    return <StyledContainer>Loading...</StyledContainer>;
  }

  if (!repository) {
    return <StyledContainer>Repository not found</StyledContainer>;
  }

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitleSection>
          <StyledTitle>{repository.name}</StyledTitle>
          <StyledSubtitle href={repository.html_url} target="_blank" rel="noopener noreferrer">
            View on GitHub →
          </StyledSubtitle>
        </StyledTitleSection>
        <StyledActions>
          <StyledButton onClick={() => void handleSync()} disabled={syncing}>
            {syncing ? 'Syncing...' : 'Sync Repository'}
          </StyledButton>
        </StyledActions>
      </StyledHeader>

      <StyledContent>
        <StyledSection>
          <StyledSectionTitle>Statistics</StyledSectionTitle>
          <StyledStatsGrid>
            <StyledStatCard>
              <StyledStatValue>⭐ {repository.stargazers_count}</StyledStatValue>
              <StyledStatLabel>Stars</StyledStatLabel>
            </StyledStatCard>
            <StyledStatCard>
              <StyledStatValue>🍴 {repository.forks_count}</StyledStatValue>
              <StyledStatLabel>Forks</StyledStatLabel>
            </StyledStatCard>
            <StyledStatCard>
              <StyledStatValue>{repository.language || 'N/A'}</StyledStatValue>
              <StyledStatLabel>Language</StyledStatLabel>
            </StyledStatCard>
            <StyledStatCard>
              <StyledStatValue>{repository.github_id.toString().slice(0, 4)}...</StyledStatValue>
              <StyledStatLabel>GitHub ID</StyledStatLabel>
            </StyledStatCard>
          </StyledStatsGrid>
        </StyledSection>

        {repository.description && (
          <StyledSection>
            <StyledSectionTitle>Description</StyledSectionTitle>
            <StyledInfoValue>{repository.description}</StyledInfoValue>
          </StyledSection>
        )}

        <StyledSection>
          <StyledSectionTitle>Repository Information</StyledSectionTitle>
          <StyledInfoGrid>
            <StyledInfoItem>
              <StyledInfoLabel>Name</StyledInfoLabel>
              <StyledInfoValue>{repository.name}</StyledInfoValue>
            </StyledInfoItem>
            <StyledInfoItem>
              <StyledInfoLabel>GitHub ID</StyledInfoLabel>
              <StyledInfoValue>{repository.github_id}</StyledInfoValue>
            </StyledInfoItem>
            <StyledInfoItem>
              <StyledInfoLabel>Language</StyledInfoLabel>
              <StyledInfoValue>{repository.language || 'Not specified'}</StyledInfoValue>
            </StyledInfoItem>
            <StyledInfoItem>
              <StyledInfoLabel>Created</StyledInfoLabel>
              <StyledInfoValue>
                {new Date(repository.created_at).toLocaleDateString()}
              </StyledInfoValue>
            </StyledInfoItem>
            <StyledInfoItem>
              <StyledInfoLabel>Updated</StyledInfoLabel>
              <StyledInfoValue>
                {new Date(repository.updated_at).toLocaleDateString()}
              </StyledInfoValue>
            </StyledInfoItem>
          </StyledInfoGrid>
        </StyledSection>
      </StyledContent>

      {repository.readme ? (
        <StyledReadmeContainer>
          <StyledSectionTitle>README</StyledSectionTitle>
          <ReactMarkdown>{repository.readme}</ReactMarkdown>
        </StyledReadmeContainer>
      ) : (
        <StyledReadmeContainer>
          <StyledSectionTitle>README</StyledSectionTitle>
          <StyledEmptyReadme>
            README is not available. Sync the repository to fetch README.md
          </StyledEmptyReadme>
        </StyledReadmeContainer>
      )}
    </StyledContainer>
  );
};

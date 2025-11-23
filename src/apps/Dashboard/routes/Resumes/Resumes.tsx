import { useGetResumesQuery } from '@store';

import {
  StyledButton,
  StyledContainer,
  StyledEmptyState,
  StyledEmptyStateText,
  StyledEmptyStateTitle,
  StyledGrid,
  StyledHeader,
  StyledResumeCard,
  StyledResumeDescription,
  StyledResumeFooter,
  StyledResumeSlug,
  StyledResumeStatus,
  StyledResumeTitle,
  StyledTitle,
} from './styled';

export const Resumes = () => {
  const { data: resumes, isLoading } = useGetResumesQuery();

  if (isLoading) {
    return <StyledContainer>Loading...</StyledContainer>;
  }

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>My Resumes</StyledTitle>
        <StyledButton>Create New Resume</StyledButton>
      </StyledHeader>

      {resumes && resumes.length > 0 ? (
        <StyledGrid>
          {resumes.map((resume) => (
            <StyledResumeCard key={resume.id} to={`/resumes/${resume.id}`}>
              <StyledResumeTitle>{resume.title}</StyledResumeTitle>
              <StyledResumeDescription>
                {resume.about || 'No description provided'}
              </StyledResumeDescription>
              <StyledResumeFooter>
                <StyledResumeSlug>/{resume.slug}</StyledResumeSlug>
                <StyledResumeStatus isPublic={resume.is_public}>
                  {resume.is_public ? 'Public' : 'Private'}
                </StyledResumeStatus>
              </StyledResumeFooter>
            </StyledResumeCard>
          ))}
        </StyledGrid>
      ) : (
        <StyledEmptyState>
          <StyledEmptyStateTitle>No resumes yet</StyledEmptyStateTitle>
          <StyledEmptyStateText>Create your first resume to get started</StyledEmptyStateText>
          <StyledButton>Create New Resume</StyledButton>
        </StyledEmptyState>
      )}
    </StyledContainer>
  );
};

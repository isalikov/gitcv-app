import { useGetResumeQuery } from '@store';
import { useParams } from '@tanstack/react-router';

import {
  StyledActions,
  StyledButton,
  StyledContainer,
  StyledContent,
  StyledHeader,
  StyledInfoGrid,
  StyledInfoItem,
  StyledInfoLabel,
  StyledInfoValue,
  StyledSecondaryButton,
  StyledSection,
  StyledSectionTitle,
  StyledSubtitle,
  StyledTitle,
  StyledTitleSection,
} from './styled';

export const ResumeDetail = () => {
  const { id } = useParams({ from: '/dashboard/resumes/$id' });
  const { data: resume, isLoading } = useGetResumeQuery(Number(id));

  if (isLoading) {
    return <StyledContainer>Loading...</StyledContainer>;
  }

  if (!resume) {
    return <StyledContainer>Resume not found</StyledContainer>;
  }

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitleSection>
          <StyledTitle>{resume.title}</StyledTitle>
          <StyledSubtitle>Slug: {resume.slug}</StyledSubtitle>
        </StyledTitleSection>
        <StyledActions>
          <StyledSecondaryButton>Export PDF</StyledSecondaryButton>
          <StyledButton>Edit</StyledButton>
        </StyledActions>
      </StyledHeader>

      <StyledContent>
        <StyledSection>
          <StyledSectionTitle>Basic Information</StyledSectionTitle>
          <StyledInfoGrid>
            <StyledInfoItem>
              <StyledInfoLabel>Title</StyledInfoLabel>
              <StyledInfoValue>{resume.title}</StyledInfoValue>
            </StyledInfoItem>
            <StyledInfoItem>
              <StyledInfoLabel>Slug</StyledInfoLabel>
              <StyledInfoValue>{resume.slug}</StyledInfoValue>
            </StyledInfoItem>
            <StyledInfoItem>
              <StyledInfoLabel>Status</StyledInfoLabel>
              <StyledInfoValue>{resume.is_public ? 'Public' : 'Private'}</StyledInfoValue>
            </StyledInfoItem>
            <StyledInfoItem>
              <StyledInfoLabel>Created</StyledInfoLabel>
              <StyledInfoValue>{new Date(resume.created_at).toLocaleDateString()}</StyledInfoValue>
            </StyledInfoItem>
          </StyledInfoGrid>
        </StyledSection>

        {resume.about && (
          <StyledSection>
            <StyledSectionTitle>About</StyledSectionTitle>
            <StyledInfoValue>{resume.about}</StyledInfoValue>
          </StyledSection>
        )}

        <StyledSection>
          <StyledSectionTitle>Skills</StyledSectionTitle>
          <StyledInfoValue>{resume.skills.length} skills added</StyledInfoValue>
        </StyledSection>

        <StyledSection>
          <StyledSectionTitle>Work Experience</StyledSectionTitle>
          <StyledInfoValue>{resume.work_experience.length} experiences added</StyledInfoValue>
        </StyledSection>

        <StyledSection>
          <StyledSectionTitle>Education</StyledSectionTitle>
          <StyledInfoValue>{resume.education.length} education entries added</StyledInfoValue>
        </StyledSection>

        <StyledSection>
          <StyledSectionTitle>Languages</StyledSectionTitle>
          <StyledInfoValue>{resume.languages.length} languages added</StyledInfoValue>
        </StyledSection>
      </StyledContent>
    </StyledContainer>
  );
};

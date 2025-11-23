import { API_URL } from '../../../../constants';
import {
  StyledButton,
  StyledCard,
  StyledContainer,
  StyledFeatureItem,
  StyledFeatures,
  StyledSubtitle,
  StyledTitle,
} from './styled';

export const Home = () => {
  return (
    <StyledContainer>
      <StyledCard>
        <StyledTitle>GitCV</StyledTitle>
        <StyledSubtitle>
          Create beautiful resumes from your GitHub profile. Showcase your projects, skills, and
          experience in a professional format.
        </StyledSubtitle>
        <StyledButton href={`${API_URL}/v1/auth/github`}>Login with GitHub</StyledButton>

        <StyledFeatures>
          <StyledFeatureItem>Automatically sync your GitHub data</StyledFeatureItem>
          <StyledFeatureItem>Generate professional resumes</StyledFeatureItem>
          <StyledFeatureItem>Export to PDF format</StyledFeatureItem>
          <StyledFeatureItem>Customize and manage multiple resumes</StyledFeatureItem>
        </StyledFeatures>
      </StyledCard>
    </StyledContainer>
  );
};

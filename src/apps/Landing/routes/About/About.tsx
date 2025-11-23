import {
  StyledContainer,
  StyledFeatureCard,
  StyledFeatureDescription,
  StyledFeatureGrid,
  StyledFeatureTitle,
  StyledHighlight,
  StyledParagraph,
  StyledSection,
  StyledSectionTitle,
  StyledTitle,
} from './styled';

export const About = () => {
  return (
    <StyledContainer>
      <StyledTitle>About GitCV</StyledTitle>

      <StyledSection>
        <StyledSectionTitle>What is GitCV?</StyledSectionTitle>
        <StyledParagraph>
          GitCV is a modern web application that helps developers create professional resumes
          directly from their GitHub profiles. By leveraging the rich data available on GitHub, we
          make it easy to showcase your projects, contributions, and technical skills in a
          beautifully formatted resume.
        </StyledParagraph>
        <StyledParagraph>
          Whether you're looking for a new job, preparing for interviews, or simply want to maintain
          an up-to-date professional profile, GitCV streamlines the process by automatically syncing
          with your GitHub account.
        </StyledParagraph>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>Key Features</StyledSectionTitle>
        <StyledFeatureGrid>
          <StyledFeatureCard>
            <StyledFeatureTitle>GitHub Integration</StyledFeatureTitle>
            <StyledFeatureDescription>
              Seamlessly connect with your GitHub account using OAuth. Your profile data, including
              repositories, languages, and contributions, is automatically imported.
            </StyledFeatureDescription>
          </StyledFeatureCard>

          <StyledFeatureCard>
            <StyledFeatureTitle>Smart Sync</StyledFeatureTitle>
            <StyledFeatureDescription>
              Keep your resume up-to-date with a single click. Sync your latest projects,
              repositories, and skills whenever you need.
            </StyledFeatureDescription>
          </StyledFeatureCard>

          <StyledFeatureCard>
            <StyledFeatureTitle>Multiple Resumes</StyledFeatureTitle>
            <StyledFeatureDescription>
              Create and manage multiple resumes for different purposes. Customize each one to
              highlight specific skills or projects.
            </StyledFeatureDescription>
          </StyledFeatureCard>

          <StyledFeatureCard>
            <StyledFeatureTitle>PDF Export</StyledFeatureTitle>
            <StyledFeatureDescription>
              Generate professional PDF versions of your resumes with a single click. Perfect for
              job applications and sharing.
            </StyledFeatureDescription>
          </StyledFeatureCard>

          <StyledFeatureCard>
            <StyledFeatureTitle>Customization</StyledFeatureTitle>
            <StyledFeatureDescription>
              Edit and customize your resume content. Add personal touches while maintaining the
              professional format.
            </StyledFeatureDescription>
          </StyledFeatureCard>

          <StyledFeatureCard>
            <StyledFeatureTitle>Privacy First</StyledFeatureTitle>
            <StyledFeatureDescription>
              Your data is secure. We only access what you authorize and never share your
              information with third parties.
            </StyledFeatureDescription>
          </StyledFeatureCard>
        </StyledFeatureGrid>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>How It Works</StyledSectionTitle>
        <StyledParagraph>
          <StyledHighlight>1. Connect:</StyledHighlight> Sign in with your GitHub account using
          secure OAuth authentication.
        </StyledParagraph>
        <StyledParagraph>
          <StyledHighlight>2. Sync:</StyledHighlight> GitCV automatically imports your profile data,
          repositories, and skills from GitHub.
        </StyledParagraph>
        <StyledParagraph>
          <StyledHighlight>3. Customize:</StyledHighlight> Edit and organize your information to
          create the perfect resume for your needs.
        </StyledParagraph>
        <StyledParagraph>
          <StyledHighlight>4. Export:</StyledHighlight> Generate a professional PDF resume ready for
          job applications and sharing.
        </StyledParagraph>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>Technology Stack</StyledSectionTitle>
        <StyledParagraph>
          GitCV is built with modern web technologies to ensure a fast, reliable, and secure
          experience:
        </StyledParagraph>
        <StyledParagraph>
          <StyledHighlight>Frontend:</StyledHighlight> React, TypeScript, Emotion (CSS-in-JS), Redux
          Toolkit, React Router
        </StyledParagraph>
        <StyledParagraph>
          <StyledHighlight>Backend:</StyledHighlight> Go, PostgreSQL, JWT authentication, GitHub
          OAuth
        </StyledParagraph>
        <StyledParagraph>
          <StyledHighlight>Infrastructure:</StyledHighlight> Docker, Modern CI/CD practices
        </StyledParagraph>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>Open Source</StyledSectionTitle>
        <StyledParagraph>
          GitCV is an open-source project. We welcome contributions, feedback, and suggestions from
          the community. Check out our GitHub repository to learn more or contribute to the project.
        </StyledParagraph>
      </StyledSection>
    </StyledContainer>
  );
};

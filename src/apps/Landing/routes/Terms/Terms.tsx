import {
  StyledContainer,
  StyledDate,
  StyledList,
  StyledListItem,
  StyledParagraph,
  StyledSection,
  StyledSectionTitle,
  StyledTitle,
} from './styled';

export const Terms = () => {
  return (
    <StyledContainer>
      <StyledTitle>Terms of Service</StyledTitle>

      <StyledSection>
        <StyledSectionTitle>1. Acceptance of Terms</StyledSectionTitle>
        <StyledParagraph>
          By accessing and using GitCV, you accept and agree to be bound by the terms and provision
          of this agreement. If you do not agree to these terms, please do not use our service.
        </StyledParagraph>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>2. Description of Service</StyledSectionTitle>
        <StyledParagraph>
          GitCV provides a service that allows users to create and manage professional resumes based
          on their GitHub profile data. The service includes:
        </StyledParagraph>
        <StyledList>
          <StyledListItem>GitHub profile synchronization</StyledListItem>
          <StyledListItem>Resume creation and customization</StyledListItem>
          <StyledListItem>PDF export functionality</StyledListItem>
          <StyledListItem>Multiple resume management</StyledListItem>
        </StyledList>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>3. User Accounts</StyledSectionTitle>
        <StyledParagraph>
          To use GitCV, you must have a valid GitHub account. You are responsible for maintaining
          the confidentiality of your account credentials and for all activities that occur under
          your account.
        </StyledParagraph>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>4. Privacy and Data Usage</StyledSectionTitle>
        <StyledParagraph>
          We collect and process data from your GitHub profile as authorized by you during the OAuth
          authentication process. We use this data solely to provide our resume generation service.
          We do not sell or share your personal information with third parties.
        </StyledParagraph>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>5. User Content</StyledSectionTitle>
        <StyledParagraph>
          You retain all rights to the content you create using GitCV. However, by using our
          service, you grant us the right to store and process your data to provide the service.
        </StyledParagraph>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>6. Prohibited Uses</StyledSectionTitle>
        <StyledParagraph>
          You agree not to use GitCV for any unlawful purpose or in any way that:
        </StyledParagraph>
        <StyledList>
          <StyledListItem>Violates any applicable laws or regulations</StyledListItem>
          <StyledListItem>Infringes on the rights of others</StyledListItem>
          <StyledListItem>Attempts to gain unauthorized access to our systems</StyledListItem>
          <StyledListItem>Interferes with the proper functioning of the service</StyledListItem>
        </StyledList>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>7. Service Modifications</StyledSectionTitle>
        <StyledParagraph>
          We reserve the right to modify or discontinue the service at any time, with or without
          notice. We shall not be liable to you or any third party for any modification, suspension,
          or discontinuance of the service.
        </StyledParagraph>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>8. Limitation of Liability</StyledSectionTitle>
        <StyledParagraph>
          GitCV is provided "as is" without any warranties, express or implied. We shall not be
          liable for any indirect, incidental, special, consequential, or punitive damages resulting
          from your use of or inability to use the service.
        </StyledParagraph>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>9. Changes to Terms</StyledSectionTitle>
        <StyledParagraph>
          We reserve the right to update these terms at any time. We will notify users of any
          material changes by posting the new terms on this page. Your continued use of the service
          after such changes constitutes your acceptance of the new terms.
        </StyledParagraph>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>10. Contact Information</StyledSectionTitle>
        <StyledParagraph>
          If you have any questions about these Terms of Service, please contact us through our
          GitHub repository.
        </StyledParagraph>
      </StyledSection>

      <StyledDate>Last updated: November 22, 2025</StyledDate>
    </StyledContainer>
  );
};

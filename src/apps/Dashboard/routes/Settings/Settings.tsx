import { useGetMeQuery, useGetSessionsQuery, useSyncMeMutation } from '@store';

import {
  StyledButton,
  StyledContainer,
  StyledInfoLabel,
  StyledInfoRow,
  StyledInfoValue,
  StyledSection,
  StyledSectionTitle,
  StyledSessionCard,
  StyledSessionInfo,
  StyledSessionText,
  StyledSessionsList,
  StyledTitle,
  StyledUserInfoGrid,
} from './styled';

export const Settings = () => {
  const { data: meData, isLoading: meLoading } = useGetMeQuery();
  const { data: sessions, isLoading: sessionsLoading } = useGetSessionsQuery();
  const [syncMe, { isLoading: syncing }] = useSyncMeMutation();

  const handleSync = async () => {
    try {
      await syncMe().unwrap();
      alert('Profile synced successfully!');
    } catch (error) {
      console.error('Failed to sync:', error);
      alert('Failed to sync profile');
    }
  };

  if (meLoading) {
    return <StyledContainer>Loading...</StyledContainer>;
  }

  if (!meData) {
    return <StyledContainer>No data available</StyledContainer>;
  }

  return (
    <StyledContainer>
      <StyledTitle>Settings</StyledTitle>

      <StyledSection>
        <StyledSectionTitle>Profile Information</StyledSectionTitle>
        <StyledUserInfoGrid>
          <StyledInfoRow>
            <StyledInfoLabel>Username</StyledInfoLabel>
            <StyledInfoValue>{meData.user.username}</StyledInfoValue>
          </StyledInfoRow>
          <StyledInfoRow>
            <StyledInfoLabel>Name</StyledInfoLabel>
            <StyledInfoValue>{meData.user.name || '-'}</StyledInfoValue>
          </StyledInfoRow>
          <StyledInfoRow>
            <StyledInfoLabel>Email</StyledInfoLabel>
            <StyledInfoValue>{meData.user.email}</StyledInfoValue>
          </StyledInfoRow>
          <StyledInfoRow>
            <StyledInfoLabel>GitHub ID</StyledInfoLabel>
            <StyledInfoValue>{meData.user.github_id}</StyledInfoValue>
          </StyledInfoRow>
          <StyledInfoRow>
            <StyledInfoLabel>Bio</StyledInfoLabel>
            <StyledInfoValue>{meData.user.bio || '-'}</StyledInfoValue>
          </StyledInfoRow>
        </StyledUserInfoGrid>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>Synchronization</StyledSectionTitle>
        <p style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          Sync your profile data with GitHub to get the latest information
        </p>
        <StyledButton onClick={() => void handleSync()} disabled={syncing}>
          {syncing ? 'Syncing...' : 'Sync with GitHub'}
        </StyledButton>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>Active Sessions</StyledSectionTitle>
        {sessionsLoading ? (
          <p>Loading sessions...</p>
        ) : sessions && sessions.length > 0 ? (
          <StyledSessionsList>
            {sessions.map((session) => (
              <StyledSessionCard key={session.id}>
                <StyledSessionInfo>
                  <StyledSessionText>
                    <strong>Session ID:</strong> {session.id}
                  </StyledSessionText>
                  <StyledSessionText>
                    <strong>Expires:</strong> {new Date(session.expires_at).toLocaleString()}
                  </StyledSessionText>
                </StyledSessionInfo>
              </StyledSessionCard>
            ))}
          </StyledSessionsList>
        ) : (
          <p style={{ color: '#666', fontSize: '14px' }}>No active sessions</p>
        )}
      </StyledSection>
    </StyledContainer>
  );
};

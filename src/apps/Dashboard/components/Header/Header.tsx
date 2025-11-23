import { useGetMeQuery } from '@store';

import {
  StyledHeaderContainer,
  StyledIconButton,
  StyledUserAvatar,
  StyledUserName,
  StyledUserSection,
} from './styled';

export const Header = () => {
  const { data: meData } = useGetMeQuery();

  return (
    <StyledHeaderContainer>
      <StyledIconButton to="/settings">⚙️</StyledIconButton>
      <StyledUserSection>
        {meData?.user.avatar_url && <StyledUserAvatar src={meData.user.avatar_url} alt="Avatar" />}
        <StyledUserName>{meData?.user.name || meData?.user.username || 'User'}</StyledUserName>
      </StyledUserSection>
    </StyledHeaderContainer>
  );
};

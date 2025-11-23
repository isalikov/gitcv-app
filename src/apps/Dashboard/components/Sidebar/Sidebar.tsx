import {
  StyledLogo,
  StyledNav,
  StyledNavIcon,
  StyledNavLink,
  StyledSidebarContainer,
} from './styled';

export const Sidebar = () => {
  return (
    <StyledSidebarContainer>
      <StyledLogo>GitCV</StyledLogo>
      <StyledNav>
        <StyledNavLink to="/" activeOptions={{ exact: true }}>
          <StyledNavIcon>🏠</StyledNavIcon>
          <span>Dashboard</span>
        </StyledNavLink>
        <StyledNavLink to="/resumes">
          <StyledNavIcon>📄</StyledNavIcon>
          <span>Resumes</span>
        </StyledNavLink>
        <StyledNavLink to="/repositories">
          <StyledNavIcon>📦</StyledNavIcon>
          <span>Repositories</span>
        </StyledNavLink>
        <StyledNavLink to="/settings">
          <StyledNavIcon>⚙️</StyledNavIcon>
          <span>Settings</span>
        </StyledNavLink>
      </StyledNav>
    </StyledSidebarContainer>
  );
};

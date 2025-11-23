import { Outlet } from '@tanstack/react-router';

import {
  StyledContent,
  StyledFooter,
  StyledFooterText,
  StyledHeader,
  StyledLayoutContainer,
  StyledLogo,
  StyledNav,
  StyledNavLink,
  StyledNavLinks,
} from './styled';

export const LandingLayout = () => {
  return (
    <StyledLayoutContainer>
      <StyledHeader>
        <StyledNav>
          <StyledLogo to="/">GitCV</StyledLogo>
          <StyledNavLinks>
            <StyledNavLink to="/" activeOptions={{ exact: true }}>
              Home
            </StyledNavLink>
            <StyledNavLink to="/about">About</StyledNavLink>
            <StyledNavLink to="/terms">Terms</StyledNavLink>
          </StyledNavLinks>
        </StyledNav>
      </StyledHeader>

      <StyledContent>
        <Outlet />
      </StyledContent>

      <StyledFooter>
        <StyledFooterText>© 2025 GitCV. All rights reserved.</StyledFooterText>
      </StyledFooter>
    </StyledLayoutContainer>
  );
};

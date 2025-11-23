import styled from '@emotion/styled';
import { Link } from '@tanstack/react-router';

export const StyledLayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const StyledHeader = styled.header`
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 16px 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledNav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledLogo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const StyledNavLinks = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

export const StyledNavLink = styled(Link)`
  text-decoration: none;
  color: #666;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #667eea;
  }

  &.active {
    color: #667eea;
  }
`;

export const StyledContent = styled.main`
  flex: 1;
  background-color: #f5f5f5;
`;

export const StyledFooter = styled.footer`
  background: #333;
  color: white;
  padding: 24px;
  text-align: center;
`;

export const StyledFooterText = styled.p`
  font-size: 14px;
  margin: 0;
`;

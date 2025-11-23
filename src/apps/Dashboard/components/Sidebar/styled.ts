import styled from '@emotion/styled';
import { Link } from '@tanstack/react-router';

export const StyledSidebarContainer = styled.aside`
  width: 250px;
  background-color: #1e1e1e;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

export const StyledLogo = styled.div`
  padding: 0 20px 30px;
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  border-bottom: 1px solid #333;
  margin-bottom: 20px;
`;

export const StyledNav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 10px;
`;

export const StyledNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  color: #b3b3b3;
  text-decoration: none;
  transition: all 0.2s;
  font-size: 14px;

  &:hover {
    background-color: #2a2a2a;
    color: #ffffff;
  }

  &.active {
    background-color: #0066cc;
    color: #ffffff;
  }
`;

export const StyledNavIcon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
`;

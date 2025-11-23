import styled from '@emotion/styled';
import { Link } from '@tanstack/react-router';

export const StyledHeaderContainer = styled.header`
  height: 64px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
  gap: 16px;
`;

export const StyledIconButton = styled(Link)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #666;
  text-decoration: none;
  font-size: 20px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

export const StyledUserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-left: 16px;
  border-left: 1px solid #e0e0e0;
`;

export const StyledUserAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

export const StyledUserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

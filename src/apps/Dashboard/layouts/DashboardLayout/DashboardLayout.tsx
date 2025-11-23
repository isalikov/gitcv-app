import styled from '@emotion/styled';
import { Outlet } from '@tanstack/react-router';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background-color: #f5f5f5;
`;

export const DashboardLayout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <Main>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Main>
    </LayoutContainer>
  );
};

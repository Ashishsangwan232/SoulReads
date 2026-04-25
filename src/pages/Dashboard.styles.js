import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-default);
  font-family: 'Inter', sans-serif;
  color: var(--text-default);
`;

export const TopBar = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 60px;
  background: rgba(var(--bg-default-rgb), 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--fully-muted);
  z-index: 50;

  @media (min-width: 786px) {
    display: none;
  }
`;

export const MainDash = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
`;

export const SidebarContainer = styled.aside`
  width: 280px;
  background: var(--bg-card);
  border-right: 1px solid var(--fully-muted);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  z-index: 100;
  
  @media (max-width: 786px) {
    position: absolute;
    height: 100%;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid var(--fully-muted);
`;

export const ProfilePic = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary-color);
`;

export const ProfileInfo = styled.div`
  margin-left: 16px;
  
  h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }
  p {
    margin: 4px 0 0 0;
    font-size: 0.8rem;
    color: var(--text-muted);
  }
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 16px 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
`;

export const MenuItem = styled.li`
  a {
    display: flex;
    align-items: center;
    padding: 12px 24px;
    color: var(--text-muted);
    text-decoration: none;
    transition: all 0.2s ease;
    font-weight: 500;
    
    &:hover {
      background: var(--primary-muted);
      color: var(--primary-color-dark);
    }
  }

  .icon-wrapper {
    margin-right: 12px;
    display: flex;
    align-items: center;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }

  .sidebar-count {
    margin-left: auto;
    background: var(--fully-muted);
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
  }
`;

export const SidebarFooter = styled.div`
  padding: 24px;
  border-top: 1px solid var(--fully-muted);
`;

export const SettingButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: var(--text-default);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: var(--bg-hover);
  }
  
  span {
    margin-right: 12px;
  }
`;

export const MainContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
  background: var(--bg-default);
  padding: 32px;

  @media (max-width: 786px) {
    padding: 16px;
  }
`;

export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--fully-muted);

  h1 {
    font-size: 2rem;
    margin: 0 0 8px 0;
  }
  p {
    margin: 0;
    color: var(--text-muted);
  }
  
  @media (max-width: 786px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const MobileMenuToggle = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: var(--text-default);
  padding: 8px;
  cursor: pointer;
  
  @media (max-width: 786px) {
    display: block;
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 10;
  }
`;

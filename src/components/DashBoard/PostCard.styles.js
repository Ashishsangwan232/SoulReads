import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 16px 0;
`;

export const Card = styled(motion.div)`
  background: var(--gradient-card, var(--bg-card, #ffffff11));
  border-radius: 12px;
  padding: 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--fully-muted, #ffffff22);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px var(--shadow-hover, rgba(0,0,0,0.2));
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const CategoryTag = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 16px;
  text-transform: capitalize;
  letter-spacing: 0.05em;

  /* Basic category colors */
  ${({ $category }) => {
    switch ($category?.toLowerCase()) {
      case 'story': return 'background: rgba(0, 102, 255, 0.2); color: #589bff; border: 1px solid rgba(0, 102, 255, 0.4);';
      case 'journal': return 'background: rgba(1, 134, 20, 0.2); color: #43c367; border: 1px solid rgba(0, 255, 145, 0.4);';
      case 'selfreflection': return 'background: rgba(191, 0, 191, 0.2); color: #ff58bc; border: 1px solid rgba(255, 0, 162, 0.4);';
      default: return 'background: var(--fully-muted); color: var(--text-default);';
    }
  }}
`;

export const DateText = styled.span`
  font-size: 0.8rem;
  color: var(--text-muted);
`;

export const CardTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  line-height: 1.4;
  
  a {
    color: var(--text-default);
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

export const AuthorText = styled.p`
  margin: 0 0 16px 0;
  font-size: 0.85rem;
  color: var(--text-muted);
`;

export const CardExcerpt = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-muted);
  margin-bottom: 24px;
  flex: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  border-top: 1px solid var(--fully-muted);
  padding-top: 16px;
`;

export const LikesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fd6565;
  font-weight: 500;
  
  svg {
    fill: #fd6565;
    filter: drop-shadow(0 0 8px rgba(253, 101, 101, 0.4));
  }
`;

export const ReadMoreLink = styled.span`
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover {
    color: var(--text-default);
  }
`;

export const StatusBadges = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  
  span {
    font-size: 0.7rem;
    padding: 2px 8px;
    border-radius: 4px;
    background: var(--fully-muted);
    color: var(--text-muted);
    text-transform: capitalize;
  }
`;

import React from 'react';
import OptionsMenu from './OptionMenu';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { extractPlainTextFromSlate } from '../../../utils/extractPlainTextFromSlate';
import * as S from './PostCard.styles';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: idx * 0.1,
      ease: 'easeOut',
    },
  }),
};

const BaseCard = ({ card, idx, showStatus = false }) => {
  return (
    <S.Card
      custom={idx}
      initial="hidden"
      animate="visible"
      variants={fadeUpVariant}
    >
      <S.CardHeader>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <S.CategoryTag $category={card.category}>{card.category}</S.CategoryTag>
          <S.DateText>
            {new Date(card.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </S.DateText>
        </div>
        <OptionsMenu postId={card._id} archivestatus={card.archive} status={card.status} />
      </S.CardHeader>

      <S.CardTitle>
        <Link to={`/posts/${card._id}`}>{card.title}</Link>
      </S.CardTitle>
      
      <S.AuthorText>by {card.authorId?.username || 'Anonymous'}</S.AuthorText>

      <S.CardExcerpt>
        <Link to={`/posts/${card._id}`}>
          {extractPlainTextFromSlate(card.content, 120)}
        </Link>
      </S.CardExcerpt>

      {showStatus && (
        <S.StatusBadges>
          {card.archive && <span>Archived</span>}
          {card.status !== 'published' && <span>{card.status}</span>}
          {card.isDeleted && <span>Deleted</span>}
        </S.StatusBadges>
      )}

      <S.CardFooter>
        <S.LikesContainer>
          <Heart size={18} />
          <span>{card.likesCount || 0}</span>
        </S.LikesContainer>
        <Link to={`/posts/${card._id}`} style={{ textDecoration: 'none' }}>
          <S.ReadMoreLink>Read more</S.ReadMoreLink>
        </Link>
      </S.CardFooter>
    </S.Card>
  );
};

const renderCards = (cards, showStatus = false) => {
  if (!cards || cards.length === 0) {
    return <p style={{ color: 'var(--text-muted)' }}>No posts found in this category.</p>;
  }
  return (
    <S.CardsGrid>
      {cards.map((card, idx) => (
        <BaseCard key={card._id || idx} card={card} idx={idx} showStatus={showStatus} />
      ))}
    </S.CardsGrid>
  );
};

export const CardsPublished = ({ cards }) => renderCards(cards, false);
export const CardsDraft = ({ cards }) => renderCards(cards, true);
export const CardsArchived = ({ cards }) => renderCards(cards, true);
export const Cardsdeleted = ({ cards }) => renderCards(cards, true);
export const CardsBookmarked = ({ cards }) => renderCards(cards, false);
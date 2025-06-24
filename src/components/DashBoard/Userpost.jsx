import React from 'react';
import OptionsMenu from './OptionMenu';
import BookmarkButton from '../LikeButton/HeartButton';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { extractPlainTextFromSlate } from '../../../utils/extractPlainTextFromSlate';
const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: idx => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: idx * 0.2,
            ease: 'easeOut',
        },
    }),
};

export const CardsPublished = ({ cards }) => {
    return (
        <div className="card-container">
            {cards.map((card, idx) => (
                <motion.div
                    className="card"
                    key={card._id || idx}
                    custom={idx}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariant}
                >
                    <div className="top_div">
                        <Link to={`/posts/${card._id}`}>
                            <h3>{card.title}</h3>
                        </Link>
                        <OptionsMenu postId={card._id} archivestatus={card.archive} status={card.status} />
                    </div>
                    <div className='namedate-dash'>
                        <h5>
                            {card.authorId.username || 'Anonymous'}
                            •{' '}#{card.category}
                        </h5>
                        <h5>
                            •{' '}{new Date(card.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}{' '}
                        </h5>
                    </div>
                    <Link to={`/posts/${card._id}`}>
                        <div className='dashboard-post-content'>
                            {extractPlainTextFromSlate(card.content)}
                        </div>
                    </Link>
                    <div className="btn_in_card">
                        {card.likesCount} likes <p className="published">{card.status}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};


export const CardsDraft = ({ cards }) => (
    <div className="card-container">
        {cards.length > 0 ? (
            cards.map((card, idx) => (
                <div className="card" key={idx} data-category={card.category}>
                    <div className="top_div">
                        <h3>{card.title}</h3>
                        {/* <OptionsMenu postId={card._id} archivestatus={card.archive} /> */}
                        <OptionsMenu postId={card._id} archivestatus={card.archive} status={card.status} />

                    </div>
                    <h5>
                        {card.authorId.username} • {new Date(card.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric'
                        })} • #{card.category}
                    </h5>
                    <p> {extractPlainTextFromSlate(card.content)}</p>
                    <div className="btn_in_card">
                        <p className='draft'>{card.status}</p>
                    </div>
                </div>
            ))
        ) : (
            <p>No posts found in this category.</p>
        )}
    </div>
);

export const CardsArchived = ({ cards }) => (
    <div className="card-container">
        {cards.length > 0 ? (
            cards.map((card, idx) => (
                <div className="card" key={idx} data-category={card.category}>
                    <div className="top_div">
                        <h3>{card.title}</h3>
                        <OptionsMenu postId={card._id} archivestatus={card.archive} status={card.status} />
                    </div>
                    <h5>
                        {card.authorId.username} • {new Date(card.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric'
                        })} • #{card.category}
                    </h5>
                    <p> {extractPlainTextFromSlate(card.content)}</p>
                    <div className="btn_in_card">
                        {card.likesCount} likes{' '}
                        {card.archive === true && <p>Archived</p>}
                    </div>
                </div>
            ))
        ) : (
            <p>No posts found in this category.</p>
        )}
    </div>
);
export const Cardsdeleted = ({ cards }) => (
    <div className="card-container">
        {cards.length > 0 ? (
            cards.map((card, idx) => (
                <div className="card" key={idx} data-category={card.category}>
                    <div className="top_div">
                        <h3>{card.title}</h3>
                        <OptionsMenu postId={card._id} archivestatus={card.archive} status={card.status} />
                    </div>
                    <h5>
                        {card.authorId.username} • {new Date(card.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric'
                        })} • #{card.category}
                    </h5>
                    <p> {extractPlainTextFromSlate(card.content)}</p>
                    {/* <p>{card.content?.replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '').slice(0, 250)}...</p> */}
                    <div className="btn_in_card">
                        {card.likesCount} likes{' '}
                        <p>{card.status}</p>

                        {card.isDeleted === true && <p>true</p>}
                        {card.isDeleted === false && <p>False</p>}
                    </div>
                </div>
            ))
        ) : (
            <p>No posts found in this category.</p>
        )}
    </div>
);


export const CardsBookmarked = ({ cards }) => (
    <div className="card-container">
        {cards.length > 0 ? (
            cards
                .filter(card => !card.archive) // Show only archived cards
                .map((card, idx) => (
                    <div className="card" key={card._id || idx} data-category={card.category}>
                        <div className="top_div">
                            <h3>{card.title}</h3>
                            <BookmarkButton postId={card._id} />
                        </div>
                        <h5>
                            {card.authorId.username} •{' '}
                            {new Date(card.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}{' '}
                            • #{card.category}
                        </h5>
                        <p>{card.content?.replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '').slice(0, 250)}...</p>
                        {/* <div className="btn_in_card">
              {card.status === 'published' && <p className="published">Published</p>}
              {card.status === 'draft' && <p className="draft">Draft</p>}
              {card.archive && <p className="draft">Archive</p>}
            </div> */}
                    </div>
                ))
        ) : (
            <p>No posts found in this category.</p>
        )}
    </div>
);

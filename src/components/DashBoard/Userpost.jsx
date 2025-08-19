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

export const CardsPublished = ({ cards }) => (
    <div className="card-container">
        {cards.length > 0 ? (
            cards.map((card, idx) => (
                <motion.div className="card"
                    key={card._id || idx}
                    custom={idx}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariant}
                >
                    <div className='card-catergory-time-dots'>
                        <div className='card-category-time'>
                            <h4 className={`category-${card.category}`}>{card.category}</h4>
                            <h5>
                                {' '}{new Date(card.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}{' '}
                            </h5>
                        </div>
                        <div className='card-category-dots'>
                            <OptionsMenu postId={card._id} archivestatus={card.archive} status={card.status} />
                        </div>
                    </div>
                    <div className="card-title">
                        <Link to={`/posts/${card._id}`}>
                            <h3>{card.title}</h3>
                        </Link>
                    </div>
                    <div className='auth-detalis-dash'>
                        <h5>
                            by {card.authorId.username || 'Anonymous'}
                        </h5>
                    </div>

                    <div className='dashboard-post-content'>
                        <Link to={`/posts/${card._id}`}>
                            {extractPlainTextFromSlate(card.content, 120)}
                        </Link>
                    </div>

                    <div className="btn_in_card">
                        <div className='svg-heart'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 22 22" >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                            </svg>
                            <p>{card.likesCount}</p>
                        </div>
                        <Link to={`/posts/${card._id}`}>
                            Read more
                        </Link>
                    </div>
                    {/* <div className='card-published-dash'>
                        <p className="published">{card.status}</p>
                    </div> */}
                </motion.div>
            ))
        ) : (
            <p>No posts yet.</p>
        )}
    </div>
);


export const CardsDraft = ({ cards }) => (
    <div className="card-container">
        {cards.length > 0 ? (
            cards.map((card, idx) => (
                <motion.div className="card"
                    key={card._id || idx}
                    custom={idx}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariant}
                >
                    <div className='card-catergory-time-dots'>
                        <div className='card-category-time'>
                            <h4 className={`category-${card.category}`}>{card.category}</h4>
                            <h5>
                                {' '}{new Date(card.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}{' '}
                            </h5>
                        </div>
                        <div className='card-category-dots'>
                            <OptionsMenu postId={card._id} archivestatus={card.archive} status={card.status} />
                        </div>
                    </div>
                    <div className="card-title">
                        <Link to={`/posts/${card._id}`}>
                            <h3>{card.title}</h3>
                        </Link>
                    </div>
                    <div className='auth-detalis-dash'>
                        <h5>
                            by {card.authorId.username || 'Anonymous'}
                        </h5>
                    </div>

                    <div className='dashboard-post-content'>
                        <Link to={`/posts/${card._id}`}>
                            {extractPlainTextFromSlate(card.content, 120)}
                        </Link>
                    </div>

                    <div className="btn_in_card">
                        <div className='svg-heart'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 22 22" >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                            </svg>
                            <p>{card.likesCount}</p>
                        </div>
                        <Link to={`/posts/${card._id}`}>
                            Read more
                        </Link>
                    </div>
                    {/* <div className='card-published-dash'>
                        <p className="published">{card.status}</p>
                    </div> */}

                    <div className="card-published-dashd">
                        <p className='draft'>{card.status}</p>
                    </div>
                </motion.div>
            ))
        ) : (
            <p>No posts yet.</p>
        )}
    </div>
);

export const CardsArchived = ({ cards }) => (
    <div className="card-container">
        {cards.length > 0 ? (
            cards.map((card, idx) => (
                <motion.div className="card"
                    key={card._id || idx}
                    custom={idx}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariant}
                >
                    <div className='card-catergory-time-dots'>
                        <div className='card-category-time'>
                            <h4 className={`category-${card.category}`}>{card.category}</h4>
                            <h5>
                                {' '}{new Date(card.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}{' '}
                            </h5>
                        </div>
                        <div className='card-category-dots'>
                            <OptionsMenu postId={card._id} archivestatus={card.archive} status={card.status} />
                        </div>
                    </div>
                    <div className="card-title">
                        <Link to={`/posts/${card._id}`}>
                            <h3>{card.title}</h3>
                        </Link>
                    </div>
                    <div className='auth-detalis-dash'>
                        <h5>
                            by {card.authorId.username || 'Anonymous'}
                        </h5>
                    </div>

                    <div className='dashboard-post-content'>
                        <Link to={`/posts/${card._id}`}>
                            {extractPlainTextFromSlate(card.content, 120)}
                        </Link>
                    </div>

                    <div className="btn_in_card">
                        <div className='svg-heart'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 22 22" >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                            </svg>
                            <p>{card.likesCount}</p>
                        </div>
                        <Link to={`/posts/${card._id}`}>
                            Read more
                        </Link>
                    </div>
                    {/* <div className='card-published-dash'>
                        <p className="published">{card.status}</p>
                    </div> */}

                    <div className="card-published-dashd">
                        {/* <p className='draft'>{card.status}</p> */}
                        {card.archive === true && <p>Archived</p>}
                    </div>
                </motion.div>
            ))
        ) : (
            <p>No posts yet.</p>
        )}
    </div>
);

export const Cardsdeleted = ({ cards }) => (
    <div className="card-container">
        {cards.length > 0 ? (
            cards.map((card, idx) => (
                <motion.div className="card"
                    key={card._id || idx}
                    custom={idx}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariant}
                >
                    <div className='card-catergory-time-dots'>
                        <div className='card-category-time'>
                            <h4 className={`category-${card.category}`}>{card.category}</h4>
                            <h5>
                                {' '}{new Date(card.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}{' '}
                            </h5>
                        </div>
                        <div className='card-category-dots'>
                            <OptionsMenu postId={card._id} archivestatus={card.archive} status={card.status} />
                        </div>
                    </div>
                    <div className="card-title">
                        <Link to={`/posts/${card._id}`}>
                            <h3>{card.title}</h3>
                        </Link>
                    </div>
                    <div className='auth-detalis-dash'>
                        <h5>
                            by {card.authorId.username || 'Anonymous'}
                        </h5>
                    </div>

                    <div className='dashboard-post-content'>
                        <Link to={`/posts/${card._id}`}>
                            {extractPlainTextFromSlate(card.content, 120)}
                        </Link>
                    </div>

                    <div className="btn_in_card">
                        <div className='svg-heart'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 22 22" >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                            </svg>
                            <p>{card.likesCount}</p>
                        </div>
                        <Link to={`/posts/${card._id}`}>
                            Read more
                        </Link>
                    </div>

                    <div className="card-published-dashd">
                        {card.archive === true && <p>Archived</p>}
                        <p>{card.status}</p>
                        {card.isDeleted === true && <p>true</p>}
                        {card.isDeleted === false && <p>False</p>}
                    </div>
                </motion.div>
            ))
        ) : (
            <p>No posts yet.</p>
        )}
    </div>
);

export const CardsBookmarked = ({ cards }) => (
    <div className="card-container">
        {cards.length > 0 ? (
            cards.map((card, idx) => (
                <motion.div className="card"
                    key={card._id || idx}
                    custom={idx}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariant}
                >
                    <div className='card-catergory-time-dots'>
                        <div className='card-category-time'>
                            <h4 className={`category-${card.category}`}>{card.category}</h4>
                            <h5>
                                {' '}{new Date(card.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}{' '}
                            </h5>
                        </div>
                    </div>
                    <div className="card-title">
                        <Link to={`/posts/${card._id}`}>
                            <h3>{card.title}</h3>
                        </Link>
                    </div>
                    <div className='auth-detalis-dash'>
                        <h5>
                            by {card.authorId?.username || 'Anonymous'}
                        </h5>
                    </div>

                    <div className='dashboard-post-content'>
                        <Link to={`/posts/${card._id}`}>
                            {extractPlainTextFromSlate(card.content, 120)}
                        </Link>
                    </div>

                    <div className="btn_in_card">
                        <div className='svg-heart'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 22 22" >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                            </svg>
                            <p>{card.likesCount}</p>
                        </div>
                        <Link to={`/posts/${card._id}`}>
                            Read more
                        </Link>
                    </div>
                </motion.div>
            ))
        ) : (
            <p>No posts yet.</p>
        )}
    </div>

);
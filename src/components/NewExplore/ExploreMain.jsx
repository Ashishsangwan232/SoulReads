import React from 'react'
import Explorepage from './Explorepage'
import './ExploreMain.css'
const ExploreMain = () => {
    return (
        <>
            <main className='ExploreMain-container'>
                <div className='circle1'></div>
                <div className='circle2'></div>
                <Explorepage />
            </main>
        </>
    );
};
export default ExploreMain;
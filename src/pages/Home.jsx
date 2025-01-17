import React from 'react';
import Banner from '../components/Banner';
import Sponsors from '../components/Sponsors';
import PopularClass from '../components/PopularClass';
import Reviews from '../components/Reviews';

const Home = () => {
    return (
        <div>
        <Banner></Banner>
        <Sponsors></Sponsors>
        <PopularClass></PopularClass>
        <Reviews></Reviews>
        
        </div>
    );
};

export default Home;
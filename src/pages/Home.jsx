import React from 'react';
import Banner from '../components/Banner';
import Sponsors from '../components/Sponsors';
import PopularClass from '../components/PopularClass';
import Reviews from '../components/Reviews';
import StatsCard from '../components/StatsCard';
import useAuth from '../hooks/useAuth';
import BecomeTeacher from '../components/BecomeTeacher';

const Home = () => {
    const {user} = useAuth()
    return (
        <div>
        <Banner></Banner>
        <Sponsors></Sponsors>
        <PopularClass></PopularClass>
        <Reviews></Reviews>
        <StatsCard></StatsCard>
        <BecomeTeacher></BecomeTeacher>
        
        </div>
    );
};

export default Home;
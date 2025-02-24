import React from 'react';
import Banner from '../components/Banner';
import Sponsors from '../components/Sponsors';
import PopularClass from '../components/PopularClass';
import Reviews from '../components/Reviews';
import StatsCard from '../components/StatsCard';
import useAuth from '../hooks/useAuth';
import BecomeTeacher from '../components/BecomeTeacher';
import Faq from '../components/Faq';
import TimeManagement from '../components/TimeManagement';

const Home = () => {
    const {user} = useAuth()
    return (
        <div>
        <Banner></Banner>
        <PopularClass></PopularClass>
        <Sponsors></Sponsors>
        <Reviews></Reviews>
        <StatsCard></StatsCard>
        <BecomeTeacher></BecomeTeacher>
        
        <TimeManagement></TimeManagement>
        <Faq></Faq>
        
        </div>
    );
};

export default Home;
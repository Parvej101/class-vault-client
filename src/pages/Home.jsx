import React from 'react';
import Banner from '../components/Banner';
import Sponsors from '../components/Sponsors';
import PopularClass from '../components/PopularClass';
import Reviews from '../components/Reviews';
import StatsCard from '../components/StatsCard';
import useAuth from '../hooks/useAuth';
import Loading from '../shared/Loading';

const Home = () => {
    const { user } = useAuth()
    return (
        <div>
            {
                !user ? (<Loading></Loading>) : (
                    <div>
                        <Banner></Banner>
                        <Sponsors></Sponsors>
                        <PopularClass></PopularClass>
                        <Reviews></Reviews>
                        <StatsCard></StatsCard>
                    </div >
                )
            }

        </div >
    );
};

export default Home;
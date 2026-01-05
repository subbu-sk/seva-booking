import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroCarousel from '../components/home/HeroCarousel';
import SearchBar from '../components/home/SearchBar';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    return (
        <div className="pb-20 bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="px-4 mb-16 pt-6">
                <HeroCarousel />
                <div className="-mt-8 relative z-10">
                    <SearchBar />
                </div>
            </section>

            {/* Featured Section */}
            <section className="container mx-auto px-4 max-w-7xl">
                <div className="mb-10 text-center">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                        {t('home.featured_title')}
                    </h3>
                    <p className="text-gray-500 opacity-60 text-sm font-medium uppercase tracking-wide">
                        {t('home.featured_temple')}
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <h4 className="text-3xl font-bold text-gray-900 mb-4 font-serif">
                            {t('home.grace_title')}
                        </h4>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {t('home.grace_desc')}
                        </p>
                        <button
                            onClick={() => navigate('/sevas')}
                            className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 group"
                        >
                            {t('home.explore_btn')}
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="space-y-4 pt-8">
                            <img src="/images/Home-1.jpeg" alt="Temple" className="rounded-2xl h-48 w-full object-cover shadow-md" />
                            <img src="/images/Home-2.jpeg" alt="Devotion" className="rounded-2xl h-40 w-full object-cover shadow-md" />
                        </div>
                        <div className="space-y-4">
                            <img src="/images/Home-3.jpeg" alt="Rituals" className="rounded-2xl h-40 w-full object-cover shadow-md" />
                            <img src="/images/Home-4.jpeg" alt="Grace" className="rounded-2xl h-48 w-full object-cover shadow-md" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

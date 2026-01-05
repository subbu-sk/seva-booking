import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/sevas', { state: { search: searchTerm } });
    };

    return (
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="bg-white p-2 md:p-4 rounded-3xl shadow-2xl border border-orange-100 flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 flex items-center px-4 w-full">
                    <Search className="text-orange-600 w-6 h-6 mr-3" />
                    <input
                        type="text"
                        placeholder={t('home.search_placeholder')}
                        className="w-full py-3 outline-none text-gray-700 font-medium placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full md:w-auto px-10 py-4 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 active:scale-95"
                >
                    {t('home.find_btn')}
                </button>
            </div>
        </form>
    );
};

export default SearchBar;

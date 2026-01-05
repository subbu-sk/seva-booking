import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Users, Check, Info } from 'lucide-react';

const PricingWidget = ({ basePrice, bookingType, setBookingType, count, setCount, total, setTotal }) => {
    const { t } = useTranslation();
    const FAMILY_MULTIPLIER = 4; // Flat rate equivalent to 4 people roughly, but allows up to 6

    useEffect(() => {
        if (bookingType === 'individual') {
            setTotal(basePrice * count);
        } else {
            setTotal(basePrice * FAMILY_MULTIPLIER);
        }
    }, [basePrice, bookingType, count, setTotal]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">{t('pricing.title')}</h3>

            {/* Type Selection */}
            <div className="flex flex-col space-y-3 mb-6">
                <button
                    onClick={() => setBookingType('individual')}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all ${bookingType === 'individual'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-200'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className={`p-2 rounded-lg ${bookingType === 'individual' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                                <User className="w-5 h-5" />
                            </div>
                            <div className="ml-3">
                                <p className={`font-bold ${bookingType === 'individual' ? 'text-gray-900' : 'text-gray-600'}`}>{t('pricing.individual')}</p>
                                <p className="text-xs text-gray-500">For single devotee</p>
                            </div>
                        </div>
                        {bookingType === 'individual' && <Check className="w-5 h-5 text-orange-600" />}
                    </div>
                </button>

                <button
                    onClick={() => setBookingType('family')}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all ${bookingType === 'family'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-200'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className={`p-2 rounded-lg ${bookingType === 'family' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>
                                <Users className="w-5 h-5" />
                            </div>
                            <div className="ml-3">
                                <p className={`font-bold ${bookingType === 'family' ? 'text-gray-900' : 'text-gray-600'}`}>{t('pricing.family')}</p>
                                <p className="text-xs text-gray-500">Up to 6 members • Best Value</p>
                            </div>
                        </div>
                        {bookingType === 'family' && <Check className="w-5 h-5 text-orange-600" />}
                    </div>
                    {/* Badge */}
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        SAVE 33%
                    </span>
                </button>
            </div>

            {/* Dynamic Content */}
            <div className="mb-6">
                {bookingType === 'individual' ? (
                    <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center border border-gray-100">
                        <span className="text-gray-700 font-medium text-sm">{t('pricing.count')}</span>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setCount(Math.max(1, count - 1))}
                                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                            >
                                -
                            </button>
                            <span className="text-lg font-bold w-6 text-center">{count}</span>
                            <button
                                onClick={() => setCount(Math.min(10, count + 1))}
                                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-blue-50 p-4 rounded-xl flex items-start border border-blue-100">
                        <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-700">
                            <p className="font-semibold mb-1">Includes entire family</p>
                            <p className="opacity-90">Perform sankalpa for parents, spouse, and children (max 6) at a discounted rate.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Total Display */}
            <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between items-end">
                <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">{t('seva_details.total_amount')}</p>
                    <p className="text-3xl font-bold text-gray-900">₹{total}</p>
                </div>
                <div className="text-right">
                    {bookingType === 'individual' && (
                        <p className="text-xs text-gray-500">₹{basePrice} x {count}</p>
                    )}
                    {bookingType === 'family' && (
                        <p className="text-xs text-green-600 font-bold">Flat Rate Applied</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PricingWidget;

import React from 'react';
import { X, Calendar, MapPin, CheckCircle, ExternalLink, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'react-hot-toast';

const BookingLookupModal = ({ isOpen, onClose, bookings, phone }) => {
    if (!isOpen) return null;

    const generatePDF = (booking) => {
        try {
            const doc = new jsPDF();

            // Header
            doc.setFillColor(234, 88, 12);
            doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.setFont("helvetica", "bold");
            doc.text("Temple Seva Booking", 105, 20, null, null, "center");
            doc.setFontSize(12);
            doc.text("Official Receipt", 105, 30, null, null, "center");

            // Info
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(14);
            doc.text(booking.seva?.templeNameEn || 'Temple', 15, 55);

            const tableBody = [
                ['Reference', `#${booking._id.slice(-6).toUpperCase()}`],
                ['Seva', booking.seva?.titleEn || 'Seva'],
                ['Devotee', booking.devoteeName || 'N/A'],
                ['Date', new Date(booking.bookingDate).toLocaleDateString()],
                ['Amount', `INR ${booking.totalAmount}`],
                ['Status', booking.status]
            ];

            autoTable(doc, {
                startY: 70,
                head: [['Field', 'Details']],
                body: tableBody,
                theme: 'grid',
                headStyles: { fillColor: [234, 88, 12] }
            });

            doc.save(`Receipt_${booking._id.slice(-6)}.pdf`);
            toast.success("Receipt Downloaded");
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate receipt");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-gray-50 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-white/20 flex flex-col animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-orange-50 to-white">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Your Bookings</h2>
                        <p className="text-sm text-gray-500 font-medium">Found {bookings.length} records for {phone}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-orange-600 hover:rotate-90 transition-all shadow-sm border border-gray-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    {bookings.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                            <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-10 h-10 opacity-40" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">No Bookings Found</h3>
                            <p className="text-gray-500 max-w-xs mx-auto mt-2 font-medium">We couldn't find any seva bookings associated with this mobile number.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {bookings.map((booking) => (
                                <div key={booking._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-100 transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500 opacity-50"></div>

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {booking.status}
                                            </div>
                                            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-tighter">#{booking._id.slice(-6).toUpperCase()}</span>
                                        </div>

                                        <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                                            {booking.seva?.titleEn || 'Seva'}
                                        </h4>
                                        <p className="text-xs text-gray-500 mb-4 flex items-center">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            {booking.seva?.templeNameEn || 'Temple Name'}
                                        </p>

                                        <div className="space-y-2 border-t border-gray-50 pt-4 mb-6">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-gray-400 font-medium">Devotee</span>
                                                <span className="font-bold text-gray-700">{booking.devoteeName}</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-gray-400 font-medium">Gothram</span>
                                                <span className="font-bold text-gray-700">{booking.gothram || 'N/A'}</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-gray-400 font-medium">Rashi / Nakshatra</span>
                                                <span className="font-bold text-gray-700">{booking.rashi || '-'} / {booking.nakshatra || '-'}</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-gray-400 font-medium">Date</span>
                                                <span className="font-bold text-gray-700">{new Date(booking.bookingDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between text-xs items-center">
                                                <span className="text-gray-400 font-medium">Amount</span>
                                                <span className="text-lg font-black text-orange-600">₹{booking.totalAmount}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => {
                                                    sessionStorage.setItem('prefill_booking', JSON.stringify({
                                                        name: booking.devoteeName,
                                                        gothram: booking.gothram,
                                                        rashi: booking.rashi,
                                                        nakshatra: booking.nakshatra,
                                                        guestName: booking.guestName,
                                                        guestEmail: booking.guestEmail,
                                                        guestPhone: phone
                                                    }));
                                                    onClose();
                                                    // Redirect directly to the specific seva page
                                                    const sevaId = booking.seva?._id || booking.seva;
                                                    window.location.href = `/sevas/${sevaId}`;
                                                }}
                                                className="w-full py-3 bg-gray-900 text-white rounded-xl text-xs font-bold flex items-center justify-center hover:bg-orange-600 transition-all shadow-md group-hover:shadow-orange-100"
                                            >
                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                Book Again with these details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-white border-t border-gray-100 text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">May the blessings of the almighty be with you</p>
                </div>
            </div>
        </div>
    );
};

export default BookingLookupModal;

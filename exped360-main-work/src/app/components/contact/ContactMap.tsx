import React from 'react';
import { companyInfo } from '../../../data/data/mockCompany';

export const ContactMap = () => {
  return (
    <div className="h-[400px] w-full relative">
      <iframe
        src="https://www.google.com/maps?q=Oran,+Algeria&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      />
      {/* Link overlay */}
      <div className="absolute bottom-4 right-4">
        <a 
          href="https://maps.app.goo.gl/1S7e6LNksInrCFzCe" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-lg flex items-center gap-2"
        >
          <i className="fas fa-map-marker-alt"></i>
          <span>Ouvrir sur Google Maps</span>
        </a>
      </div>
    </div>
  );
};

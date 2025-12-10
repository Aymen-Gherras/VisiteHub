'use client';

import React, { useState } from 'react';

// Function to get appropriate icon for each amenity
const getAmenityIcon = (amenity: string): string => {
  const iconMap: Record<string, string> = {
    // Education
    'École Maternelle': '🏫',
    'École Primaire': '🏫',
    'Collège': '🏫',
    'Lycée': '🏫',
    'Université': '🎓',
    'Espace de loisir': '🎨',
    
    // Medical
    'Hôpital': '🏥',
    'Pharmacie': '💊',
    'Clinique': '🏥',
    'Laboratoire': '🔬',
    
    // Leisure
    'Parc': '🌳',
    'Salle de sport': '💪',
    'Bibliothèque': '📚',
    'Théâtre': '🎭',
    'Terrains': '⚽',
    'Centre commercial': '🛍️',
    
    // Transport
    'Bus': '🚌',
    'Tramway': '🚊',
    'Métro': '🚇',
    'Train': '🚄',
    
    // Internal
    'Parking': '🅿️',
    'Garage individuel': '🚗',
    'Parking collectif': '🅿️',
    'Jardin': '🌺',
    'Piscine': '🏊',
    'Espace loisir': '🎮',
    'Sécurité': '🔒',
    'Caméra': '📹',
  };
  
  return iconMap[amenity] || '✅';
};

type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  bedrooms: number;
  etage?: number;
  bathrooms?: number;
  surface: number;
  type: 'apartment' | 'house' | 'villa' | 'commercial' | 'land';
  features: string[];
  papers?: string[];
  serviceTier: 'basic' | 'premium_360';
  has360Tour: boolean;
};

type PropertyDetailsProps = {
  property: Property;
};

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const [showAll, setShowAll] = useState(false);

  const maxVisible = 10;
  const features = property.features || [];
  const visibleFeatures = showAll ? features : features.slice(0, maxVisible);
  const hasMore = features.length > maxVisible;

  // Helpers
  const typeLabelMap: Record<Property['type'], string> = {
    apartment: 'Appartement',
    house: 'Maison',
    villa: 'Villa',
    commercial: 'Commercial',
    land: 'Terrain',
  };

  const formatPrice = (value: number | undefined) => {
    if (typeof value !== 'number') return '—';
    try {
      return `${value.toLocaleString('fr-FR')} DA`;
    } catch {
      return `${value} DA`;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">

      <div className="mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Description</h2>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base whitespace-pre-wrap break-words">{property.description}</p>
      </div>

      {features.length > 0 && (
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Caractéristiques</h2>
          <div id="features-list" className="flex flex-wrap gap-2 sm:gap-3">
            {visibleFeatures.map((feature, index) => {
              const icon = getAmenityIcon(feature);
              return (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 sm:gap-3 px-2.5 py-2 sm:px-3 sm:py-2 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200 hover:bg-white hover:shadow-sm transition-all w-auto max-w-full"
                >
                  <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-md sm:rounded-lg bg-blue-50 text-blue-600 text-sm sm:text-base shrink-0">
                    {icon}
                  </div>
                  <span className="text-gray-700 font-medium text-xs sm:text-sm truncate" title={feature}>{feature}</span>
                </div>
              );
            })}
          </div>

          {hasMore && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
                aria-controls="features-list"
                className="px-3 py-2 sm:px-4 rounded-lg text-sm font-medium bg-slate-800 text-white hover:bg-slate-700 transition-colors"
              >
                {showAll ? "Voir moins" : `Voir plus (${features.length - maxVisible} autres)`}
              </button>
            </div>
          )}
        </div>
      )}

      {Array.isArray(property.papers) && property.papers.length > 0 && (
        <div className="mt-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Papiers</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {property.papers.map((paper, idx) => (
              <div key={idx} className="inline-flex items-center gap-2 sm:gap-3 px-2.5 py-2 sm:px-3 sm:py-2 bg-gray-50 rounded-lg border border-gray-200 w-auto max-w-full">
                <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-md bg-green-50 text-green-600 shrink-0">📄</div>
                <span className="text-gray-700 text-xs sm:text-sm font-medium truncate" title={paper}>{paper}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
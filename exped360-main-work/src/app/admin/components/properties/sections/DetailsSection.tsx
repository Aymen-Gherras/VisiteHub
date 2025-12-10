'use client';

import { useState, useEffect } from 'react';
import { Property, Paper, apiService } from '../../../../../api';

interface DetailsSectionProps {
  propertyData: Partial<Property>;
  setPropertyData: (data: Partial<Property>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const availableFeatures = [
  { id: 'balcony', label: 'Balcon', icon: '🌿' },
  { id: 'terrace', label: 'Terrasse', icon: '🏞️' },
  { id: 'garage', label: 'Garage', icon: '🚗' },
  { id: 'parking', label: 'Parking', icon: '🅿️' },
  { id: 'elevator', label: 'Ascenseur', icon: '🛗' },
  { id: 'security', label: 'Sécurité', icon: '🔒' },
  { id: 'air-conditioning', label: 'Climatisation', icon: '❄️' },
  { id: 'heating', label: 'Chauffage', icon: '🔥' },
  { id: 'furnished', label: 'Meublé', icon: '🪑' },
  { id: 'renovated', label: 'Rénové', icon: '🔨' },
  { id: 'new', label: 'Neuf', icon: '🆕' },
  { id: 'garden', label: 'Jardin', icon: '🌺' }
];

export default function DetailsSection({ propertyData, setPropertyData, onNext, onPrevious }: DetailsSectionProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(propertyData.amenities || []);
  const [selectedPapers, setSelectedPapers] = useState<string[]>(propertyData.papers || []);
  const [availablePapers, setAvailablePapers] = useState<Paper[]>([]);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const papersData = await apiService.getPapers();
        setAvailablePapers(papersData);
      } catch (error) {
        console.error('Failed to fetch papers:', error);
        // Fallback to default papers if API fails
        setAvailablePapers([
          { id: '1', name: 'Décision', createdAt: '', updatedAt: '' },
          { id: '2', name: 'Promotion immobilière', createdAt: '', updatedAt: '' },
          { id: '3', name: 'Acte notarié', createdAt: '', updatedAt: '' },
          { id: '4', name: 'Acte dans l\'indivision', createdAt: '', updatedAt: '' },
          { id: '5', name: 'Papier timbré', createdAt: '', updatedAt: '' },
          { id: '6', name: 'Livret foncier', createdAt: '', updatedAt: '' },
          { id: '7', name: 'Permis de construire', createdAt: '', updatedAt: '' }
        ]);
      }
    };

    fetchPapers();
  }, []);

  const handleFeatureToggle = (featureId: string) => {
    const newFeatures = selectedFeatures.includes(featureId)
      ? selectedFeatures.filter(id => id !== featureId)
      : [...selectedFeatures, featureId];
    
    setSelectedFeatures(newFeatures);
    setPropertyData({ ...propertyData, amenities: newFeatures });
  };

  const handleBedroomsChange = (bedrooms: number) => {
    setPropertyData({ ...propertyData, bedrooms });
  };

  const handleEtageChange = (etage: number | undefined) => {
    setPropertyData({ ...propertyData, etage });
  };

  const handleDescriptionChange = (description: string) => {
    setPropertyData({ ...propertyData, description });
  };

  const handlePhoneNumberChange = (phoneNumber: string) => {
    setPropertyData({ ...propertyData, phoneNumber });
  };

  const togglePaper = (paper: string) => {
    const newPapers = selectedPapers.includes(paper)
      ? selectedPapers.filter(p => p !== paper)
      : [...selectedPapers, paper];
    setSelectedPapers(newPapers);
    setPropertyData({ ...propertyData, papers: newPapers });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Détails de la Propriété</h2>
        <p className="text-gray-600">Ajoutez les détails spécifiques de votre propriété</p>
      </div>

{/* Counters row */}
<div className="w-full flex flex-col md:flex-row items-start gap-6">
  {/* Chambres (left) */}
  <div className="space-y-4">
    <label className="block text-sm font-medium text-gray-700">Nombre de Chambres</label>
    <div className="flex items-center gap-4">
      <button
        onClick={() => handleBedroomsChange(Math.max(0, (propertyData.bedrooms || 0) - 1))}
        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <span className="text-2xl font-bold text-gray-900 w-12 text-center tabular-nums">
        {propertyData.bedrooms || 0}
      </span>
      <button
        onClick={() => handleBedroomsChange((propertyData.bedrooms || 0) + 1)}
        className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  </div>

  {/* Étage (right) */}
  <div className="space-y-4 md:ml-auto">
    <label className="block text-sm font-medium text-gray-700">Étage</label>
    <div className="flex items-center gap-4">
      <button
        onClick={() => {
          const current = typeof propertyData.etage === 'number' ? propertyData.etage : 0;
          handleEtageChange(Math.max(0, current - 1));
        }}
        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <span className="text-2xl font-bold text-gray-900 w-12 text-center tabular-nums">
        {typeof propertyData.etage === 'number' ? propertyData.etage : 0}
      </span>
      <button
        onClick={() => {
          const current = typeof propertyData.etage === 'number' ? propertyData.etage : 0;
          handleEtageChange(Math.min(100, current + 1));
        }}
        className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  </div>
</div>


      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Description Détaillée</label>
        <textarea
          value={propertyData.description || ''}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          rows={6}
          placeholder="Décrivez votre propriété en détail..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Numéro de Téléphone du Propriétaire</label>
        <input
          type="tel"
          value={propertyData.phoneNumber || ''}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          placeholder="+213 XX XX XX XX"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-500">Ce numéro sera affiché sur la page de la propriété pour les contacts</p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Caractéristiques</label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {availableFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleFeatureToggle(feature.id)}
              className={`
                flex items-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200
                ${selectedFeatures.includes(feature.id)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <span className="text-lg">{feature.icon}</span>
              <span className="text-sm font-medium">{feature.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Papiers</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3">
          {availablePapers.map((paper) => (
            <label key={paper.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPapers.includes(paper.name)}
                onChange={() => togglePaper(paper.name)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-800">{paper.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          onClick={onPrevious}
          className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Précédent
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}

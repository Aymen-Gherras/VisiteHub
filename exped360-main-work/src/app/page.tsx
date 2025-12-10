'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeroSection } from './components/home/HeroSection';
import { PropertySearch } from './components/home/PropertySearch';
import { Testimonials } from './components/home/Testimonials';
import { Contact } from './components/home/Contact';
import { apiService, Property } from '../api';
import { FeaturedProperties } from './components/properties/FeaturedProperties';
import { AdvancedFilterBar } from './components/ui/AdvancedFilterBar';


interface FilterState {
  searchQuery: string;
  transactionType: 'tous' | 'vendre' | 'location';
  selectedWilaya: string;
  selectedDaira?: string;
  selectedPropertyType: string;
  selectedPaymentConditions: string[];
  selectedSpecifications: string[];
  selectedPapers: string[];
}

export default function HomePage() {
  const [featured, setFeatured] = useState<Property[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    transactionType: 'tous',
    selectedWilaya: '',
    selectedDaira: '',
    selectedPropertyType: '',
    selectedPaymentConditions: [],
    selectedSpecifications: [],
    selectedPapers: []
  });

  useEffect(() => {
    apiService.getFeaturedProperties().then(setFeatured).catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <HeroSection />
      
      {/* 2. Property Search Filter Bar with Title */}
      <section className="py-12 bg-gray-50 mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Trouvez maintenant la propriété de vos rêves en Algérie</h2>
            <p className="text-gray-600">Trouvez des propriétés dans 58 Wilaya différents représentés par 200 courtiers membres de premier plan.</p>
          </div>
          <AdvancedFilterBar
            filters={filters}
            onFiltersChange={setFilters}
            className="shadow-xl"
          />
        </div>
      </section>

      {/* 3. Featured Properties */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {featured && featured.length > 0 ? (
            <FeaturedProperties properties={featured} />
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Chargement des propriétés...</p>
            </div>
          )}
          
          {/* "Voir plus de biens" button */}
          <div className="text-center mt-12">
            <Link
              href="/properties"
              className="bg-slate-800 text-white px-8 py-3 rounded-xl hover:bg-slate-700 transition-colors inline-block"
            >
              Voir plus de biens
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Everything else */}
      <Testimonials />
      <Contact />
    </main>
  );
}

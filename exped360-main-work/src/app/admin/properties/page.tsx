'use client';

import { useState, useEffect } from 'react';
import { Property } from '../../../api';
import { PropertyTable, PropertyFilters } from '../components';
import { apiService } from '../../../api';
import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';

export default function AdminProperties() {
  const { token } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProperties({ limit: 20 });
      setProperties(data.properties);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch properties');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.daira.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = async (id: string) => {
    if (!token) {
      alert('Authentication required. Please log in.');
      return;
    }

    if (confirm('Are you sure you want to delete this property?')) {
      try {
        await apiService.deleteProperty(id, token);
        setProperties(properties.filter(p => p.id !== id));
      } catch (err) {
        console.error('Error deleting property:', err);
        alert('Failed to delete property');
      }
    }
  };

  const handleToggleFeatured = async (id: string) => {
    if (!token) {
      alert('Authentication required. Please log in.');
      return;
    }
    try {
      const updated = await apiService.toggleFeaturedProperty(id, token);
      setProperties(prev => prev.map(p => (p.id === id ? { ...p, isFeatured: updated.isFeatured } : p)));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to toggle featured');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600">Manage your property listings</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/admin/properties/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New Property
          </Link>
        </div>
      </div>

      {/* Filters */}
      <PropertyFilters
        searchTerm={searchTerm}
        filterType={filterType}
        filteredCount={filteredProperties.length}
        onSearchChange={setSearchTerm}
        onTypeChange={setFilterType}
      />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading properties</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Properties Table */}
      {!loading && !error && (
        <PropertyTable
          properties={filteredProperties}
          onEdit={(property) => {
            // Navigate to edit page
            window.location.href = `/admin/properties/edit/${property.id}`;
          }}
          onDelete={handleDelete}
          onToggleFeatured={handleToggleFeatured}
        />
      )}
    </div>
  );
} 
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Grid3X3, List, LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PropertyCard from '@/components/property/PropertyCard';
import PropertyFilters from '@/components/property/PropertyFilters';
import SearchBar from '@/components/property/SearchBar';
import { PropertyCardSkeleton } from '@/components/ui/Skeleton';
import { SAMPLE_PROPERTIES } from '@/data/sampleData';

export default function PropertiesPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    city:       searchParams.get('city') || '',
    type:       searchParams.get('type') || '',
    bhk:        searchParams.get('bhk')  || '',
    furnishing: '',
    rera:       false,
    budget:     '',
  });

  const loadProperties = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      let results = [...SAMPLE_PROPERTIES];
      const q = searchParams.get('q')?.toLowerCase();
      if (q)              results = results.filter(p => p.title.toLowerCase().includes(q) || p.city.toLowerCase().includes(q));
      if (filters.city)   results = results.filter(p => p.city === filters.city);
      if (filters.type)   results = results.filter(p => p.propertyType === filters.type);
      if (filters.bhk)    results = results.filter(p => String(p.bhk) === filters.bhk);
      if (filters.furnishing) results = results.filter(p => p.furnishing === filters.furnishing);
      if (filters.rera)   results = results.filter(p => p.reraApproved);
      if (filters.budget) {
        const [min, max] = filters.budget.split('-').map(Number);
        results = results.filter(p => p.price >= min && p.price <= max);
      }
      if (sortBy === 'price_asc')  results.sort((a, b) => a.price - b.price);
      if (sortBy === 'price_desc') results.sort((a, b) => b.price - a.price);
      if (sortBy === 'newest')     results.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

      setProperties(results);
      setLoading(false);
    }, 600);
  }, [filters, sortBy, searchParams]);

  useEffect(() => { loadProperties(); }, [loadProperties]);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-4">
            {t('nav.properties')}
          </h1>
          <SearchBar />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            <PropertyFilters filters={filters} onChange={setFilters} />
            {!loading && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">{properties.length}</span> properties found
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="relevance">Most Relevant</option>
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              {[['grid', Grid3X3], ['list', List]].map(([v, Icon]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`p-2.5 transition-colors ${view === v ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
          </div>
        ) : properties.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="text-6xl mb-4">🏡</div>
            <h3 className="font-display font-bold text-xl text-gray-700 dark:text-gray-300 mb-2">{t('common.no_results')}</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters</p>
          </motion.div>
        ) : (
          <div className={`grid gap-6 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-2xl'}`}>
            {properties.map((p, i) => <PropertyCard key={p._id} property={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles, TrendingUp, Star, ChevronRight } from 'lucide-react';
import HeroSection from '@/components/layout/HeroSection';
import PropertyCard from '@/components/property/PropertyCard';
import { PropertyCardSkeleton } from '@/components/ui/Skeleton';
import { SAMPLE_PROPERTIES, CITIES_DATA } from '@/data/sampleData';

function SectionTitle({ badge, title, subtitle }) {
  return (
    <div className="text-center mb-10">
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-semibold mb-3">
          {badge}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-3">{title}</h2>
      {subtitle && <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}

function CityCard({ city, img, count, index }) {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/properties?city=${city}`)}
      className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
    >
      <img src={img} alt={city} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-4 left-4 text-left">
        <p className="text-white font-display font-bold text-xl">{city}</p>
        <p className="text-white/70 text-sm">{count.toLocaleString()} properties</p>
      </div>
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={16} className="text-white" />
      </div>
    </motion.button>
  );
}

function WhyUsCard({ icon, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card p-6 text-center group hover:-translate-y-1 transition-transform"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30 flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function HomePage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFeatured(SAMPLE_PROPERTIES.slice(0, 6));
      setLoading(false);
    }, 800);
  }, []);

  const WHY_US = [
    { icon: '🤖', title: 'AI-Powered Recommendations', desc: 'Our AI learns your preferences and shows you properties you\'ll love.' },
    { icon: '✅', title: 'RERA Verified Listings', desc: 'All properties are verified for RERA compliance and legal safety.' },
    { icon: '🔍', title: 'Smart Filters', desc: 'Filter by BHK, budget, city, furnishing, amenities and much more.' },
    { icon: '💬', title: 'Direct Seller Connect', desc: 'Contact sellers directly — no middlemen, no hidden charges.' },
    { icon: '📱', title: 'Mobile First Design', desc: 'Seamless experience on any device, anytime, anywhere.' },
    { icon: '🇮🇳', title: 'Multilingual Support', desc: 'Available in English, Hindi and Gujarati for maximum accessibility.' },
  ];

  return (
    <div>
      {/* Hero */}
      <HeroSection />

      {/* Featured Properties */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-semibold mb-3">
              <Star size={11} className="fill-yellow-500 text-yellow-500" /> Featured
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">Featured Properties</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Hand-picked premium listings across India</p>
          </div>
          <Link to="/properties" className="hidden sm:flex items-center gap-2 text-blue-700 dark:text-blue-400 font-semibold hover:gap-3 transition-all">
            {t('common.view_all')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)
            : featured.map((p, i) => <PropertyCard key={p._id} property={p} index={i} />)
          }
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link to="/properties" className="btn-primary inline-flex items-center gap-2">
            {t('common.view_all')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Cities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionTitle
          badge="📍 Top Locations"
          title="Explore by City"
          subtitle="Properties in India's most sought-after real estate markets"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CITIES_DATA.map((c, i) => <CityCard key={c.name} {...c} index={i} />)}
        </div>
      </section>

      {/* AI Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-teal-700 p-10 sm:p-14 text-center text-white"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 3px 3px, rgba(255,255,255,0.5) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-teal-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-sm font-medium mb-6">
                <Sparkles size={14} /> Powered by Artificial Intelligence
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl mb-4">
                Let AI Find Your<br />Perfect Home
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
                Tell us your preferences — budget, city, BHK — and our AI will curate the best matching properties just for you.
              </p>
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-blue-800 font-bold hover:shadow-2xl hover:scale-105 transition-all"
              >
                <TrendingUp size={18} /> Try AI Search
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why ApnaGhar */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionTitle
          badge="⭐ Why Us"
          title="Why Choose ApnaGhar?"
          subtitle="We're not just a listing platform — we're your trusted property partner"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_US.map((item, i) => <WhyUsCard key={item.title} {...item} index={i} />)}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
              Ready to List Your Property?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
              Join 5,000+ sellers who trust ApnaGhar to find the right buyers faster.
            </p>
            <Link
              to="/register?role=seller"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-700 to-teal-600 text-white font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              List Your Property Free <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Heart, Eye, TrendingUp, Plus, User, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { SAMPLE_PROPERTIES } from '@/data/sampleData';

function StatCard({ icon: Icon, label, value, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card p-6"
    >
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
        <Icon size={22} className="text-white" />
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { wishlist } = useWishlist();
  const myListings = SAMPLE_PROPERTIES.slice(0, 2);

  if (!user) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 mb-4">Please log in to view your dashboard</p>
        <Link to="/login" className="btn-primary">Login</Link>
      </div>
    </div>
  );

  const stats = user.role === 'seller'
    ? [
        { icon: Building2, label: 'My Listings',  value: '3',   color: 'bg-blue-600' },
        { icon: Eye,       label: 'Total Views',   value: '412', color: 'bg-purple-600' },
        { icon: TrendingUp,label: 'Enquiries',     value: '18',  color: 'bg-teal-600' },
        { icon: Heart,     label: 'Saved by Users',value: '24',  color: 'bg-red-500' },
      ]
    : [
        { icon: Heart,     label: 'Wishlist',      value: wishlist.length.toString(), color: 'bg-red-500' },
        { icon: Eye,       label: 'Properties Viewed', value: '37', color: 'bg-blue-600' },
        { icon: Building2, label: 'Enquiries Sent',value: '5',   color: 'bg-teal-600' },
        { icon: TrendingUp,label: 'Saved Searches', value: '3',  color: 'bg-purple-600' },
      ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">{user.name?.[0]?.toUpperCase()}</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Welcome, {user.name}! 👋</h1>
              <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold mt-1 ${
                user.role === 'seller' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400'
              }`}>
                {user.role === 'seller' ? '🏢 Seller' : '🏠 Buyer'}
              </span>
            </div>
          </div>
          {user.role === 'seller' && (
            <Link to="/list-property" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-teal-600 text-white font-semibold hover:shadow-md hover:scale-105 transition-all">
              <Plus size={16} /> List New Property
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)}
        </div>

        {/* Recent */}
        <div className="grid lg:grid-cols-2 gap-6">
          {user.role === 'seller' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-lg text-gray-900 dark:text-white">My Listings</h2>
                <Link to="/properties" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  View all <ChevronRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {myListings.map(p => (
                  <Link to={`/properties/${p._id}`} key={p._id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <img src={p.images?.[0]} alt={p.title} className="w-14 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">{p.title}</p>
                      <p className="text-xs text-gray-500">{p.city} • {p.propertyType}</p>
                    </div>
                    <span className="text-sm font-bold text-blue-700 dark:text-blue-400 flex-shrink-0">
                      ₹{(p.price / 100000).toFixed(0)}L
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Wishlist preview */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg text-gray-900 dark:text-white">Saved Properties</h2>
              <Link to="/wishlist" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                View all <ChevronRight size={14} />
              </Link>
            </div>
            {wishlist.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Heart size={32} className="mx-auto mb-2" />
                <p className="text-sm">No saved properties</p>
                <Link to="/properties" className="text-xs text-blue-600 dark:text-blue-400 mt-1 block hover:underline">Start exploring</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {wishlist.slice(0, 3).map(p => (
                  <Link to={`/properties/${p._id}`} key={p._id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <img src={p.images?.[0]} alt={p.title} className="w-14 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">{p.title}</p>
                      <p className="text-xs text-gray-500">{p.city} • {p.propertyType}</p>
                    </div>
                    <span className="text-sm font-bold text-red-500 flex-shrink-0">
                      ₹{(p.price / 100000).toFixed(0)}{p.price >= 10000000 ? 'Cr' : 'L'}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="card p-6">
            <h2 className="font-display font-semibold text-lg text-gray-900 dark:text-white mb-4">Profile Info</h2>
            <div className="space-y-3">
              {[['Name', user.name], ['Email', user.email], ['Role', user.role], ['Phone', user.phone || 'Not provided']].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm border-b border-gray-50 dark:border-gray-700 pb-2 last:border-0">
                  <span className="text-gray-500 dark:text-gray-400">{k}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200 capitalize">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

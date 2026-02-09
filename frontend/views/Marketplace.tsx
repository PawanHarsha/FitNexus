import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/geminiService';
import { Product } from '../types';
import { PRODUCT_CATEGORIES } from '../constants';
import { Star, ShoppingCart, Check, Loader2, AlertCircle } from 'lucide-react';

interface MarketplaceProps {
  addToCart: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ addToCart }) => {
  const [filter, setFilter] = useState('All');
  const [products, setProducts] = useState<Product[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchProducts(filter);
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, [filter]);

  const handleAdd = (id: string) => {
    addToCart();
    setAddedItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">Marketplace</h2>
          <p className="text-nexus-muted">Powered by Global API</p>
        </div>
        
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto">
          {PRODUCT_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                filter === cat 
                  ? 'bg-nexus-primary text-nexus-black font-bold scale-105' 
                  : 'bg-nexus-gray text-nexus-text hover:bg-nexus-dark border border-nexus-gray'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-96 bg-nexus-dark border border-nexus-gray rounded-xl animate-pulse flex items-center justify-center">
              <Loader2 className="animate-spin text-nexus-gray" size={40} />
            </div>
          ))}
        </div>
      ) : !products || products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-nexus-dark border border-nexus-gray rounded-2xl text-nexus-muted">
          <AlertCircle size={48} className="mb-4 opacity-20" />
          <p className="text-lg italic">Marketplace data not available</p>
          <button onClick={() => window.location.reload()} className="mt-4 text-nexus-primary text-sm font-bold uppercase hover:underline">Retry Connection</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-nexus-dark rounded-xl overflow-hidden border border-nexus-gray hover:border-nexus-primary transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-nexus-black/80 text-nexus-primary px-2 py-1 rounded text-xs font-bold uppercase">
                  {product.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white truncate pr-2">{product.name}</h3>
                  <span className="text-nexus-primary font-bold">${product.price}</span>
                </div>
                <p className="text-nexus-muted text-sm mb-4 h-10 overflow-hidden leading-snug">{product.description}</p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-yellow-500 text-sm">
                    <Star size={16} fill="currentColor" />
                    <span className="ml-1 text-nexus-text">{product.rating}</span>
                  </div>
                  <button 
                    onClick={() => handleAdd(product.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      addedItems[product.id] 
                        ? 'bg-green-500 text-white scale-95'
                        : 'bg-nexus-text text-nexus-black hover:bg-nexus-primary'
                    }`}
                  >
                    {addedItems[product.id] ? <Check size={16} /> : <ShoppingCart size={16} />} 
                    {addedItems[product.id] ? 'In Cart' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
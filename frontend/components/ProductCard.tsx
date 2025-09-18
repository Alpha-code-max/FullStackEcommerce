'use client';

import { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card
      className="h-full bg-white/70 backdrop-blur-md border border-gray-200 
      transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
      rounded-2xl overflow-hidden group relative"
    >
      {/* Gradient Accent on Hover */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-500/50 transition-colors duration-300"></div>

      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div>
            {product.inStock ? (
              <Badge variant="default" className="bg-green-50 text-green-700 border border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Available
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-red-50 text-red-700 border border-red-200">
                <XCircle className="w-3 h-3 mr-1" />
                Unavailable
              </Badge>
            )}
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-2">{product.description}</p>
      </CardHeader>
      
      <CardContent className="pb-4">
        {/* Price Section */}
        <div className="mb-6">
          <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-1">
            {formatPrice(product.price)}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Starting Price</div>
        </div>
        
        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 text-sm">Included Features</h4>
            <ul className="space-y-2">
              {product.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <Star className="w-3.5 h-3.5 mr-2 text-yellow-400 fill-current flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {product.features.length > 4 && (
              <p className="text-xs text-gray-400">+{product.features.length - 4} more features</p>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button
          className={`w-full rounded-full py-5 text-base font-medium shadow-md 
          transition-all duration-300 
          ${product.inStock 
            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:from-blue-600 hover:to-indigo-700' 
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Get Quote' : 'Currently Unavailable'}
        </Button>
      </CardFooter>
    </Card>
  );
}

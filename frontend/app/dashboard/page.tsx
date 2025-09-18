'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Hammer, Truck, Users, Warehouse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductProvider } from '@/context/ProductContext';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

export default function Dashboard() {
  const featuredProducts = products.slice(0, 3);

  return (
    <ProductProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />

        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Build Stronger with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                Quality Materials You Can Trust
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              From cement, rods, and tiles to roofing sheets and paints, His Grace Buildings supplies
              durable materials for every project. We combine reliability, fair pricing, and trusted delivery.
            </p>
            <Link href="/home" className="inline-block mt-8 relative group">
              <span className="relative px-8 py-4 text-lg font-bold text-blue-600 hover:text-blue-700 inline-block transform transition-transform duration-300 group-hover:-translate-y-1 flex items-center gap-2">
                View Price List
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </section>

          {/* Service Categories */}
          <section className="space-y-20">
            {[
              {
                icon: <Warehouse className="w-8 h-8 text-blue-600" />,
                bgColor: "bg-blue-100",
                title: "Wholesale Supply",
                text: "We stock and supply bulk building materials including cement, iron rods, tiles, wood, and more — perfect for contractors, developers, and distributors."
              },
              {
                icon: <Truck className="w-8 h-8 text-purple-600" />,
                bgColor: "bg-purple-100",
                title: "Fast & Reliable Delivery",
                text: "With our trusted logistics network, your orders are delivered to your site quickly and securely, reducing downtime and keeping your project on schedule.",
                reverse: true
              },
              {
                icon: <Hammer className="w-8 h-8 text-green-600" />,
                bgColor: "bg-green-100",
                title: "Quality Assured Materials",
                text: "We partner with top manufacturers to ensure you get only durable, industry-standard materials for long-lasting results."
              },
              {
                icon: <Users className="w-8 h-8 text-orange-600" />,
                bgColor: "bg-orange-100",
                title: "Customer Support",
                text: "From quote requests to after-sales support, our team is always available to assist, ensuring your building journey is smooth from start to finish.",
                reverse: true
              }
            ].map((service, index) => (
              <ServiceBlock key={index} {...service} />
            ))}
          </section>

          {/* Featured Products */}
          <section className="space-y-10">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Our Featured Products</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Popular building materials trusted by contractors, engineers, and homeowners for their durability and affordability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/home" className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold text-blue-600 hover:text-blue-700 group">
                View All Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl sm:rounded-3xl text-white space-y-6 shadow-lg">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Let's Build Together
            </h2>

            <p className="text-base sm:text-lg lg:text-xl max-w-xl sm:max-w-2xl mx-auto leading-relaxed text-blue-100 px-4">
              Whether you're constructing your dream home, managing a commercial project,
              or supplying a community, His Grace Buildings is your reliable partner for
              premium materials at the best prices.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 px-4">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-md hover:shadow-lg transition-all">
                Contact Us
              </Button>
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-md hover:shadow-lg transition-all">
                Request a Quote
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ProductProvider>
  );
}

interface ServiceBlockProps {
  icon: React.ReactNode;
  bgColor: string;
  title: string;
  text: string;
  reverse?: boolean;
}

function ServiceBlock({ icon, bgColor, title, text, reverse }: ServiceBlockProps) {
  return (
    <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-start gap-8`}>
      <div className="md:w-2/3">
        <div className={`${bgColor} p-4 rounded-full inline-block mb-4`}>{icon}</div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-lg text-gray-600">{text}</p>
      </div>
    </div>
  );
}

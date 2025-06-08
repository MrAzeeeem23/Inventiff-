'use client';

import { useEffect, useState } from "react";
import Head from "next/head";
import { ArrowRight, CheckCircle, X } from "lucide-react";
import blogService from '@/appwrite_controller/service';
import Loader from "@/components/utility/Loader";
import ContactCard from "../ContactCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await blogService.getProductDetails();
        setProducts(response.documents);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Generate structured data for products
  const generateStructuredData = () => {
    if (!products.length) return null;
    
    const productList = products.map(product => ({
      "@type": "Product",
      "name": product.name,
      "description": product.short_description,
      "brand": {
        "@type": "Brand",
        "name": "Inventiff Analytics"
      },
      "category": "Data Analytics Software",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock"
      }
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Inventiff Analytics Products",
      "description": "AI-powered data analytics solutions and business intelligence tools",
      "itemListElement": productList.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": product
      }))
    };
  };

  return (
    <>
      <Head>
        <title>AI-Powered Data Analytics Products | Inventiff Analytics Solutions</title>
        <meta
          name="description"
          content="Discover Inventiff's cutting-edge AI analytics products: SmartInsight, HealthLens, MarketPulse. Cloud-ready data science solutions for business intelligence and industry-specific analytics."
        />
        <meta name="keywords" content="AI analytics products, data science solutions, business intelligence software, cloud analytics, SmartInsight, HealthLens, MarketPulse, data visualization tools, predictive analytics" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="author" content="Inventiff Analytics" />
        <link rel="canonical" href="https://inventiff.com/products" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="AI-Powered Data Analytics Products | Inventiff Analytics" />
        <meta
          property="og:description"
          content="Transform your business with Inventiff's AI-powered analytics suite. Explore SmartInsight, HealthLens, MarketPulse and more industry-leading data solutions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://inventiff.com/products" />
        <meta property="og:site_name" content="Inventiff Analytics" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI-Powered Data Analytics Products | Inventiff Analytics" />
        <meta name="twitter:description" content="Discover cutting-edge AI analytics products for business intelligence and data-driven insights." />
        <meta name="twitter:site" content="@inventiff" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Maharashtra, India" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="language" content="en" />
        
        {/* Structured Data */}
        {products.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateStructuredData())
            }}
          />
        )}
      </Head>

      <main>
        <section className="relative min-h-max bg-gradient-to-tr from-white to-blue-900/20 dark:from-black dark:to-purple-900/20 py-10 px-4 sm:px-6 lg:px-8">
          <div className="mt-12 mb-8">
            <header>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-afacad mb-4 text-gray-900 dark:text-white">
                AI-Powered Analytics Products
              </h1>
              <p className="text-lg font-Poppins dark:text-white my-8">
                Innovative data analytics tools designed to transform your business intelligence and accelerate data-driven decision making
              </p>
            </header>

            {isLoading ? <Loader /> : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Product catalog">
                {products.map((product, index) => (
                  <article
                    key={product.$id}
                    onClick={() => openProductModal(product)}
                    className="relative backdrop-blur-sm rounded-2xl p-8 h-full cursor-pointer shadow-lg dark:shadow-2xl overflow-hidden"
                    role="listitem"
                    aria-label={`${product.name} - ${product.short_description}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openProductModal(product);
                      }
                    }}
                  >
                    {/* Subtle gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white/30 dark:from-gray-800/30 dark:to-gray-900/50 rounded-2xl" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex-1">
                        <div className="mb-6">
                          <h2 className="text-3xl font-afacad font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
                            {product.name}
                          </h2>
                          
                          <p className="text-gray-600 dark:text-gray-300 text-base font-Poppins leading-relaxed mb-6">
                            {product.short_description}
                          </p>
                        </div>

                        {product.features && product.features.length > 0 && (
                          <div className="mb-6">
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 font-Poppins">
                              Key Features
                            </h3>
                            <ul className="space-y-2" role="list">
                              {product.features.slice(0, 3).map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start" role="listitem">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0" aria-hidden="true" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400 font-Poppins">
                                    {feature.length > 60 ? `${feature.substring(0, 60)}...` : feature}
                                  </span>
                                </li>
                              ))}
                              {product.features.length > 3 && (
                                <li className="text-xs text-gray-500 dark:text-gray-500 font-Poppins ml-5" role="listitem">
                                  +{product.features.length - 3} more features
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-4 mt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm font-Poppins">
                            Learn more <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 to-transparent dark:from-blue-400/10 rounded-bl-3xl" aria-hidden="true" />
                  </article>
                ))}
              </div>
            )}
          </div>
          <ContactCard />
        </section>
      </main>

      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={closeProductModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div 
            className="backdrop-blur-3xl dark:bg-slate-950/20 rounded-3xl max-w-2xl w-full mx-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeProductModal}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Close product details modal"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="p-8">
              <h2 id="modal-title" className="text-3xl font-afacad font-bold text-gray-900 dark:text-white mb-4">
                {selectedProduct.name}
              </h2>
              
              <p id="modal-description" className="text-xl font-Poppins text-gray-700 dark:text-gray-300 mb-6">
                {selectedProduct.short_description}
              </p>

              {selectedProduct.long_description && (
                <div className="mb-6">
                  <h3 className="text-lg font-Poppins font-bold text-gray-800 dark:text-gray-200 mb-3">
                    Detailed Description
                  </h3>
                  <p className="text-gray-600 font-Poppins dark:text-gray-400">
                    {selectedProduct.long_description}
                  </p>
                </div>
              )}

              {selectedProduct.features && (
                <div>
                  <h3 className="text-lg font-afacad text-gray-800 dark:text-gray-200 mb-3">
                    Comprehensive Features
                  </h3>
                  <ul className="space-y-3" role="list">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-start font-afacad" role="listitem">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" aria-hidden="true" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
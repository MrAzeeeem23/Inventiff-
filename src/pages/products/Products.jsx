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

  return (
    <>
      <Head>
        <title>Inventiff Analytics | Products & Solutions</title>
        <meta
          name="description"
          content="Explore Inventiff's AI-powered analytics products like SmartInsight, HealthLens, MarketPulse and more. Scalable, cloud-ready, and industry-specific solutions."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Inventiff Analytics Products" />
        <meta
          property="og:description"
          content="Discover our innovative data science solutions designed to accelerate your business."
        />
        <meta property="og:type" content="website" />
      </Head>

      <section className="relative min-h-max bg-gradient-to-tr from-white to-blue-900/20 dark:from-black dark:to-purple-900/20 py-10 px-4 sm:px-6 lg:px-8">
        <div className="mt-12 mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-afacad mb-4 text-gray-900 dark:text-white">
            Products
          </h1>
          <p className="text-lg font-Poppins dark:text-white my-8">
            Innovative data analytics tools designed to transform your business intelligence
          </p>

          {isLoading ? <Loader /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.$id}
                  onClick={() => openProductModal(product)}
                  className="relative backdrop-blur-sm rounded-2xl p-8 h-full cursor-pointer shadow-lg dark:shadow-2xl overflow-hidden"
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
                          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 font-Poppins">
                            Key Features
                          </h4>
                          <div className="space-y-2">
                            {product.features.slice(0, 3).map((feature, index) => (
                              <div key={index} className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0" />
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-Poppins">
                                  {feature.length > 60 ? `${feature.substring(0, 60)}...` : feature}
                                </span>
                              </div>
                            ))}
                            {product.features.length > 3 && (
                              <div className="text-xs text-gray-500 dark:text-gray-500 font-Poppins ml-5">
                                +{product.features.length - 3} more features
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-4 mt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm font-Poppins">
                          Learn more <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 to-transparent dark:from-blue-400/10 rounded-bl-3xl" />
                </div>
              ))}
            </div>
          )}
        </div>
        <ContactCard />

      </section>

      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={closeProductModal}
        >
          <div 
            className="backdrop-blur-3xl dark:bg-slate-950/20 rounded-3xl max-w-2xl w-full mx-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeProductModal}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="p-8">
              <h2 className="text-3xl font-afacad font-bold text-gray-900 dark:text-white mb-4">
                {selectedProduct.name}
              </h2>
              
              <p className="text-xl font-Poppins text-gray-700 dark:text-gray-300 mb-6">
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
                  <ul className="space-y-3">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-start font-afacad">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
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
'use client';

import { useEffect, useState } from "react";
import Head from "next/head";
import { ArrowRight, CheckCircle, X } from "lucide-react";
import blogService from '@/appwrite_controller/service';
import PixelCard from "@/animations/PixelCard";
import Loader from "@/components/utility/Loader";

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

      <section className="min-h-screen bg-gradient-to-tr dark:from-black dark:to-purple-900/20 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-afacad mb-4 text-gray-900 dark:text-white">
            Our Products & Solutions
          </h1>
          <p className="font-Poppins text-gray-600 dark:text-gray-300 mb-16 max-w-2xl">
            Innovative data analytics tools designed to transform your business intelligence
          </p>

          {isLoading ? <Loader /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <PixelCard 
                  key={product.$id} 
                  variant="blue" 
                  className="h-full"
                >
                  <article 
                    onClick={() => openProductModal(product)}
                    className="p-6 h-full absolute flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] group cursor-pointer dark:bg-gray-900/20 rounded-lg overflow-hidden shadow-lg"
                  >
                    <div>
                      <div className="mb-5">
                        <h2 className="text-4xl font-afacad font-bold text-gray-800 dark:text-gray-100 mb-3">
                          {product.name}
                        </h2>
                        <p className="text-gray-600 mt-10 dark:text-gray-300 text-lg font-Poppins">
                          {product.short_description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end mt-4 text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </article>
                </PixelCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={closeProductModal}
        >
          <div 
            className="backdrop-blur-3xl rounded-3xl max-w-2xl w-full mx-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeProductModal}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal Content */}
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
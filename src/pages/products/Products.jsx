import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import blogService from '@/appwrite_controller/service';
import PixelCard from "@/animations/PixelCard";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Our Products & Solutions
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
            Innovative data analytics tools designed to transform your business intelligence
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link key={product.$id} href={`/products/${product.slug}`} className="h-full">
                  <PixelCard variant="blue" className="h-full">
                    <article className="p-6 h-full absolute flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] group cursor-pointer dark:bg-gray-900/20 rounded-lg overflow-hidden shadow-lg">
                      <div>
                        <div className="mb-5">
                          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                            {product.name}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                            {product.short_description}
                          </p>
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-3">Key Features</h3>
                          <ul className="space-y-2">
                            {product.features?.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {product.long_description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 italic line-clamp-2 mb-4">
                            {product.long_description}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-end mt-4 text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                        Learn more <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </article>
                  </PixelCard>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
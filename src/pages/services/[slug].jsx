"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import blogService from "@/appwrite_controller/service";
import Loader from "@/components/utility/Loader";
import Container from "@/components/container/Container";
import { useRouter } from "next/router";

export default function ServiceDetail() {
  const [service, setService] = useState([]);
  const [loader, setLoader] = useState(true);
  const sectionRef = useRef(null);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await blogService.getServiceById(slug);
        const parsedServices = [{
          ...response,
          points: JSON.parse(response.points),
        }];
        setService(parsedServices);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, [slug]);


  console.log(service)

  useEffect(() => {
    if (!loader && sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, filter: "blur(10px)", y: 50 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }
  }, [loader]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div
          ref={sectionRef}
          className="min-h-screen bg-gradient-to-tr dark:from-black dark:to-purple-900/20 py-10 px-4 sm:px-6 lg:px-8"
        >
          <Container>
            {service.map((i) => (
              <div
                key={i.$id}
                className="mb-16 mt-12 p-6 rounded-xl backdrop-blur-md bg-white/60 dark:bg-black/40 shadow-lg dark:shadow-black/50"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <img
                    src={i.Thumbnail}
                    alt={i.title}
                    className="w-full lg:w-1/3 h-auto rounded-md object-cover shadow-md"
                  />
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold font-afacad text-gray-800 dark:text-white mb-4">
                      {i.title}
                    </h1>
                    <p className="text-gray-700 dark:text-gray-300 text-base font-Poppins md:text-lg mb-6">
                      {i.description}
                    </p>

                    <div className="grid gap-4">
                      {i.points.map((j, index) => (
                        <div
                          key={j.$id || index}
                          className="p-4 rounded-xl shadow-inner border border-gray-200 dark:border-gray-700"
                        >
                          <h2 className="text-xl font-afacad text-black dark:text-white">
                            {j.title}
                          </h2>
                          <p className="text-gray-600 font-font-Poppins dark:text-gray-400">
                            {j.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Container>
        </div>
      )}
    </>
  );
}

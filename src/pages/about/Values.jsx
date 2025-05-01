import React from "react";
import { Handshake, Atom, Blocks } from "lucide-react";
import Container from "@/components/container/Container";

function Values() {
  const valuesData = [
    {
      icon: (
        <Handshake size={40} strokeWidth={1.5} className="dark:text-white" />
      ),
      heading: "Client-Centric Collaboration",
      paragraph:
        "Our clients are our partners. We work closely with businesses to understand their unique challenges and deliver customized analytics solutions that align with their goals, culture, and vision for growth.",
    },
    {
      icon: <Atom size={40} strokeWidth={1.5} className="dark:text-white" />,
      heading: "Insight-Driven Innovation",
      paragraph:
        "We believe in the power of data to spark innovation. By turning raw information into meaningful insights, we help clients uncover hidden opportunities, solve complex problems, and stay ahead of the competition.",
    },
    {
      icon: <Blocks size={40} strokeWidth={1.5} className="dark:text-white" />,
      heading: "Excellence with Integrity",
      paragraph:
        "We’re committed to delivering high-quality, impactful solutions while upholding the highest standards of transparency, ethics, and professionalism in everything we do.",
    },
  ];

  return (
    <>
      <Container>
      <div className="mb-12">
          <h2 id="company-values" className="text-4xl md:text-4xl font-afacad font-bold mb-4 text-gray-900 dark:text-white">
            At Our Core
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {valuesData.map((vd) => (
            <div className="p-6 hover:shadow-lg transition duration-300 border-x dark:border-slate-600 mb-5">
              {vd.icon}
              <h1 className="text-2xl font-afacad text-black dark:text-white font-bold pt-8 my-4">
                {vd.heading}
              </h1>
              <p className="text-md font-Poppins text-gray-700 dark:text-gray-400">
                {vd.paragraph}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Values;

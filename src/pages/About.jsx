import React from "react";
import Globe from "@/animations/Globe";
import Values from "./about/Values";
import WhoWreAre from "./about/WhoWreAre";
import Interactive3DGraph from "@/animations/Interactive3DGraph";
import Head from "next/head";
import Why from "./about/Why";

function About() {
  // Dynamic content
  const companyName = "Inventiff Analytics";
  const aboutTitle = "About";
  const whoWeAreTitle = "Who We Are";
  const whyInventiffTitle = "Why Inventiff";

  const aboutDescription = `At ${companyName}, we believe data is more than just numbers—it’s a strategic asset. We are a boutique analytics and data science consulting start-up committed to helping businesses unlock the true potential of their data. From market insights to customer behavior and competitive intelligence, we partner with our clients to solve real-world problems with powerful, data-driven solutions.`;

  const whoWeAreDescription = `${companyName} is powered by a passionate team of experienced data scientists, domain experts, and technology consultants with over 10 years of experience. Our team members have worked with top-tier companies across industries such as financial services, manufacturing, pharmaceuticals, e-commerce, and consulting.

We are a privately held company with a growing team of 11–50 employees, offering specialized consulting services tailored to your business needs. Our mission is to be your strategic partner in leveraging data for innovation, transformation, and competitive advantage.`;

  const whyInventiffDescription = `At ${companyName}, we combine technical excellence with strategic insight. Whether you're looking to implement AI solutions, optimize operations, or gain deeper market understanding, we provide custom analytics consulting that delivers real results. Our solutions are tailored, scalable, and aligned with your business goals—enabling you to stay ahead in a rapidly evolving digital landscape.`;

  return (
    <>
      {/* Main About Section */}
      <Head>
        <title>
          About Inventiff Analytics | Data Science & Analytics Consulting
        </title>
        <meta
          name="description"
          content="Learn more about Inventiff Analytics, a boutique data science and analytics consulting company."
        />
      </Head>
      <section
        aria-labelledby="about-heading"
        className="min-h-max bg-gradient-to-tr from-white to-blue-900/20 dark:from-black dark:to-purple-900/20 py-10 px-4 sm:px-6 lg:px-8 flex justify-center"
      >
        <div className="w-full max-w-6xl grid grid-rows-2 mt-12">
          {/* Heading */}
          <div>
            <h1
              id="about-heading"
              className="text-5xl sm:text-6xl lg:text-7xl text-black dark:text-white font-afacad font-bold"
            >
              {aboutTitle}
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-black dark:text-white font-afacad">
              {companyName}
            </h2>
          </div>

          {/* Description */}
          <div className="w-full flex justify-end mt-6 sm:mt-8">
            <p className="text-md max-w-2xl text-black dark:text-white font-Poppins leading-relaxed">
              {aboutDescription}
            </p>
          </div>

          {/* Who We Are Section */}
          <div className="w-full mt-32 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
            <div>
              <picture>
                <img
                  className="w-full h-auto rounded-lg shadow-lg"
                  src="https://images.pexels.com/photos/3780104/pexels-photo-3780104.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Team collaboration at Inventiff Analytics"
                />
              </picture>
            </div>
            <article>
              <h3 className="text-3xl sm:text-4xl font-bold dark:text-white font-afacad">
                {whoWeAreTitle}
              </h3>
              <p className="text-md font-Poppins text-gray-700 dark:text-gray-400 my-6 whitespace-pre-line">
                {whoWeAreDescription}
              </p>
            </article>
          </div>

          {/* Globe Animation */}
          <div className="flex justify-center items-center my-28">
            <Interactive3DGraph
              nodeColor="#ffffff"
              edgeColor="#ffffff"
              className="invert dark:invert-0"
            />
          </div>

          {/* Values Section */}
          <Values />

          {/* Why Inventiff Section */}
          <div className="w-full mt-12 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
            <article>
              <h3 className="text-3xl sm:text-4xl font-bold dark:text-white font-afacad">
                {whyInventiffTitle}
              </h3>
              <p className="text-md font-Poppins text-gray-700 dark:text-gray-400 my-6">
                {whyInventiffDescription}
              </p>
            </article>
            <div>
              <picture>
                <img
                  className="w-full h-auto rounded-lg shadow-md"
                  src="https://images.pexels.com/photos/264594/pexels-photo-264594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Data-driven decision making illustration"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

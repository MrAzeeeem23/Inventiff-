import React from "react";

function WhoWreAre() {
  return (
    <>
    <div className="w-full mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-32">

      <div>
        <img
          src="https://images.pexels.com/photos/3780104/pexels-photo-3780104.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="img"
        />
      </div>
      <div>
        <h1 className="text-4xl font-bold dark:text-white font-afacad">
            Who We Are
        </h1>
        <p className="text-md font-Poppins text-gray-700 dark:text-gray-400 my-12">
        Inventiff Analytics is powered by a passionate team of experienced data scientists, domain experts, and technology consultants with over 10 years of experience. Our team members have worked with top-tier companies across industries such as financial services, manufacturing, pharmaceuticals, e-commerce, and consulting. We are a privately held company with a growing team of 11–50 employees, offering specialized consulting services tailored to your business needs. Our mission is to be your strategic partner in leveraging data for innovation, transformation, and competitive advantage.
        </p>
      </div>
    </div>
    </>
  );
}

export default WhoWreAre;

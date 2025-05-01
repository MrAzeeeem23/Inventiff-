import React from "react";

function Why() {
  return (
    <>
      <div className="w-full h-screen mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-32">
        <div>
          <h1 className="text-4xl font-bold dark:text-white font-afacad">
            Why Inventiff
          </h1>
          <p className="text-md font-Poppins text-gray-700 dark:text-gray-400 my-12">
            At Inventiff, we combine technical excellence with strategic
            insight. Whether you're looking to implement AI solutions, optimize
            operations, or gain deeper market understanding, we provide custom
            analytics consulting that delivers real results. Our solutions are
            tailored, scalable, and aligned with your business goals—enabling
            you to stay ahead in a rapidly evolving digital landscape.
          </p>
        </div>
        <div>
          <img src="https://images.pexels.com/photos/264594/pexels-photo-264594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="img" />
        </div>
      </div>
    </>
  );
}

export default Why;

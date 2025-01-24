import React, { useState, useEffect } from "react";
import "../styles/AcceptHouseTabz.css";

const AcceptHouseTabz = () => {
  const [activeSection, setActiveSection] = useState(1);

  const handleScroll = () => {
    const sections = document.querySelectorAll(".scroll-section");
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight / 1.5 && rect.bottom > 0) {
        setActiveSection(index + 1);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-10 rounded-lg shadow-lg max-w-6xl mx-auto space-y-16">
      {/* Section 1 */}
      <div
        className={`scroll-section transition-opacity duration-700 ${
          activeSection >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-teal-700 mb-4">
              Give Your Consumers a Fair Way to Share Your Expense
            </h2>
            <p className="text-gray-700 text-lg">
              Revolutionize how your consumers approach shared payments by
              offering a seamless and fair solution. HouseTabz makes it easy to
              split costs without the hassle of chasing reimbursements.
            </p>
          </div>
          <div className="flex-1 bg-gray-200 rounded-md h-64 flex items-center justify-center">
            <span className="text-gray-500 text-lg">Image Placeholder</span>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div
        className={`scroll-section transition-opacity duration-700 ${
          activeSection >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Fairness Drives Conversion
            </h3>
            <p className="text-gray-700 text-lg">
              By offering a fair solution for your expense, we remove a barrier
              to your service. Payments made simple.
            </p>
          </div>
          <div className="flex-1 bg-gray-200 rounded-md h-64 flex items-center justify-center">
            <span className="text-gray-500 text-lg">Image Placeholder</span>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div
        className={`scroll-section transition-opacity duration-700 ${
          activeSection >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Streamlined Payments
            </h3>
            <p className="text-gray-700 text-lg">
              Roommates' payments funnel through HouseTabz, and the service
              provider receives one payment from HouseTabz. No hassle, no
              stress—just simplicity.
            </p>
          </div>
          <div className="flex-1 bg-gray-200 rounded-md h-64 flex items-center justify-center">
            <span className="text-gray-500 text-lg">Image Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptHouseTabz;

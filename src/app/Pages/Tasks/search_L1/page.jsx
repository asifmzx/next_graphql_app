import React from "react";

const page = () => {
  return (
    <div className="p-4 md:p-6">
      <div>
        <input
          type="text"
          className="border border-gray-300 rounded-full p-4 w-full mt-10 text-xl mx-auto"
          placeholder="Search for a family member..."
        />
      </div>
      <div>
        <table className="w-full mt-6 border-collapse">
          <thead className="border border-gray-300">Search Results</thead>
        </table>
      </div>
    </div>
  );
};

export default page;

"use client"
import React, { useState } from "react";
import { familyTree } from "./data/familyTree";

const page = () => {
  const [searchName, setSearchName] = useState("")

  function handleSearch(e) {
    const searchData = e.target.value;
    setSearchName(searchData)
  }

  const filteredGrands = familyTree.filter(data => data.name.toLowerCase().includes(searchName.toLowerCase()));
  const parents = familyTree.flatMap((member) => member.parents);
  const filteredparents = parents.filter((parent) => parent.name.toLowerCase().includes(searchName.toLowerCase()))
  const children = parents.flatMap((child) => child.children)
  const filteredChildrens = children.filter((child) => child.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div className="p-4 md:p-6">
      <div>
        <input
          type="text"
          className="border border-gray-300 rounded-full p-4 w-full mt-10 text-xl mx-auto"
          placeholder="Search for a family member..."
          onChange={(e) => handleSearch(e)}
        />
      </div>
      {searchName &&
        <div className="mt-10">
          {filteredGrands.map((n, index) => <p key={`grand-${index}`}>{n.name}</p>)}
          {filteredparents.map((n, index) => <p key={`parent-${index}`}>{n.name}</p>)}
          {filteredChildrens.map((n, index) => <p key={`child-${index}`}>{n.name}</p>)}
        </div>
      }
    </div>
  );
}

export default page;

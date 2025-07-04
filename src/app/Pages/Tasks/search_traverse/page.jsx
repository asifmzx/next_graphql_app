"use client"
import React, { useState } from "react";
import { familyTree } from "./data/familyTree";

const page = () => {
    const [searchName, setSearchName] = useState("")

    function handleSearch(e) {
        setSearchName(e.target.value)
    }

    const GrandParents = []
    const Parents = []

    function findMember() {
        familyTree.map((item) => {  //it grabbed individual object
            GrandParents.push(item)
            for (const key in item) { //this one take fist object key
                const value = item[key]
                console.log(value)
            }
            // console.log(tempMember)
        })
    }

    findMember()

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
            {/* {searchName && (
                <>
                    <div className="mt-10">
                        {filteredGrands.map((n, index) => <p key={`grand-${index}`}>{n.name}</p>)}
                        {filteredparents.map((n, index) => <p key={`parent-${index}`}>{n.name}</p>)}
                        {filteredChildrens.map((n, index) => <p key={`child-${index}`}>{n.name}</p>)}
                    </div>

                    <div className="mt-10">
                        {filteredGrands.length === 0 && filteredparents.length === 0 && filteredChildrens.length === 0 ? (
                            <p>No results found</p>
                        ) : (
                            <table className="w-full mt-4 border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 p-2">Name</th>
                                        <th className="border border-gray-300 p-2">Type</th>
                                        <th className="border border-gray-300 p-2">Generation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredGrands.map((member, index) => (
                                        <tr key={`grand-${index}`}>
                                            <td className="border border-gray-300 p-2">{member.name}</td>
                                            <td className="border border-gray-300 p-2">Grandparent</td>
                                            <td className="border border-gray-300 p-2">1st Generation</td>
                                        </tr>
                                    ))}
                                    {filteredparents.map((member, index) => (
                                        <tr key={`parent-${index}`}>
                                            <td className="border border-gray-300 p-2">{member.name}</td>
                                            <td className="border border-gray-300 p-2">Parent</td>
                                            <td className="border border-gray-300 p-2">2nd Generation</td>
                                        </tr>
                                    ))}
                                    {filteredChildrens.map((member, index) => (
                                        <tr key={`child-${index}`}>
                                            <td className="border border-gray-300 p-2">{member.name}</td>
                                            <td className="border border-gray-300 p-2">Child</td>
                                            <td className="border border-gray-300 p-2">3rd Generation</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )} */}

            {/* <div>
                {GrandParents.map((item) => <p>{item.name}</p>)}
            </div> */}
        </div>
    );
}

export default page;
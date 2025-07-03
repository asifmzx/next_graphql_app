"use client"
import React, { useState } from "react";
import { familyTree } from "../search_L1/data/familyTree";

const page = () => {
    const [selectMember, setSelectMember] = useState([]);

    const handleSelectMember = (e) => {
        const memberName = e.target.value.toLowerCase();

        if (!memberName.trim()) {
            setSelectMember([]);
            return;
        }
        const searchInObject = (obj, searchTerm) => {
            const results = [];
            const matchesName = (obj.name && obj.name.toLowerCase().includes(searchTerm)) ||
                (obj.Name && obj.Name.toLowerCase().includes(searchTerm));
            // const matchesLocation = (obj.location && obj.location.toLowerCase().includes(searchTerm)) ||
            //     (obj.Location && obj.Location.toLowerCase().includes(searchTerm));

            if (matchesName || matchesLocation) {
                results.push(obj);
            }
            Object.values(obj).forEach(value => {
                if (Array.isArray(value)) {
                    value.forEach(item => {
                        if (typeof item === 'object' && item !== null) {
                            results.push(...searchInObject(item, searchTerm));
                        }
                    });
                } else if (typeof value === 'object' && value !== null) {
                    results.push(...searchInObject(value, searchTerm));
                }
            });

            return results;
        };
        const allResults = [];
        familyTree.forEach(person => {
            allResults.push(...searchInObject(person, memberName));
        });

        const uniqueResults = allResults.filter((item, index, self) =>
            index === self.findIndex(t =>
                (t.name || t.Name) === (item.name || item.Name) &&
                (t.location || t.Location) === (item.location || item.Location)
            )
        );

        console.log('Found members:', uniqueResults);
        setSelectMember(uniqueResults);
    }

    // const member = familyTree.filter((p) => p.Name === searchQuery);

    // familyTree.map((data) => {
    //   if (data.Name.toLowerCase().includes(searchQuery.toLowerCase()) || data.Location.toLowerCase().includes(searchQuery.toLowerCase())) {
    //     console.log(data)
    //   }
    // })
    console.log(selectMember)

    return (
        <div className="p-4 md:p-6">
            <div>
                <input
                    type="text"
                    className="border border-gray-300 rounded-full p-4 w-full mt-10 text-xl mx-auto"
                    placeholder="Search for a family member..."
                    onChange={handleSelectMember}
                />
            </div>
            <div className="mt-10">
                {selectMember.length > 0 && (
                    <div className="space-y-4">
                        {selectMember.map((member, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                <h3 className="text-lg font-semibold text-blue-600">
                                    {member.name || member.Name}
                                </h3>
                                <div className="mt-2 space-y-1">
                                    {(member.age || member.Age) && (
                                        <p className="text-gray-600">
                                            <span className="font-medium">Age:</span> {member.age || member.Age}
                                        </p>
                                    )}
                                    {(member.location || member.Location) && (
                                        <p className="text-gray-600">
                                            <span className="font-medium">Location:</span> {member.location || member.Location}
                                        </p>
                                    )}
                                    {member.job && (
                                        <p className="text-gray-600">
                                            <span className="font-medium">Job:</span> {member.job}
                                        </p>
                                    )}
                                    {member.money && (
                                        <p className="text-gray-600">
                                            <span className="font-medium">Money:</span> ${member.money}
                                        </p>
                                    )}
                                    {member.hobbies && (
                                        <p className="text-gray-600">
                                            <span className="font-medium">Hobbies:</span> {member.hobbies.join(", ")}
                                        </p>
                                    )}
                                    {member.interests && (
                                        <p className="text-gray-600">
                                            <span className="font-medium">Interests:</span> {member.interests.join(", ")}
                                        </p>
                                    )}
                                    {member.toys && (
                                        <p className="text-gray-600">
                                            <span className="font-medium">Toys:</span> {member.toys.join(", ")}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default page;

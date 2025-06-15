"use client"
import { useState } from "react";

export default function Formv2() {

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    CV: "",
    degree: "",
    start_year: "",
    linkedin: "",
    source: "",
    prolang: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const existingData = JSON.parse(localStorage.getItem("employees")) || [];
      existingData.push(formData);
      console.log("Form submitted successfully", formData);
      localStorage.setItem("employees", JSON.stringify(existingData));
      window.location.reload();
    } else {
      console.log("Form submission failed", newErrors);
    }
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.first_name.trim()) {
      newErrors.first_name = "First name is required";
    } else if (data.first_name.length < 2) {
      newErrors.first_name = "First name must be at least 2 characters long";
    } else if (data.first_name.length > 10) {
      newErrors.first_name = "First name must be less than 10 characters long";
    }


    if (!data.last_name) {
      newErrors.last_name = "Last name is required";
    } else if (data.last_name.length < 2) {
      newErrors.last_name = "Last name must be at least 2 characters long";
    } else if (data.last_name.length > 10) {
      newErrors.last_name = "Last name must be less than 10 characters long";
    }


    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!data.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{11}$/.test(data.phone)) {
      newErrors.phone = "Phone number must be 11 digits long";
    }

    if (!data.CV) {
      newErrors.CV = "CV is required";
    }

    if (!data.degree) {
      newErrors.degree = "Degree is required";
    }

    if (!data.start_year) {
      newErrors.start_year = "Start year is required";
    } else if (data.start_year < 1950 || data.start_year > 2025) {
      newErrors.start_year = "Start year must be between 1950 and 2025";
    }

    if (!data.linkedin) {
      newErrors.linkedin = "LinkedIn profile link is required";
    }
    // } else if (!/^(www\.)?linkedin\.com\/*$/.test(data.linkedin)) {
    //   newErrors.linkedin = "LinkedIn profile link is invalid";
    // }


    if (!data.source) {
      newErrors.source = "Source is required";
    }

    if (!data.prolang) {
      newErrors.prolang = "This field is required";
    }

    return newErrors;
  }



  return (
    <div className="flex flex-col w-[45%] mt-[5%] isolate mx-auto p-6 bg-white/10 rounded-xl shadow-lg ring-1 ">
      <h2 className="flex justify-center text-[#c2cc33] text-3xl font-bold mb-6">
        Apply for this job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="flex flex-row justify-between space-x-4 w-full">
          <div className="w-full">
            <label htmlFor="first_name" className="text-xl font-medium">
              <span>First Name</span><span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="John"
              className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="last_name" className="text-xl font-medium">
              <span>Last Name</span><span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Doe"
              className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="text-xl font-medium">
            Email
          </label>
          <label className="text-red-500 font-medium">*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="johndoe@email.com"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* <div>
          <label htmlFor="password" className="text-xl font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div> */}

        <div>
          <label htmlFor="phone" className="text-xl font-medium">
            Phone
          </label>
          <label htmlFor="phone" className="text-xl font-medium text-red-500">
            *
          </label>
          <input type="tel" id="phone" name="phone" placeholder="01*********" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="CV" className="text-xl font-medium">
            Resume/CV (Manually)
          </label>
          <label htmlFor="CV" className="text-xl font-medium text-red-500">
            *
          </label>
          <textarea
            id="CV"
            name="CV"
            rows="4"
            value={formData.CV}
            placeholder="Paste your CV here"
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
          {errors.CV && (
            <p className="text-red-500 text-sm mt-1">{errors.CV}</p>
          )}
        </div>

        <div>
          <label htmlFor="Education" className="text-xl font-medium">Education</label>
          {/* EDUCTAION -> Degree*/}
          <div className="mt-2 flex flex-row w-full justify-between gap-4">
            <div className="w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <label className="block text-sm font-medium">
                <span className="font-bold px-1">Degree</span><span className="text-red-500">*</span>
              </label>
              <select
                className="w-full block focus:outline-none"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
              >
                <option value="" className="text-gray-900">Select...</option>
                <option value="High School" className="text-gray-900">High School</option>
                <option value="Bachelor's Degree" className="text-gray-900">Bachelor's Degree</option>
                <option value="Master's Degree" className="text-gray-900">Master's Degree</option>
                <option value="PhD" className="text-gray-900">PhD</option>
              </select>
              {errors.degree && (
                <p className="text-red-500 text-sm mt-1">{errors.degree}</p>
              )}
            </div>

            {/* EDUCTAION -> Date */}
            <div className="w-full block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <label className="block text-sm font-medium">
                <span className="font-bold">Start date year</span><span className="text-red-500">*</span>
              </label>
              <input type="number" min={1950} max={2025} className="w-full block focus:outline-none" placeholder="1960"
                id="start_year"
                name="start_year"
                onChange={handleChange}
                value={formData.start_year} />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>
          </div>
          <div className="mt-2"></div>
          <a href="" className=" text-blue-500 underline">Add another</a>
        </div>

        <div className="w-full block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          <label className="block text-sm font-medium">
            <span className="font-bold">Source (ZipRecruiter, Indeed, LinkedIn etc.)</span><span className="text-red-500">*</span>
          </label>
          <input type="text" className="w-full block focus:outline-none"
            id="source"
            name="source"
            onChange={handleChange}
            placeholder="LinkedIn"
            value={formData.source} />
          {errors.source && (
            <p className="text-red-500 text-sm mt-1">{errors.source}</p>
          )}
        </div>

        <div className="w-full block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          <label className="block text-sm font-medium">
            <span className="font-bold">LinkedIn profile link</span>
          </label>
          <input type="text" className="w-full block focus:outline-none"
            id="linkedin"
            name="linkedin"
            onChange={handleChange}
            placeholder="www.linkedin.com/yourprofile"
            value={formData.linkedin} />
          {errors.linkedin && (
            <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>
          )}
        </div>

        <div className="w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
          <label className="block text-sm font-medium">
            <span className="font-bold px-1">Have you learned or worked with at least two programming languages?</span><span className="text-red-500">*</span>
          </label>
          <select className="w-full block focus:outline-none"
            id="prolang"
            name="prolang"
            onChange={handleChange}
            value={formData.prolang}
          >
            {errors.prolang && (
              <p className="text-red-500 text-sm mt-1">{errors.prolang}</p>
            )}
            <option value="" className="text-gray-900">Select...</option>
            <option value="yes" className="text-gray-900">Yes</option>
            <option value="no" className="text-gray-900">No</option>
          </select>
        </div>


        <div>
          <button
            type="submit"
            className="w-50 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-indigo-500 hover:bg-[#c2cc33] hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Application
          </button>
        </div>

      </form>
    </div>
  );
}
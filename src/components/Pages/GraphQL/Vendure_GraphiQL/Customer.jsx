import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { motion } from "framer-motion";

const Get_Customers_QUERY = gql`
  {
    customers(options: { skip: 0, take: 6, sort: { id: ASC } }) {
      totalItems
      items {
        id
        title
        firstName
        lastName
        createdAt
        updatedAt
        emailAddress
        phoneNumber
      }
    }
  }
`;

// Mutation to update a customer
const UPDATE_CUSTOMER_MUTATION = gql`
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      id
      title
      firstName
      lastName
      emailAddress
      phoneNumber
    }
  }
`;

// Mutation to create a new customer
const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      id
      title
      firstName
      lastName
      emailAddress
      phoneNumber
    }
  }
`;

export default function Customer() {
  const { data, loading, error, refetch } = useQuery(Get_Customers_QUERY);
  
  // State for managing forms and modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: ""
  });

  // Set up mutations
  const [updateCustomer, { loading: updateLoading }] = useMutation(UPDATE_CUSTOMER_MUTATION, {
    onCompleted: () => {
      setIsEditModalOpen(false);
      setSelectedCustomer(null);
      refetch(); // Refetch the customers list
      alert("Customer updated successfully!");
    },
    onError: (error) => {
      alert(`Error updating customer: ${error.message}`);
    }
  });

  const [createCustomer, { loading: createLoading }] = useMutation(CREATE_CUSTOMER_MUTATION, {
    onCompleted: () => {
      setIsCreateModalOpen(false);
      setFormData({
        title: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: ""
      });
      refetch(); // Refetch the customers list
      alert("Customer created successfully!");
    },
    onError: (error) => {
      alert(`Error creating customer: ${error.message}`);
    }
  });

  // Handler functions for mutations
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    try {
      await createCustomer({
        variables: {
          input: {
            title: formData.title,
            firstName: formData.firstName,
            lastName: formData.lastName,
            emailAddress: formData.emailAddress,
            phoneNumber: formData.phoneNumber
          }
        }
      });
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    
    try {
      await updateCustomer({
        variables: {
          input: {
            id: selectedCustomer.id,
            title: formData.title,
            firstName: formData.firstName,
            lastName: formData.lastName,
            emailAddress: formData.emailAddress,
            phoneNumber: formData.phoneNumber
          }
        }
      });
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      title: customer.title || "",
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      emailAddress: customer.emailAddress || "",
      phoneNumber: customer.phoneNumber || ""
    });
    setIsEditModalOpen(true);
  };

  const openCreateModal = () => {
    setFormData({
      title: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: ""
    });
    setIsCreateModalOpen(true);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading customers: {error.message}
      </div>
    );
  }

  const customers = data?.customers?.items || [];
  const totalItems = data?.customers?.totalItems || 0;

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Customers</h2>
          <p>Total customers: {totalItems}</p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Create New Customer
        </button>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {customers.map((customer) => (
          <motion.div
            key={customer.id}
            className="rounded-xl shadow-md overflow-hidden border dark:border-red-500 hover:shadow-lg transition-all duration-300"
            variants={item}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">👤</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {customer.firstName} {customer.lastName}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 rounded-full px-2 py-1">
                    {customer.title}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium w-20">ID:</span>
                  <span>{customer.id}</span>
                </div>

                {customer.emailAddress && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium w-20">Email:</span>
                    <span className="truncate">{customer.emailAddress}</span>
                  </div>
                )}

                {customer.phoneNumber && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium w-20">Phone:</span>
                    <span>{customer.phoneNumber}</span>
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium w-20">Created:</span>
                  <span>
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium w-20">Updated:</span>
                  <span>
                    {new Date(customer.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              {/* Add Edit Button */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => openEditModal(customer)}
                  className="w-full bg-green-500 hover:bg-green-600 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Edit Customer
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Create Customer Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Create New Customer</h3>
            <form onSubmit={handleCreateCustomer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mr., Ms., Dr., etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={createLoading}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {createLoading ? "Creating..." : "Create Customer"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {isEditModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Customer</h3>
            <form onSubmit={handleUpdateCustomer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Mr., Ms., Dr., etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {updateLoading ? "Updating..." : "Update Customer"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

// Query to fetch customers
const GET_CUSTOMERS = gql`
  query GetCustomers {
    customers(options: { skip: 0, take: 10, sort: { id: ASC } }) {
      totalItems
      items {
        id
        title
        firstName
        lastName
        emailAddress
        phoneNumber
        createdAt
        updatedAt
      }
    }
  }
`;

// Mutation to create a customer (Vendure format)
const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      ... on Customer {
        id
        title
        firstName
        lastName
        emailAddress
        phoneNumber
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

// Mutation to update a customer (Vendure format)
const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      ... on Customer {
        id
        title
        firstName
        lastName
        emailAddress
        phoneNumber
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

// Mutation to delete a customer (Vendure format)
const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      result
      message
    }
  }
`;

export default function CustomerMutationExample() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
  });

  // Query hook
  const { data, loading, error, refetch } = useQuery(GET_CUSTOMERS);

  // Mutation hooks
  const [createCustomer, { loading: createLoading }] = useMutation(
    CREATE_CUSTOMER,
    {
      onCompleted: (data) => {
        const result = data.createCustomer;
        if (result.__typename === "Customer") {
          console.log("Customer created:", result);
          alert("Customer created successfully!");
          refetch();
          resetForm();
        } else {
          console.error("Error creating customer:", result);
          alert(`Error: ${result.message || result.errorCode}`);
        }
      },
      onError: (error) => {
        console.error("Error creating customer:", error);
        alert(`Error: ${error.message}`);
      },
    }
  );

  const [updateCustomer, { loading: updateLoading }] = useMutation(
    UPDATE_CUSTOMER,
    {
      onCompleted: (data) => {
        const result = data.updateCustomer;
        if (result.__typename === "Customer") {
          console.log("Customer updated:", result);
          alert("Customer updated successfully!");
          refetch();
          setSelectedCustomer(null);
          resetForm();
        } else {
          console.error("Error updating customer:", result);
          alert(`Error: ${result.message || result.errorCode}`);
        }
      },
      onError: (error) => {
        console.error("Error updating customer:", error);
        alert(`Error: ${error.message}`);
      },
    }
  );

  const [deleteCustomer, { loading: deleteLoading }] = useMutation(
    DELETE_CUSTOMER,
    {
      onCompleted: (data) => {
        console.log("Customer deleted:", data.deleteCustomer);
        alert("Customer deleted successfully!");
        refetch(); // Refresh the customer list
      },
      onError: (error) => {
        console.error("Error deleting customer:", error);
        alert(`Error: ${error.message}`);
      },
    }
  );

  // Helper functions
  const resetForm = () => {
    setFormData({
      title: "",
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Mutation handlers
  const handleCreateCustomer = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.emailAddress) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await createCustomer({
        variables: {
          input: {
            title: formData.title,
            firstName: formData.firstName,
            lastName: formData.lastName,
            emailAddress: formData.emailAddress,
            phoneNumber: formData.phoneNumber,
          },
        },
      });
    } catch (error) {
      console.error("Create customer error:", error);
    }
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();

    if (
      !selectedCustomer ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.emailAddress
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await updateCustomer({
        variables: {
          input: {
            id: selectedCustomer.id,
            title: formData.title,
            firstName: formData.firstName,
            lastName: formData.lastName,
            emailAddress: formData.emailAddress,
            phoneNumber: formData.phoneNumber,
          },
        },
      });
    } catch (error) {
      console.error("Update customer error:", error);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer({
          variables: { id: customerId },
        });
      } catch (error) {
        console.error("Delete customer error:", error);
      }
    }
  };

  const editCustomer = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      title: customer.title || "",
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      emailAddress: customer.emailAddress || "",
      phoneNumber: customer.phoneNumber || "",
    });
  };

  const cancelEdit = () => {
    setSelectedCustomer(null);
    resetForm();
  };

  if (loading) return <div className="p-6">Loading customers...</div>;
  if (error)
    return <div className="p-6 text-red-600">Error: {error.message}</div>;

  const customers = data?.customers?.items || [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Customer Management with GraphQL Mutations
      </h1>

      {/* Create/Edit Form */}
      <div className="rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {selectedCustomer ? "Edit Customer" : "Create New Customer"}
        </h2>

        <form
          onSubmit={
            selectedCustomer ? handleUpdateCustomer : handleCreateCustomer
          }
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={createLoading || updateLoading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 py-2 px-6 rounded-lg font-medium transition-colors"
            >
              {createLoading || updateLoading
                ? selectedCustomer
                  ? "Updating..."
                  : "Creating..."
                : selectedCustomer
                ? "Update Customer"
                : "Create Customer"}
            </button>

            {selectedCustomer && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 hover:bg-gray-600 py-2 px-6 rounded-lg font-medium transition-colors"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Customer List */}
      <div className="rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            Customer List ({customers.length})
          </h2>
        </div>

        <div className="p-6">
          {customers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No customers found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">
                      {customer.title} {customer.firstName} {customer.lastName}
                    </h3>
                    <span className="text-xs text-gray-500">
                      #{customer.id}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>📧 {customer.emailAddress}</p>
                    {customer.phoneNumber && <p>📞 {customer.phoneNumber}</p>}
                    <p>
                      📅 Created:{" "}
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => editCustomer(customer)}
                      className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCustomer(customer.id)}
                      disabled={deleteLoading}
                      className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 px-3 py-1 rounded text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

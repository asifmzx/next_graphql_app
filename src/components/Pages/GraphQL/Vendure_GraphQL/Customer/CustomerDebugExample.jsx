import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_CUSTOMERS = gql`
  {
    customers(options: { skip: 0, take: 6, sort: { id: ASC } }) {
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

const UPDATE_CUSTOMER_SIMPLE = gql`
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      ... on Customer {
        id
        firstName
        lastName
        emailAddress
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export default function CustomerDebugExample() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
  });

  const { data, loading, error, refetch } = useQuery(GET_CUSTOMERS);

  const [updateCustomer, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_CUSTOMER_SIMPLE, {
      onCompleted: (data) => {
        console.log("Raw mutation response:", data);
        const result = data.updateCustomer;

        if (result.__typename === "Customer") {
          alert("Customer updated successfully!");
          refetch();
          setSelectedCustomer(null);
          resetForm();
        } else {
          console.error("Update failed:", result);
          alert(`Update failed: ${result.message || result.errorCode}`);
        }
      },
      onError: (error) => {
        console.error("Mutation error:", error);
        console.error("Error details:", error.graphQLErrors);
        console.error("Network error:", error.networkError);
        alert(`Network/GraphQL Error: ${error.message}`);
      },
    });

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      emailAddress: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();

    if (!selectedCustomer) {
      alert("Please select a customer to update");
      return;
    }

    console.log("Updating customer with input:", {
      id: selectedCustomer.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailAddress: formData.emailAddress,
    });

    try {
      await updateCustomer({
        variables: {
          input: {
            id: selectedCustomer.id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            emailAddress: formData.emailAddress,
          },
        },
      });
    } catch (error) {
      console.error("Caught error in handleUpdateCustomer:", error);
    }
  };

  const selectCustomerForEdit = (customer) => {
    console.log("Selected customer for editing:", customer);
    setSelectedCustomer(customer);
    setFormData({
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      emailAddress: customer.emailAddress || "",
    });
  };

  if (loading) return <div className="p-6">Loading customers...</div>;
  if (error)
    return <div className="p-6 text-red-600">Query Error: {error.message}</div>;

  const customers = data?.customers?.items || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Customer Update Debug</h1>

      <div className="p-4 mb-6 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p>
          <strong>Selected Customer:</strong>{" "}
          {selectedCustomer
            ? `${selectedCustomer.firstName} ${selectedCustomer.lastName} (ID: ${selectedCustomer.id})`
            : "None"}
        </p>
        <p>
          <strong>Update Loading:</strong> {updateLoading ? "Yes" : "No"}
        </p>
        {updateError && (
          <p className="text-red-600">
            <strong>Update Error:</strong> {updateError.message}
          </p>
        )}
      </div>

      {selectedCustomer && (
        <div className="border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Update Customer: {selectedCustomer.firstName}{" "}
            {selectedCustomer.lastName}
          </h2>

          <form onSubmit={handleUpdateCustomer} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
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
                Last Name
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
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

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={updateLoading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 py-2 px-6 rounded-lg font-medium transition-colors"
              >
                {updateLoading ? "Updating..." : "Update Customer"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedCustomer(null);
                  resetForm();
                }}
                className="bg-gray-500 hover:bg-gray-600 py-2 px-6 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="border rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">
            Select Customer to Update ({customers.length})
          </h2>
        </div>

        <div className="p-4">
          {customers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No customers found</p>
          ) : (
            <div className="space-y-2">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    selectedCustomer?.id === customer.id
                      ? "border-blue-300"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => selectCustomerForEdit(customer)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">
                        {customer.firstName} {customer.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {customer.emailAddress}
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {customer.id}
                    </div>
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

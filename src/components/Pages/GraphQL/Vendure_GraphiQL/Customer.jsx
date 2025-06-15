import React from "react";
import { useQuery, gql } from "@apollo/client";
import { motion } from "framer-motion";

const QUERY = gql`
{
  customers(options: {skip: 0, take: 6, sort: {id: ASC}}) {
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

export default function Customer() {
    const { data, loading, error } = useQuery(QUERY);

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
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Customers</h2>
                <p>Total customers: {totalItems}</p>
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
                        className="rounded-xl shadow-md overflow-hidden border dark:border-red-500 hover:shadow-lg transition-all duration-300 bg-white"
                        variants={item}
                        whileHover={{
                            y: -5,
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
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
                                    <span>{new Date(customer.createdAt).toLocaleDateString()}</span>
                                </div>

                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="font-medium w-20">Updated:</span>
                                    <span>{new Date(customer.updatedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { motion } from "framer-motion";

const QUERY = gql`
{
  customers(options: {skip: 0, take: 3, sort: {id: ASC}}) {
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

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6"
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
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <div className="bg-white/40 p-6 flex flex-col items-center">
                        <div className="text-5xl mb-4">👤</div>
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {customer.firstName} {customer.lastName}
                            </h3>
                            <div className="flex justify-center space-x-3">
                                <span className="text-sm text-gray-600 bg-gray-100 rounded-full px-3 py-1">
                                    ID: {customer.id}
                                </span>
                                <span className="text-sm text-gray-600 bg-gray-100 rounded-full px-3 py-1">
                                    {customer.title}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
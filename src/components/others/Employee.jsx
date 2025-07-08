import DeleteButton from "../UI/Button/DeleteButton";
import { FaRegEdit } from "react-icons/fa";

const Employee = ({ employee }) => {
    const {
        first_name,
        last_name,
        email,
        phone,
        CV,
        degree,
        start_year,
        linkedin,
        source,
        prolang,
    } = employee;

    return (
        <tr className="text-center text-wrap mt-3">
            <td className="gap-4">{first_name}</td>
            <td className="gap-4">{last_name}</td>
            <td className="gap-4">{email}</td>
            <td className="text-center">{phone}</td>
            <td className="text-xs hidden md:block text-center text-align-middle hover:text-2xl max-w-[50px] ml-5">{CV}</td>
            <td className="text-center">{degree}</td>
            <td className="text-center">{start_year}</td>
            <td className="text-center">{linkedin}</td>
            <td className="text-center">{source}</td>
            <td className="text-center">{prolang}</td>
            <td>
                <FaRegEdit size={20} />
            </td>
            <td className="text-center">
                <DeleteButton />
            </td>
        </tr>
    );
};

export default Employee;
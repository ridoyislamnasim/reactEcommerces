import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useCatetory() {
    const [category, setCategory] = useState([]);
    // category data resived

    const categoryData = async () => {
        const categoryRes = await axios.get(`${process.env.REACT_APP_API}/admin/category`)
        if (categoryRes.data.success) {
            // toast.success(categoryRes.data.message);
            setCategory(
                categoryRes.data.data,
            );
        } else {
            // toast.error(categoryRes.data.errorMsg);
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await categoryData();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return category;
}
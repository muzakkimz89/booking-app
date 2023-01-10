import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
    //console.log(url);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                setData(res.data);
                console.log(res.data);
            } catch (err) {
                setError(err);
                console.log("masuk ke error");
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    const reFetch = async () => {
        setLoading(true);
        try {
        const res = await axios.get(url);
        setData(res.data);
        } catch (err) {
        setError(err);
        }
        setLoading(false);
    };

    return { data, loading, error, reFetch };
};

// const useFetch = () => {
//     const [data, setData] = useState(null);
  
//     useEffect(() => {
//       fetch("localhost:8000/api/hotels/countByCity?cities=berlin,madrid,london")
//         .then(response => response.json())
//         .then(data => setData(data))
//         .then(console.log(data))
//         .catch(error => console.error(error));
//     }, []);
// }

export default useFetch;
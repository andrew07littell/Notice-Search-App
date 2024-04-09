import { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../utils/db";

const useNotices = ({
  setNotices,
  searchTerm,
  filterDate,
  currentPage,
  pageSize = 10,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNotices = async () => {
    setLoading(true);
    setError(null);
    try {
      const noticesRef = collection(db, "notices");
      let q = query(noticesRef, orderBy("publicationDate", "desc"));

      if (searchTerm) {
        q = query(q, where("title", ">=", searchTerm));
        q = query(q, where("title", "<=", searchTerm + "\uf8ff"));
      }

      if (filterDate && filterDate.toString() !== "Invalid Date") {
        const nextDate = new Date(filterDate);
        nextDate.setDate(filterDate.getDate() + 1);
        q = query(q, where("publicationDate", ">=", filterDate));
        q = query(q, where("publicationDate", "<", nextDate));
      }

      const querySnapshot = await getDocs(q);
      const fetchedNotices = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotices(
        fetchedNotices.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )
      );
      setTotalPages(Math.ceil(fetchedNotices.length / pageSize));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [searchTerm, filterDate, currentPage, pageSize, setNotices]);

  return { loading, error, totalPages, refreshNotices: fetchNotices };
};

export default useNotices;

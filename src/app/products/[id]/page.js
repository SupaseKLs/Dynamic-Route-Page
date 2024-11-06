"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const getData = async () => {
  const res = await fetch("/data/muchmedia.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        {products.map((product) => (
          <div key={product.id}>
            
            <Link href={`/products/${product.id}`}>
              <img
                src={product.banner}  
                alt={product.title.title1}
                
              />
            </Link>
            <h2>{product.title.title1}</h2>
            <p>{product.title.title2}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

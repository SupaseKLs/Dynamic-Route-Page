"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import CategoryFilter from "../components/Categories/page";
import { useEffect, useState } from "react";
import ReadmoreBtn from '../components/readmoreBtn/page';
import Image from "next/image";

// Fetch data from JSON file
const getData = async () => {
    const res = await fetch("/data/muchmedia.json");

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data;
};

export default function Home() {
    const categories = ["All", "Front-End", "Back-End"];
    const items = [
        { id: 1, title: "AI in Tech", category: "Front-End" },
        { id: 2, title: "Healthcare Trends", category: "Back-End" },
        { id: 3, title: "gogo Trends", category: "Front-End" },
        { id: 4, title: "Run Trends", category: "Back-End" },
    ];

    const [activeCategory, setActiveCategory] = useState("All");

    const filteredItems =
        activeCategory === "All"
            ? items
            : items.filter((item) => item.category === activeCategory);

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
        <>
            <div className="">
                <div className="relative w-full h-screen">
                    <Image
                        src="/bannerWeb.png"
                        alt="Banner"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#040404] to-transparent" />
            </div>

            <div className="w-11/12 mx-auto">
                <div className="pt-40 h-full w-10/12">
                    <p className="text-white text-3xl">
                        At MuchMedia, we pride ourselves on delivering creative websites that prioritize user interaction. Our team collaborates closely with clients to understand their vision and goals, ensuring user-friendly interfaces and effective functionality.
                    </p>
                </div>
                <div className="pb-8">
                    <h1 className="text-2xl font-bold mb-4">Filterable Items</h1>
                    <CategoryFilter
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />
                </div>
            </div>

            <div className="w-11/12 mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <div key={product.id}>
                                {/* Link to the product details page based on the product ID */}
                                <Link href={`/products/${product.id}`}>
                                    <img
                                        src={product.banner}
                                        alt={product.title.title1}
                                        width={500} height={550}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="w-11/12 mx-auto h-full">
                <div>
                    <h1>Our Works</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="rounded-sm w-full flex flex-col justify-center items-start pl-10 h-60 bg-[#222222] mr-2">
                        <h1 className="text-3xl text-white pb-2">Graphic Design</h1>
                        <ReadmoreBtn />
                    </div>
                    <div className="rounded-sm w-full flex flex-col justify-center items-start pl-10 h-60 bg-[#222222] mr-2">
                        <h1 className="text-3xl text-white pb-2">Production</h1>
                        <ReadmoreBtn />
                    </div>
                    <div className="rounded-sm w-full flex flex-col justify-center items-start pl-10 h-60 bg-[#222222] mr-2">
                        <h1 className="text-3xl text-white pb-2">Drawing</h1>
                        <ReadmoreBtn />
                    </div>
                </div>
            </div>
        </>
    );
}

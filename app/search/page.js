"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ProductGrid } from "../componenets/ProductGrid";
import { Pagination } from "../componenets/Pagination";
import { TopBar } from "../componenets/topbar";
import { FilterSidebar } from "../componenets/FilterSidebar";
import Footer from "../componenets/footer";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const router = useRouter();
  const [filters, setFilters] = useState({
    minRating: 0,
    minPrice: 0,
    maxPrice: 10000,
    size: ""
  });
  const filtersRef = useRef(filters);

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchSearchResults = async (desiredPage = page) => {
    setLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/products/search-filter?keyword=${encodeURIComponent(
        keyword
      )}&minPrice=${filtersRef.current.minPrice}&maxPrice=${
        filtersRef.current.maxPrice
      }&minRating=${filtersRef.current.minRating}&size=${encodeURIComponent(
        filtersRef.current.size
      )}&page=${desiredPage}&limit=9`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
        setTotalPages(Math.ceil(data.totalCount / 9));
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    fetchSearchResults();
  }, [keyword, page]);

  useEffect(() => {
    const timer = setTimeout(() => {

    }, 300);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      const unchanged =
        updated.minRating === prev.minRating &&
        updated.minPrice === prev.minPrice &&
        updated.maxPrice === prev.maxPrice &&
        updated.size === prev.size;
      return unchanged ? prev : updated;
    });
  };

  const handleApplyFilters = () => {
    setFilters(filtersRef.current);
    fetchSearchResults();
  };

  const handleClearFilters = () => {
    setFilters({ minRating: 0, minPrice: 0, maxPrice: 10000, size: "" });
    fetchSearchResults();
    setPage(1);
  };

  if (products.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-[#191919] max-w-auto">
        <TopBar />
        <div className="max-w-7xl mx-auto md:py-40 py-24 container overflow-x-hidden">
          <button
            onClick={() => router.back()}
            className="pr-2 py-2 text-sm text-white rounded-lg flex items-center gap-2 mb-20 ml-6 md:mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4 sm:h-6 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex px-4">
            <div>
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
              />
            </div>
  
            <div className="flex-1 flex flex-col items-center justify-center">
              <svg
                className="h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h1 className="text-3xl font-bold mb-2 text-white">
                No products found
              </h1>
              <p className="text-gray-400">
                Try adjusting your filters or search criteria
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#191919] overflow-x-hidden">
      <TopBar />
      <div className="container mx-auto px-4 sm:py-40 py-20 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row lg:gap-8 max-w-7xl">
          <div className="lg:block">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
            {loading ? (
              <div className="flex justify-center content-center pt-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-200" />
              </div>
            ) : (
              <>
                  <div className="flex md:gap-4 gap-2">
                  <button
                    onClick={() => router.back()}
                    className="pr-2 py-2 text-sm text-white rounded-lg flex items-center gap-2"
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-4 sm:h-6 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                <h1 className="sm:text-2xl text-xl font-bold text-white container mx-auto">
                  Search Results for "{keyword}"
                </h1>
                </div>
                <div className="pt-4">
                <ProductGrid products={products} />
                  </div>
              </>
            )}
            <hr className="my-6 border-[#FFFFFF1A] sm:mx-auto mt-10" />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
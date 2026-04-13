import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 20];

const ManagePagination = ({ meta }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentPage = Number(meta?.page);
    const totalPage = Number(meta?.totalPage);
    const limit = Number(meta?.limit) || 8;
    const totalItems = Number(meta?.total) || totalPage * limit;

    const from = (currentPage - 1) * limit + 1;
    const to = Math.min(currentPage * limit, totalItems);

    const updatePage = (page) => {
        if (page < 1 || page > totalPage) return;
        const params = new URLSearchParams(location.search);
        params.set("page", page.toString());
        params.set("limit", limit.toString());
        navigate(`?${params.toString()}`);
    };

    const updateLimit = (newLimit) => {
        const params = new URLSearchParams(location.search);
        params.set("page", "1");
        params.set("limit", newLimit.toString());
        navigate(`?${params.toString()}`);
    };

    if (!totalPage) return null;

    return (
        <div className="flex items-center justify-end w-full px-4 py-2 text-sm text-gray-600">
            {/* Rows per page */}
            <div className="flex items-center gap-2 mr-6">
                <span className="whitespace-nowrap">Rows per page:</span>
                <select
                    value={limit}
                    onChange={(e) => updateLimit(Number(e.target.value))}
                    className="border-0 bg-transparent text-sm text-gray-700 cursor-pointer focus:outline-none pr-1"
                >
                    {ROWS_PER_PAGE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>

            {/* Range display */}
            <span className="mr-4 whitespace-nowrap">
                {from}–{to} of {totalItems}
            </span>

            {/* Prev */}
            <button
                disabled={currentPage === 1}
                onClick={() => updatePage(currentPage - 1)}
                className="p-1 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Previous page"
            >
                <IoIosArrowBack size={20} />
            </button>

            {/* Next */}
            <button
                disabled={currentPage === totalPage}
                onClick={() => updatePage(currentPage + 1)}
                className="p-1 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Next page"
            >
                <IoIosArrowForward size={20} />
            </button>
        </div>
    );
};

export default ManagePagination;
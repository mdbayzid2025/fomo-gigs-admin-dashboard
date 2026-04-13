// components/Shared/SearchInput.jsx
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TextField, InputAdornment } from "@mui/material";

export default function SearchInput({
    placeholder = "Search...",
    onSearch,
    width = 300,
    height = 40,
    sx,
}) {
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        setSearchInput(e.target.value);
        onSearch?.(e.target.value); // ✅ calls parent handler if provided
    };

    return (
        <TextField
            sx={{
                width,
                height,
                "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "20px",
                },
                ...sx,
            }}
            placeholder={placeholder}
            value={searchInput}
            onChange={handleChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <FaSearch />
                    </InputAdornment>
                ),
            }}
        />
    );
}
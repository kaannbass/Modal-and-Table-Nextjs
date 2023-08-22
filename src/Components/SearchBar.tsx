import React from 'react';
import TextField from '@mui/material/TextField';

interface SearchBarProps {
    onSearch: (searchText: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value;
        onSearch(searchText);
    };

    return (
        <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={handleInputChange}
        />
    );
}

/* eslint-disable react-refresh/only-export-components */

// frontend/src/contexts/FullsizeImageContent.jsx

// imports
import { createContext, useState, useContext } from "react";

const FullsizeImageContext = createContext();

function FullsizeImageProvider({ children }) {
    const [openFullImage, setOpenFullImage] = useState(null);

    function openImage(imageUrl) {
        setOpenFullImage(imageUrl);
    }

    function closeImage() {
        setOpenFullImage(null);
    }

    return (
        <FullsizeImageContext.Provider
            value={{ openFullImage, openImage, closeImage }}
        >
            {children}
        </FullsizeImageContext.Provider>
    );
}

function useFullsizeImage() {
    const context = useContext(FullsizeImageContext);
    
    if (!context) {
        throw new Error('useFullsizeImage must be used within FullsizeImageProvider');
    }
    
    return context;
}

export { FullsizeImageProvider, useFullsizeImage };
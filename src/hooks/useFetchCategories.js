import React, { useEffect, useState } from 'react';
import apiClient from '../api_services/api-client';

let categoriesCache = null;
let categoriesRequest = null;

try {
    categoriesCache = JSON.parse(sessionStorage.getItem('categories-cache') || 'null');
} catch {
    categoriesCache = null;
}

const useFetchCategories = () => {
    const [categories, setCategories] = useState(categoriesCache || []);

    useEffect(() => {
        if (categoriesCache) return;

        if (!categoriesRequest) {
            categoriesRequest = apiClient.get('/categories/')
                .then((res) => {
                    categoriesCache = res.data;
                    sessionStorage.setItem('categories-cache', JSON.stringify(categoriesCache));
                    return categoriesCache;
                })
                .finally(() => {
                    categoriesRequest = null;
                });
        }

        categoriesRequest.then(setCategories);
    }, []);

    return categories;
};

export default useFetchCategories;
const API_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => localStorage.getItem('token');

// Helper function to make authenticated requests
const authFetch = async (url, options = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Request failed');
    }

    return response.json();
};

// Auth API
export const authAPI = {
    register: async (email, password, name) => {
        const data = await authFetch(`${API_URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
        });
        localStorage.setItem('token', data.token);
        return data;
    },

    login: async (email, password) => {
        const data = await authFetch(`${API_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        localStorage.setItem('token', data.token);
        return data;
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getMe: async () => {
        return authFetch(`${API_URL}/auth/me`);
    },

    updateProfile: async (profileData) => {
        return authFetch(`${API_URL}/auth/profile`, {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
    },
};

// Products API
export const productsAPI = {
    getAll: async (category) => {
        const url = category ? `${API_URL}/products?category=${category}` : `${API_URL}/products`;
        return authFetch(url, { method: 'GET' });
    },

    getById: async (id) => {
        return authFetch(`${API_URL}/products/${id}`, { method: 'GET' });
    },

    create: async (productData) => {
        return authFetch(`${API_URL}/products`, {
            method: 'POST',
            body: JSON.stringify(productData),
        });
    },

    update: async (id, productData) => {
        return authFetch(`${API_URL}/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData),
        });
    },

    delete: async (id) => {
        return authFetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
    },
};

// Orders API
export const ordersAPI = {
    create: async (items, totalAmount) => {
        return authFetch(`${API_URL}/orders`, {
            method: 'POST',
            body: JSON.stringify({ items, totalAmount }),
        });
    },

    getUserOrders: async () => {
        return authFetch(`${API_URL}/orders`, { method: 'GET' });
    },

    getById: async (id) => {
        return authFetch(`${API_URL}/orders/${id}`, { method: 'GET' });
    },
};

// Virtual Try-On API
export const tryonAPI = {
    create: async (personImage, garmentImage) => {
        const formData = new FormData();
        formData.append('personImage', personImage);
        formData.append('garmentImage', garmentImage);

        const token = getToken();
        const response = await fetch(`${API_URL}/tryon`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Try-on request failed');
        }

        return response.json();
    },

    getById: async (id) => {
        return authFetch(`${API_URL}/tryon/${id}`, { method: 'GET' });
    },

    getUserHistory: async () => {
        return authFetch(`${API_URL}/tryon/user/history`, { method: 'GET' });
    },
};

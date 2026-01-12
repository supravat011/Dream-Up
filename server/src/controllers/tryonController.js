import TryOnRequest from '../models/TryOnRequest.js';

export const createTryOnRequest = (req, res) => {
    try {
        if (!req.files || !req.files.personImage || !req.files.garmentImage) {
            return res.status(400).json({ error: 'Both person and garment images are required' });
        }

        const personImageUrl = `/uploads/${req.files.personImage[0].filename}`;
        const garmentImageUrl = `/uploads/${req.files.garmentImage[0].filename}`;

        const requestId = TryOnRequest.create(req.userId, personImageUrl, garmentImageUrl);

        // In a real implementation, you would:
        // 1. Call the Gemini API or another AI service
        // 2. Process the images
        // 3. Update the request with the result

        // For now, we'll just return the request
        const tryOnRequest = TryOnRequest.findById(requestId);
        res.status(201).json(tryOnRequest);
    } catch (error) {
        console.error('Create try-on request error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getTryOnRequest = (req, res) => {
    try {
        const tryOnRequest = TryOnRequest.findById(req.params.id);
        if (!tryOnRequest) {
            return res.status(404).json({ error: 'Try-on request not found' });
        }
        res.json(tryOnRequest);
    } catch (error) {
        console.error('Get try-on request error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getUserTryOnRequests = (req, res) => {
    try {
        const requests = TryOnRequest.findByUserId(req.userId);
        res.json(requests);
    } catch (error) {
        console.error('Get user try-on requests error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

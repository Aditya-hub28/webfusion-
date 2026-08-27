import mockDb from './mockDb';

// Custom Mock Axios Instance
const api = {
    interceptors: {
        request: { use: () => {} },
        response: { use: () => {} }
    },
    
    get: async (url, config) => {
        console.log(`Mock GET: ${url}`);
        const parsedUrl = new URL(url, 'http://localhost');
        const path = parsedUrl.pathname;
        const params = Object.fromEntries(parsedUrl.searchParams.entries());
        const currentUser = mockDb.getCurrentUser();
        
        let responseData = null;
        
        if (path === '/users/current-user') {
            responseData = currentUser;
        } else if (path === '/items/my-items') {
            responseData = { items: mockDb.getMyItems() };
        } else if (path === '/items/recommendations') {
            responseData = mockDb.getItems().filter(item => item.owner._id !== currentUser?._id);
        } else if (path === '/items' || path === '/items/') {
            responseData = { items: mockDb.getItems(params) };
        } else if (path.startsWith('/items/')) {
            const id = path.split('/')[2];
            responseData = mockDb.getItem(id);
        } else if (path === '/lost-found/my-posts') {
            responseData = mockDb.getLostFound().filter(p => p.reporter._id === currentUser?._id);
        } else if (path === '/lost-found/claims/sent') {
            responseData = mockDb.getClaims().filter(c => c.claimant._id === currentUser?._id);
        } else if (path === '/lost-found/claims/received') {
            responseData = mockDb.getClaims().filter(c => c.postReporter._id === currentUser?._id);
        } else if (path === '/lost-found' || path === '/lost-found/') {
            responseData = mockDb.getLostFound();
        } else if (path.startsWith('/lost-found/') && path.endsWith('/claims')) {
            const id = path.split('/')[2];
            responseData = mockDb.getClaims().filter(c => c.postId === id);
        } else if (path.startsWith('/lost-found/')) {
            const id = path.split('/')[2];
            const post = mockDb.getLostFound().find(p => p._id === id);
            responseData = { post, isOwner: post?.reporter?._id === currentUser?._id };
        } else if (path === '/wanted-items/my-posts') {
            responseData = mockDb.getWantedItems().filter(w => w.reporter._id === currentUser?._id);
        } else if (path === '/wanted-items/my-offers') {
            responseData = [];
        } else if (path === '/wanted-items/offers-received') {
            responseData = { offersReceived: [] };
        } else if (path === '/wanted-items' || path === '/wanted-items/') {
            responseData = mockDb.getWantedItems();
        } else if (path.startsWith('/wanted-items/')) {
            const id = path.split('/')[2];
            responseData = mockDb.getWantedItems().find(w => w._id === id);
        } else if (path === '/transactions' || path === '/transactions/') {
            responseData = mockDb.getTransactions();
        } else if (path.startsWith('/transactions/')) {
            const id = path.split('/')[2];
            responseData = mockDb.getTransaction(id);
        } else if (path === '/notifications' || path === '/notifications/') {
            responseData = mockDb.getData('sb_notifications');
        } else {
            console.warn(`Mock GET unhandled path: ${path}`);
            responseData = [];
        }
        
        return { data: { success: true, data: responseData } };
    },
    
    post: async (url, data, config) => {
        console.log(`Mock POST: ${url}`, data);
        const parsedUrl = new URL(url, 'http://localhost');
        const path = parsedUrl.pathname;
        let responseData = null;
        
        if (path === '/users/login') {
            responseData = mockDb.login(data.email, data.password);
        } else if (path === '/users/register') {
            responseData = mockDb.register(data);
        } else if (path === '/users/logout') {
            mockDb.logout();
            responseData = { success: true };
        } else if (path === '/items' || path === '/items/') {
            // handle Formdata if needed
            let payload = data;
            if (data instanceof FormData) {
                payload = Object.fromEntries(data.entries());
            }
            responseData = mockDb.createItem(payload);
        } else if (path === '/lost-found' || path === '/lost-found/') {
            let payload = data;
            if (data instanceof FormData) {
                payload = Object.fromEntries(data.entries());
            }
            responseData = mockDb.createLostFoundPost(payload);
        } else if (path.startsWith('/lost-found/') && path.endsWith('/claim')) {
            const postId = path.split('/')[2];
            responseData = mockDb.createClaim(postId, data);
        } else if (path.startsWith('/lost-found/claims/') && path.endsWith('/submit-verification')) {
            const claimId = path.split('/')[3];
            responseData = mockDb.updateClaimStatus(claimId, 'pending', { answers: data.answers });
        } else if (path.startsWith('/lost-found/claims/') && path.endsWith('/propose-meetup')) {
            const claimId = path.split('/')[3];
            responseData = mockDb.updateClaimStatus(claimId, 'approved', { meetupDetails: data });
        } else if (path === '/wanted-items' || path === '/wanted-items/') {
            let payload = data;
            if (data instanceof FormData) {
                payload = Object.fromEntries(data.entries());
            }
            responseData = mockDb.createWantedItem(payload);
        } else if (path === '/transactions' || path === '/transactions/') {
            responseData = mockDb.createTransaction(data);
        } else if (path.startsWith('/transactions/') && path.endsWith('/messages')) {
            const id = path.split('/')[2];
            responseData = mockDb.sendMessage(id, data.text);
        } else {
            console.warn(`Mock POST unhandled path: ${path}`);
        }
        
        return { data: { success: true, data: responseData } };
    },
    
    patch: async (url, data, config) => {
        console.log(`Mock PATCH: ${url}`, data);
        const parsedUrl = new URL(url, 'http://localhost');
        const path = parsedUrl.pathname;
        let responseData = null;
        
        if (path.startsWith('/items/') && path.endsWith('/availability')) {
            const id = path.split('/')[2];
            responseData = mockDb.toggleItemAvailability(id);
        } else if (path.startsWith('/items/')) {
            const id = path.split('/')[2];
            responseData = mockDb.updateItem(id, data);
        } else if (path.startsWith('/lost-found/claims/') && path.endsWith('/start-verification')) {
            const claimId = path.split('/')[4];
            responseData = mockDb.updateClaimStatus(claimId, 'verifying');
        } else if (path.startsWith('/lost-found/claims/') && path.endsWith('/verify')) {
            const claimId = path.split('/')[4];
            responseData = mockDb.updateClaimStatus(claimId, 'approved');
        } else if (path.startsWith('/lost-found/claims/') && path.endsWith('/reject')) {
            const claimId = path.split('/')[4];
            responseData = mockDb.updateClaimStatus(claimId, 'rejected', { reason: data?.reason });
        } else if (path.startsWith('/lost-found/claims/') && path.endsWith('/accept-meetup')) {
            const claimId = path.split('/')[4];
            responseData = mockDb.updateClaimStatus(claimId, 'completed');
        } else if (path.startsWith('/lost-found/') && path.includes('/resolve/')) {
            const parts = path.split('/');
            const postId = parts[2];
            const claimId = parts[4];
            mockDb.updateClaimStatus(claimId, 'completed');
            responseData = mockDb.updateItem(postId, { resolved: true });
        } else if (path.startsWith('/lost-found/') && path.endsWith('/resolve')) {
            const id = path.split('/')[2];
            responseData = mockDb.updateItem(id, { resolved: true });
        } else if (path.startsWith('/transactions/')) {
            const id = path.split('/')[2];
            responseData = mockDb.updateTransactionStatus(id, data.status, data.dispute);
        } else {
            console.warn(`Mock PATCH unhandled path: ${path}`);
        }
        
        return { data: { success: true, data: responseData } };
    },
    
    put: async (url, data, config) => {
        console.log(`Mock PUT: ${url}`, data);
        const parsedUrl = new URL(url, 'http://localhost');
        const path = parsedUrl.pathname;
        let responseData = null;
        
        if (path.startsWith('/lost-found/')) {
            const id = path.split('/')[2];
            let payload = data;
            if (data instanceof FormData) {
                payload = Object.fromEntries(data.entries());
            }
            // Simple mock update
            const lf = mockDb.getData('sb_lost_found');
            const idx = lf.findIndex(p => p._id === id);
            if (idx !== -1) {
                lf[idx] = { ...lf[idx], ...payload };
                mockDb.setData('sb_lost_found', lf);
                responseData = lf[idx];
            }
        } else {
            console.warn(`Mock PUT unhandled path: ${path}`);
        }
        
        return { data: { success: true, data: responseData } };
    },
    
    delete: async (url, config) => {
        console.log(`Mock DELETE: ${url}`);
        const parsedUrl = new URL(url, 'http://localhost');
        const path = parsedUrl.pathname;
        
        if (path.startsWith('/items/')) {
            const id = path.split('/')[2];
            mockDb.deleteItem(id);
        } else if (path.startsWith('/lost-found/')) {
            const id = path.split('/')[2];
            let lf = mockDb.getData('sb_lost_found');
            lf = lf.filter(p => p._id !== id);
            mockDb.setData('sb_lost_found', lf);
        }
        
        return { data: { success: true, data: null } };
    }
};

export default api;

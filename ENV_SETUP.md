# Environment Setup

## Create .env file

Create a `.env` file in the `elder-care-frontend` directory with the following content:

```
API_BASE_URL=http://localhost:8000
```

## What this does:

-API_BASE_URL`: Points to your backend API server
- The default fallback is `http://localhost:8000` if the environment variable is not set
- This ensures your frontend can communicate with your backend API

## File location:
```
elder-care-frontend/
├── .env  ← Create this file
├── src/
├── package.json
└── ...
```

## After creating the .env file:
1. Restart your development server
2. The API calls should now work correctly
3. You should see the correct URL in the network requests (e.g., `http://localhost:8000/api/auth/login`) 
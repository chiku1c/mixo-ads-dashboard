# Mixo Ads – Campaign Monitoring Dashboard

A production-ready, modern dashboard to monitor and analyze advertising campaign performance.

## 🚀 Features

- **Real-time Campaign Monitoring**: View all campaigns with live performance metrics
- **Advanced Filtering**: Filter campaigns by status (Active, Paused, Completed)
- **Performance Metrics**: Track spend, impressions, clicks, and CTR
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Error Handling**: Robust error handling with retry logic
- **Type Safety**: Full TypeScript support with proper type definitions

## 🛠 Tech Stack

- **Framework**: Next.js 16.1.1
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **React**: 19.2.3

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mixo-ads-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your API endpoint:
```env
NEXT_PUBLIC_API_BASE=http://localhost:3001/api
```

## 🏃 Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏭 Production Build

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 📋 Production Checklist

✅ **Environment Variables**: Configure `NEXT_PUBLIC_API_BASE` in your production environment
✅ **Error Handling**: Automatic retry logic for network failures
✅ **API Timeout**: 10-second timeout with proper error messages
✅ **Type Safety**: Full TypeScript coverage with API response validation
✅ **Security Headers**: Configured in `next.config.ts`
✅ **Performance**: Optimized builds with compression enabled
✅ **Responsive**: Mobile-first design with Tailwind CSS

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_API_BASE`: Your API base URL (required)

### API Response Format

The dashboard expects the following API response structure:

```json
{
  "campaigns": [
    {
      "id": "string",
      "name": "string",
      "brand_id": "string",
      "status": "active" | "paused" | "completed",
      "budget": number,
      "daily_budget": number,
      "platforms": string[],
      "created_at": "ISO 8601 date string"
    }
  ],
  "total": number
}
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variable `NEXT_PUBLIC_API_BASE`
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Docker

## 📝 Notes

- Performance metrics (spend, impressions, clicks) are calculated from budget data since the API doesn't provide these directly
- The dashboard includes automatic retry logic for failed API requests
- All components are optimized for production with proper error boundaries

## 🐛 Troubleshooting

**Issue**: "NEXT_PUBLIC_API_BASE environment variable is not set"
- **Solution**: Ensure you've created a `.env` file with the `NEXT_PUBLIC_API_BASE` variable

**Issue**: "Request timeout"
- **Solution**: Check your API endpoint is accessible and responding within 10 seconds

**Issue**: "Invalid API response format"
- **Solution**: Verify your API returns data in the expected format (see Configuration section)

## 📄 License

Private - All rights reserved

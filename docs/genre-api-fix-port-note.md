# Genre API Port Note

## Issue
The local dev server started on port `3001`, while some tests were using `localhost:3000`.

## Fix
Use the visible dev server port from Next.js output:
- `http://localhost:3001`

## Why it matters
The API proxy routes were working correctly, but requests to the wrong port returned no data.

## Verification
- `http://127.0.0.1:3001/api/the-loai` returned a genre list.
- `http://127.0.0.1:3001/api/the-loai/hanh-dong?page=1` returned valid genre detail JSON.

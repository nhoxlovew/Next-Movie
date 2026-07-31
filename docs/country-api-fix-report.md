# Country API Fix Report

## Issue
The country list API proxy returned an empty array even though the upstream endpoint returned valid data.

## Cause
The proxy expected `data.items`, but the upstream response from `https://phimapi.com/quoc-gia` returns an object where the items live under `data.data.items`.

## Fix
Updated `src/app/api/quoc-gia/route.ts` to return:
- `data` if it's already an array
- `data.data.items` if the upstream uses nested data
- `data.items` as a fallback

## Result
The local endpoint `http://127.0.0.1:3001/api/quoc-gia` now returns the expected country list.

## Verification
- `https://phimapi.com/quoc-gia` returns a `data.data.items` payload.
- The local proxy now maps that correctly.

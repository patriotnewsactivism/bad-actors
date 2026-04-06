// Database connections are now handled server-side via /api/ routes.
// This file is kept for backwards compatibility but Supabase is no longer used.
// Email subscribers are stored in Neon (PostgreSQL) via Vercel serverless functions.

export const supabase = null;

export const isSupabaseConfigured = (): boolean => false;

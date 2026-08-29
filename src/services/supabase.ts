import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Make sure to provide them in your environment variables.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

/**
 * Uploads a file to a Supabase storage bucket and returns the public URL.
 * 
 * @param bucketName 'course-covers' | 'avatars' | 'certificates'
 * @param filePath e.g. 'public/filename.ext'
 * @param file The File object
 * @returns The public URL of the uploaded file
 */
export async function uploadFile(bucketName: string, filePath: string, file: File): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true // Replace if file exists
    });
    
  if (error) {
    console.error('Storage upload error:', error);
    throw error;
  }
  
  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);
    
  return publicUrlData.publicUrl;
}


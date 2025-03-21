
import { supabase } from '@/integrations/supabase/client';

export interface SecurityScan {
  id?: string;
  created_at?: string;
  user_id?: string;
  scan_type: 'quick' | 'full' | 'custom';
  status: 'completed' | 'in_progress' | 'failed';
  files_scanned: number;
  threats_found: number;
  duration_seconds: number;
  device_info?: string;
}

// Create a type-safe function for security_scans table
export const saveScanResult = async (scanData: SecurityScan) => {
  try {
    // Force TypeScript to ignore the table type check
    const { data, error } = await supabase
      .from('security_scans' as any)
      .insert(scanData as any)
      .select()
      .single();
      
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving scan result:', error);
    return { success: false, error };
  }
};

export const getRecentScans = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('security_scans' as any)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching recent scans:', error);
    return { success: false, error, data: [] };
  }
};

export const getTotalThreats = async () => {
  try {
    const { data, error } = await supabase
      .from('security_scans' as any)
      .select('threats_found')
      .eq('status', 'completed');
      
    if (error) throw error;
    
    // Make sure we handle the data correctly
    const totalThreats = data.reduce((sum: number, scan: any) => sum + (scan.threats_found || 0), 0);
    return { success: true, totalThreats };
  } catch (error) {
    console.error('Error calculating total threats:', error);
    return { success: false, error, totalThreats: 0 };
  }
};

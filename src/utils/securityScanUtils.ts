
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

export const saveScanResult = async (scanData: SecurityScan) => {
  try {
    const { data, error } = await supabase
      .from('security_scans')
      .insert(scanData)
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
      .from('security_scans')
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
      .from('security_scans')
      .select('threats_found')
      .eq('status', 'completed');
      
    if (error) throw error;
    
    const totalThreats = data.reduce((sum, scan) => sum + (scan.threats_found || 0), 0);
    return { success: true, totalThreats };
  } catch (error) {
    console.error('Error calculating total threats:', error);
    return { success: false, error, totalThreats: 0 };
  }
};

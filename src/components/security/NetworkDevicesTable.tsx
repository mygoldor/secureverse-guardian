
import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface NetworkDevice {
  ip: string;
  mac: string;
  status?: string;
  blocked?: boolean;
}

interface NetworkDevicesTableProps {
  devices: NetworkDevice[];
  onBlockIP?: (ip: string) => void;
}

const NetworkDevicesTable: React.FC<NetworkDevicesTableProps> = ({ devices, onBlockIP }) => {
  const { t } = useLanguage();

  if (devices.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('ip_address') || 'IP'}</TableHead>
            <TableHead>{t('mac_address') || 'MAC'}</TableHead>
            <TableHead>{t('status')}</TableHead>
            {onBlockIP && <TableHead>{t('actions')}</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device, index) => (
            <TableRow key={index} className={device.status === 'Suspicious' ? 'bg-red-50' : ''}>
              <TableCell>{device.ip}</TableCell>
              <TableCell>{device.mac}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {device.status === 'Suspicious' ? (
                    <>
                      <AlertTriangle className="h-4 w-4 text-red-600 mr-1" />
                      <span className="text-red-600">{t('suspicious')}</span>
                    </>
                  ) : device.blocked ? (
                    <span className="text-orange-600">{t('blocked')}</span>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 text-green-600 mr-1" />
                      <span>{t('normal')}</span>
                    </>
                  )}
                </div>
              </TableCell>
              {onBlockIP && (
                <TableCell>
                  {!device.blocked && (
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => onBlockIP(device.ip)}
                      disabled={device.blocked}
                    >
                      {t('block_ip')}
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default NetworkDevicesTable;

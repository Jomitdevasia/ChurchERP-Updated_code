import { exportToExcel, exportToPDF, exportToCSV } from '../utils/exportHelpers';

export const useExport = () => {
  const exportData = async (data, columns, title, format, filename) => {
    try {
      let result;
      
      switch (format) {
        case 'excel':
          result = await exportToExcel(data, columns, filename);
          break;
        case 'pdf':
          result = exportToPDF(data, columns, title, filename);
          break;
        case 'csv':
          result = exportToCSV(data, columns, filename);
          break;
        default:
          throw new Error('Unsupported format');
      }
      
      if (result.success) {
        return { success: true };
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Export failed:', error);
      return { success: false, error: error.message };
    }
  };
  
  return { exportData };
};
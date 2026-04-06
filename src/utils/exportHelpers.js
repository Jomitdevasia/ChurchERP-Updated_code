import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Safe Excel export using exceljs
export const exportToExcel = async (data, columns, filename = 'export') => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    
    // Add headers
    const headerRow = worksheet.addRow(columns.map(col => col.title));
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD4AF37' }
    };
    
    // Add data
    data.forEach(item => {
      const row = columns.map(col => {
        if (col.render) {
          return col.render(item[col.key], item);
        }
        return item[col.key] || '';
      });
      worksheet.addRow(row);
    });
    
    // Style columns
    worksheet.columns.forEach(column => {
      column.width = 15;
    });
    
    // Generate file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${filename}.xlsx`);
    
    return { success: true };
  } catch (error) {
    console.error('Export failed:', error);
    return { success: false, error: error.message };
  }
};

// Safe PDF export using jspdf
export const exportToPDF = (data, columns, title, filename = 'export') => {
  try {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.setTextColor(139, 69, 19);
    doc.text(title, 14, 20);
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    const date = new Date().toLocaleDateString();
    doc.text(`Generated: ${date}`, 14, 30);
    
    // Prepare table data
    const tableData = data.map(item => 
      columns.map(col => {
        let value = item[col.key];
        if (col.render && typeof col.render === 'function') {
          const rendered = col.render(value, item);
          // Strip HTML tags if any
          if (typeof rendered === 'string') {
            value = rendered.replace(/<[^>]*>/g, '');
          } else {
            value = rendered;
          }
        }
        return String(value || '');
      })
    );
    
    // Add table
    doc.autoTable({
      head: [columns.map(col => col.title)],
      body: tableData,
      startY: 40,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        lineColor: [200, 200, 200],
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: [212, 175, 55],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { top: 40 }
    });
    
    // Save file
    doc.save(`${filename}.pdf`);
    
    return { success: true };
  } catch (error) {
    console.error('Export failed:', error);
    return { success: false, error: error.message };
  }
};

// Safe CSV export (simple alternative without vulnerabilities)
export const exportToCSV = (data, columns, filename = 'export') => {
  try {
    // Create headers
    const headers = columns.map(col => col.title);
    
    // Create rows
    const rows = data.map(item => 
      columns.map(col => {
        let value = item[col.key];
        if (col.render && typeof col.render === 'function') {
          const rendered = col.render(value, item);
          if (typeof rendered === 'string') {
            value = rendered.replace(/<[^>]*>/g, '');
          } else {
            value = rendered;
          }
        }
        // Escape quotes and commas
        if (typeof value === 'string') {
          if (value.includes(',') || value.includes('"') || value.includes('\n')) {
            value = `"${value.replace(/"/g, '""')}"`;
          }
        }
        return value || '';
      })
    );
    
    // Combine into CSV string
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Add BOM for UTF-8
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filename}.csv`);
    
    return { success: true };
  } catch (error) {
    console.error('Export failed:', error);
    return { success: false, error: error.message };
  }
};
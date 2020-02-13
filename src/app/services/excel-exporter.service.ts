import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeSv from '@angular/common/locales/sv';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelExporterService {
  constructor() { }

  public exportAsExcelFile(
    urval: string,
    json: any[],
    excelFileName: string
  ): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    // Use XLSXStyle instead of XLSX write function which property writes cell styles.
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    registerLocaleData(localeSv);
    const date = new DatePipe('sv');
    const myFormattedDate = date.transform(new Date(), 'short');
    FileSaver.saveAs(
      data,
      fileName + '_' + myFormattedDate + EXCEL_EXTENSION
    );
  }
}

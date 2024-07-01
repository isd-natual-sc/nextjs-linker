"use strict";
const sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
const getSheetData = () => {
    const dataList = [];
    const data = {};
    for (const sheet of sheets) {
        const lastRow = sheet.getLastRow();
        const keys = sheet
            .getRange("B2:G2")
            .getValues()[0]
            // 型変換
            .map((k) => String(k));
        const names = sheet
            .getRange(`B3:B${lastRow}`)
            .getValues()[0]
            // 型変換
            .map((p) => String(p));
        const datums = sheet
            .getRange(`C3:G${lastRow}`)
            .getValues()
            // 型変換
            .map((d) => d.map((ind) => String(ind)));
        for (const keyIndex in datums) {
            for (const dataIndex in datums[keyIndex]) {
                const key = keys[dataIndex];
                data[key] = datums[keyIndex][dataIndex];
            }
            dataList.push(data);
        }
    }
    return dataList;
};
const sheetGet = (e) => {
    const callback = e.parameter.callback;
    const sheetData = getSheetData();
    let out;
    if (callback) {
        const text = `${callback}(${JSON.stringify(sheetData, null, 2)})`;
        out = ContentService.createTextOutput(text);
        out.setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    else {
        out = ContentService.createTextOutput();
        out.setMimeType(ContentService.MimeType.JSON);
        // JSONをセット
        out.setContent(JSON.stringify(sheetData));
    }
    return out;
};

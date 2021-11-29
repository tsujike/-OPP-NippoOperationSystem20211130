/** Dataシートクラス */
class DataSheet {

  /** 
    * @constructor
    */
  constructor() {
    this.id = SHEET_ID;　//onOpen.gsのグローバル領域に定義しています。本番 or 個人作業環境 切り替え用
    this.sheetName = 'Data';
    this.sheet = SpreadsheetApp.openById(this.id).getSheetByName(this.sheetName);
  }

  /** すべてのRecordsをobjArrayで取得するメソッド
   * @return{Array} objArray
   */
  getDataSheetRecords() {
    const [header, ...records] = this.sheet.getDataRange().getValues();
    const allObjectRecords = records.map(record => {
      const obj = {};
      header.map((element, index) => obj[element] = record[index]);
      return obj;
    });

    return allObjectRecords;
  }


  /** 受け取ったobjArrayを貼り付けるメソッド
   * @param{Array} objArray
   */
  setValuesToDataSheet(objArray) {

    //2次元配列に戻す
    const records = objArray.map(record => Object.values(record));

    //貼り付け
    this.sheet.getRange(2, 1, records.length, records[0].length).setValues(records);

    return 'Dataシートに貼り付け完了しました';
  }



}



/** TEST関数 */
function testDataSheet() {

  //インスタンス生成
  const d = new DataSheet();

  //全てのRecordsをobjArrayで取得する
  console.log(d.getDataSheetRecords());

  //受け取ったobjArrayを貼り付けるメソッド
  const objArray = '';
  console.log(d.setValuesToDataSheet(objArray));

}
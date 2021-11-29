/** Nippoシートクラス */
class NippoSheet {

  /** 
    * @constructor
    */
  constructor(personName) {
    this.id = SHEET_ID;　//onOpen.gsのグローバル領域に定義しています。本番 or 個人作業環境 切り替え用
    this.name = personName;
    this.sheetName = `日報_${personName}`;
    this.sheet = SpreadsheetApp.openById(this.id).getSheetByName(this.sheetName);
  }


  /** 日報シートに貼り付けるメソッド
   * @return{Array} objArray
   */
  setValuesToNippoSheet() {
    this.sheet.getRange('B3').setValue(this.createID_());
    this.sheet.getRange('B4').setValue(this.createName_());
    this.sheet.getRange('F3').setValue(this.createDate_());
    this.sheet.getRange('A7').setValue(this.createMokuhyo_());
    this.sheet.getRange('A10').setValue(this.createGyomunaiyo_());
    this.sheet.getRange('F4').setValue(this.createTeisyutusaki_());
    return '日報が完成しました';
  }


  /** recordをSTAR済みにしてDataシートを更新するメソッド */
  setStarToDataSheetRecord() {

    //すべてのrecordsを取得
    const records = this.getRecordsFromDataSheet_();

    //名前でフィルター掛け
    const myRecords = records.filter(record => record['名前'] === this.name);

    //スターでフィルター掛け
    const withoutStarMyRecords = myRecords.filter(record => record['STAR'] === '');

    //スターを付ける
    withoutStarMyRecords.map(record => {
      record['STAR'] = '★';
      return record;
    });

    //Dataシートに貼り付け
    const d = new DataSheet();
    d.setValuesToDataSheet(records);

    return 'DataシートにSTARをつけました';

  }


  /** sheetIdGidを返すメソッド
    * @return{string} e.g edit#gid=729331016 の数値部分
    */
  getNippoSheetIdGid() {
    return this.sheet.getSheetId();
  }



  /** ↓↓サブメソッド↓↓ */

  /** DataSheetから自分のrecordsを取得するメソッド
    * @return{Array} objArray
    */
  getMyRecordsFromDataSheet_() {

    //DataSheetからすべてのrecordsを取得
    const records = this.getRecordsFromDataSheet_();

    //フィルター掛け
    const myRecords = records.filter(record => record['名前'] === this.name);

    return myRecords;
  }

  /** DataSheetからすべてのrecordsを取得するメソッド
   * @return{Array} objArray
   */
  getRecordsFromDataSheet_() {
    const d = new DataSheet();
    const records = d.getDataSheetRecords();
    return records;
  }

  /** myRecordsからStar無しを返すメソッド
   * @return{Array} objArray 
   */
  getWithoutStarMyRecords_() {
    const records = this.getMyRecordsFromDataSheet_();
    const withoutStarRecords = records.filter(record => record['STAR'] === '');
    return withoutStarRecords;
  }

  /** IDを取得するメソッド */
  createID_() {
    return this.getWithoutStarMyRecords_()[0]['ID'];
  }

  /** 名前を取得するメソッド */
  createName_() {
    return this.getWithoutStarMyRecords_()[0]['名前'];
  }

  /** 作成日を取得するメソッド */
  createDate_() {
    return this.getWithoutStarMyRecords_()[0]['作成日'];
  }

  /** 今日の目標を取得するメソッド */
  createMokuhyo_() {
    return this.getWithoutStarMyRecords_()[0]['今日の目標'];
  }

  /** 業務内容を取得するメソッド */
  createGyomunaiyo_() {
    return this.getWithoutStarMyRecords_()[0]['業務内容'];
  }

  /** 提出先を取得するメソッド */
  createTeisyutusaki_() {
    return this.getWithoutStarMyRecords_()[0]['提出先'];
  }



}



/** TEST関数 */
function testNippoSheet() {

  //インスタンス生成
  const personName = '辻健蔵'
  const tsujiNippo = new NippoSheet(personName);

  //日報シートに貼り付けるメソッド
  console.log(tsujiNippo.setValuesToNippoSheet());

  //処理したrecordをSTAR済みにしてDataシートを更新するメソッド 
  console.log(tsujiNippo.setStarToDataSheetRecord());

  // sheetIdGidを返すメソッド
  console.log(tsujiNippo.getNippoSheetIdGid());


  /** ↓↓サブメソッド↓↓ */
  //DataSheetからすべてのrecordsを取得するメソッド
  console.log(tsujiNippo.getRecordsFromDataSheet_());

  //自分のrecordsだけ取得するメソッド
  console.log(tsujiNippo.getMyRecordsFromDataSheet_());

  //myRecordsからStar無しを返すメソッド
  console.log(tsujiNippo.getWithoutStarMyRecords_());

  //IDを取得するメソッド
  console.log(tsujiNippo.createID_());

  //名前を取得するメソッド
  console.log(tsujiNippo.createName_());

  //作成日を取得するメソッド
  console.log(tsujiNippo.createDate_());

  //今日の目標を取得するメソッド
  console.log(tsujiNippo.createMokuhyo_());

  //業務内容を取得するメソッド
  console.log(tsujiNippo.createGyomunaiyo_());

  //提出先を取得するメソッド
  console.log(tsujiNippo.createTeisyutusaki_());



}
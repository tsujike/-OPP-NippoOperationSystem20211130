/** クラスCreatePDF */
class CreatePDF {

  /** 
    * @constructor
    * @param{object} NippoSheetクラスのインスタンス
    */
  constructor(obj) {
    this.obj = obj;
  }


  /** PDFのblobを作成するメソッド */
  createPdfBlob() {

    //シートIDの取得
    const sheetIdGid = this.obj.getNippoSheetIdGid();

    const token = ScriptApp.getOAuthToken();

    //PDF生成するURLをfetchする
    const url = `https://docs.google.com/spreadsheets/d/${this.obj.id}/export?gid=${sheetIdGid}&format=pdf&portrait=true&size=A4&gridlines=false&fitw=true`;
    const blob = UrlFetchApp.fetch(url, { headers: { 'Authorization': `Bearer ${token}` } }).getBlob().setName(`${this.setFileName_()}.pdf`);
    return blob;
  }


  /** ↓↓サブメソッド↓↓ */

  /**　PDFのファイル名を決めるメソッド */
  setFileName_() {
    const sheetName = this.obj.sheetName; //`日報_${personName}`;
    const nippoId = this.obj.createID_();
    return `${sheetName}${nippoId}`;
  }

}

/** テスト関数です */
function testCreatePDF() {

  //クラスCreatePDFの引数に必要な変数をクラスNippoSheetから生成
  const tsujiNippo = new NippoSheet('辻健蔵');

  //インスタンス化
  const c = new CreatePDF(tsujiNippo);

  //pdf生成するメソッド
  console.log(c.createPdfBlob().getName());

  //　PDFのファイル名を決めるメソッド
  console.log(c.setFileName_());
}
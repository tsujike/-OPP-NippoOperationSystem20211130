/** クラスGmailDraft*/
class GmailDraft {

  /** 
    * @constructor
    * @param{Object} NippoSheetオブジェクトのインスタンス
    */
  constructor(obj) {
    this.obj = obj;
    this.toAddress = 'hogehoge@gmail.com';
  }


  /** Mail下書きメソッド
    * @param{object} pdfのblobオブジェクト
    */
  draftGmail(pdf) {
    GmailApp.createDraft(this.toAddress, this.createSubject_(), this.mailBody_(), this.getOptions_(pdf));
    return 'メールの下書きを作成しました';
  }


  /** Mail送信メソッド
    * @param{object} pdfのblobオブジェクト
    */
  sendGmail(pdf) {
    GmailApp.sendEmail(this.toAddress, this.createSubject_(), this.mailBody_(), this.getOptions_(pdf));
    return 'メールを送信しました';
  }





  /** ↓↓サブメソッド↓↓ */

  /** subjectを生成するメソッド
   * @return{string} e.g 日報を送付します。辻健蔵
   */
  createSubject_() {
    const subject = `日報を送付します。${this.obj.createID_()}`;
    return subject;
  }

  /** NippooクラスのインスタンスからMailBodyを作成するメソッド 
    * @return{string} 
    */
  mailBody_() {
    const mailBody = `お疲れ様です。\n\n添付の通り、日報を送付させていただきます。\n\nよろしくお願いします。\n\n${this.obj.name}`;
    return mailBody;
  }

  /** cc用のオブジェクト作成メソッド
    * @param{object} pdfのblobオブジェクト
    */
  getOptions_(pdf) {
    return { attachments: pdf };
  }

}


/** テスト関数 */
function testGmailDraft() {

  //日報インスタンス生成
  const tsujiNippo = new NippoSheet('辻健蔵');

  //PDFインスタンス生成
  const c = new CreatePDF(tsujiNippo);
  const pdf = c.createPdfBlob();

  //メールの下書き
  const gd = new GmailDraft(tsujiNippo);
  console.log(gd.draftGmail(pdf));

  //メールの送信
  // console.log(GmailDraft.sendGmail(pdf));

}



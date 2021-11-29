/** グローバル領域 */
const properties = PropertiesService.getScriptProperties();
// properties.setProperty('SHEET_ID', 'シートID');
const SHEET_ID = properties.getProperty('SHEET_ID');

/** onOpen関数 */
function onOpen() {

  const ui = SpreadsheetApp.getUi();

  ui.createMenu('カスタムメニュー')
    .addItem('日報シートに反映', 'setNippo')
    .addSeparator()
    .addItem('メール送信', 'sendGmail')
    .addToUi();
}



function setNippo() {

  //インスタンス生成
  const personName = '辻健蔵'
  const tsujiNippo = new NippoSheet(personName);

  //日報シートに貼り付けるメソッド
  console.log(tsujiNippo.setValuesToNippoSheet());

}


function sendGmail() {

  //インスタンス生成
  const personName = '辻健蔵'
  const tsujiNippo = new NippoSheet(personName);

  //日報シートに貼り付けるメソッド
  console.log(tsujiNippo.setValuesToNippoSheet());

  //PDFインスタンス生成
  const c = new CreatePDF(tsujiNippo);
  const pdf = c.createPdfBlob();

  //メールの下書き
  const gd = new GmailDraft(tsujiNippo);
  console.log(gd.draftGmail(pdf));

  //メールの送信
  // console.log(GmailDraft.sendGmail(pdf));

  //処理したrecordをSTAR済みにしてDataシートを更新するメソッド 
  console.log(tsujiNippo.setStarToDataSheetRecord());

}
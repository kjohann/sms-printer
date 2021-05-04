import { MessageSenderType } from '../../messageParser';

export const addressToken = "insert-address-token" // markerer utgående mms
export const defaultAddressWithCountryCode = '+4781549300';
export const defaultContactName = 'Bowler';
export const defaultDate = new Date(1996, 1, 11);
export const defaultReadableDate = '10. februar 1996';
export const defaultBody = 'Kykkeli klemmetid!';
export const defaultType = MessageSenderType.Incoming;
export const base64EncodedImage = 'base64encodedstuffgoeshere==';
export const imageName = 'image000001.jpg';

export type SmsXmlElementType = { address: string, contactName: string, date: Date | null, dateSent: Date | null, readableDate: string, body: string, type : MessageSenderType}

export const buildSmsXmlElement = ({ address = defaultAddressWithCountryCode, contactName = defaultContactName, date, dateSent, readableDate = defaultReadableDate, body = defaultBody, type = (defaultType as number) } : SmsXmlElementType) => `
<sms protocol="0" address="${address}" date="${date?.getTime() || 0}" type="${type}" subject="null" body="${body}" toa="null" sc_toa="null" service_center="+4790002100" read="1" status="-1" locked="0" date_sent="${dateSent?.getTime() || 0}" sub_id="1" readable_date="${readableDate}" contact_name="${contactName}" />
`.trim();


export type MmsXmlElementType = { address: string, toAddress: string, fromAddress: string, contactName: string, date: Date | null, dateSent: Date | null, readableDate: string, textPart: string }

export const buildMmsXmlElement = ({ address, toAddress, fromAddress, contactName = defaultContactName, date, dateSent, readableDate = defaultReadableDate, textPart = defaultBody }: MmsXmlElementType) => `
<mms date="${date?.getTime() || 0}" group_status="0" ct_t="application/vnd.wap.multipart.related" is_rr="0" scheduled_date="0" msg_box="2" address="${address}" sub_cs="null" retr_st="null" d_tm="null" exp="604800" locked="0" m_id="C81B7508-6BDF-71E8-8E7D-40A8F0257142" retr_txt="null" date_sent="${dateSent?.getTime() || 0}" read="1" rpt_a="null" ct_cls="null" pri="129" sub_id="1" bopomo_key="null" resp_txt="null" ct_l="null" d_rpt="129" otr_att="0" m_type="128" phone_id="-1" rr="129" sub="null" private="0" read_status="null" seen="1" s_vis="null" resp_st="128" text_only="0" st="null" retr_txt_cs="null" safe_msg="0" creator="com.google.android.apps.messaging" m_size="1520320" pinyin_key="null" tr_id="T163e47f76c3" favourite="0" general_key="null" is_srr="0" m_cls="personal" v="18" spam="0" readable_date="${readableDate}" contact_name="${contactName}">
<parts>
  <part seq="-1" ct="application/smil" name="null" chset="null" cd="null" fn="null" cid="&lt;smil&gt;" cl="smil.xml" ctt_s="null" ctt_t="null" text='&lt;smil&gt;&lt;head&gt;&lt;layout&gt;&lt;root-layout/&gt;&lt;region id="Image" fit="meet" top="0" left="0" height="80%" width="100%"/&gt;&lt;region id="Text" top="80%" left="0" height="20%" width="100%"/&gt;&lt;/layout&gt;&lt;/head&gt;&lt;body&gt;&lt;par dur="5000ms"&gt;&lt;img src="image000000.jpg" region="Image" /&gt;&lt;/par&gt;&lt;par dur="5000ms"&gt;&lt;img src="image000001.jpg" region="Image" /&gt;&lt;/par&gt;&lt;par dur="5000ms"&gt;&lt;text src="text000002.txt" region="Text" /&gt;&lt;/par&gt;&lt;/body&gt;&lt;/smil&gt;' />
  <part seq="0" ct="image/jpeg" name="null" chset="null" cd="null" fn="null" cid="&lt;image000001&gt;" cl="${imageName}" ctt_s="null" ctt_t="null" text="null" data="${base64EncodedImage}" />
  <part seq="0" ct="text/plain" name="null" chset="106" cd="null" fn="null" cid="&lt;text000002&gt;" cl="text000002.txt" ctt_s="null" ctt_t="null" text="${textPart}" data="" />
</parts>
<addrs>
  <addr address="${fromAddress}" type="137" charset="106" />
  <addr address="${toAddress}" type="151" charset="106" />
</addrs>
</mms>
`

export const buildXmlFile = (smsElements: string[], mmsElements: string[]) => {
  const smsElementsXml = smsElements.join('');
  const mmsElementsXml = mmsElements.join('');
  return `
  <?xml version='1.0' encoding='UTF-8' standalone='yes' ?>
  <smses count="${smsElements.length + mmsElements.length}" backup_set="839ed921-e4dd-487d-977d-cbde32cbb658" backup_date="1611162725896" type="full">
    ${smsElementsXml}
    ${mmsElementsXml}
  </smses>
  `.trim();
}
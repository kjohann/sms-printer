export interface XmlSms {
  address: number | string,
  body: string,
  type: number,
  contact_name: string,
  date_sent: number,
  readable_date: string
}

export interface XmlSmses {
  count: number,
  sms: XmlSms[] | XmlSms
}

export interface XmlSmsBackupFile {
  smses: XmlSmses
}
export interface XmlMessage {
  address: number | string,
  contact_name: string,
  date_sent: number,
  date: number,
  readable_date: string
}

export interface XmlMmsAddress {
  address: number | string
}

export interface XmlMmsAddresses {
  addr: XmlMmsAddress[]
}

export interface XmlMmsPart {
  cl: string,
  ct: string,
  data: string,
  text: string
}

export interface XmlMmsParts {
  part: XmlMmsPart[]
}

export interface XmlMms extends XmlMessage {
  parts: XmlMmsParts,
  addrs: XmlMmsAddresses
}

export interface XmlSms extends XmlMessage {
  body: string,
  type: number
}
export interface XmlSmses {
  count: number,
  sms: XmlSms[] | XmlSms
  mms: XmlMms[] | XmlMms
}

export interface XmlSmsBackupFile {
  smses: XmlSmses
}
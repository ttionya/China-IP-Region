interface IRegion {
  city: string
  region: string
}

export default class IP2Region {
  public static create(dbPath: string): IP2Region

  public btreeSearchSync(ip: string): IRegion | null
}

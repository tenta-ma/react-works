const key: string = "travel";

/**
 * チュートリアルを終わらせたか
 */
export const finishedTutorial = (): boolean => {
  // FIXME: 暫定処理として、旅行情報へ何かしらの登録が行われた場合
  // チュートリアルを行った、と判断させてみる
  return !!localStorage.getItem(key);
};

/**
 * 基本情報のstorage管理
 */
export const basicInformation = {
  set: (basic: BasicInformation): void => {
    const travel: TravelInformation = getTravelInformation();
    travel.basic = basic;
    localStorage.setItem(key, JSON.stringify(travel));
  },
  get: (): BasicInformation => {
    const travel: TravelInformation = getTravelInformation();
    return travel.basic ?? {};
  },
};

/**
 * 入国情報のstorage管理
 */
export const immigrationInformation = {
  set: (immigration: ImmigrationInformation): void => {
    const travel: TravelInformation = getTravelInformation();
    travel.immigration = immigration;
    localStorage.setItem(key, JSON.stringify(travel));
  },
  get: (): ImmigrationInformation => {
    const travel: TravelInformation = getTravelInformation();
    return travel.immigration ?? {};
  },
};

/**
 * 出国情報のstorage管理
 */
export const departureInformation = {
  set: (departure: DepartureInformation): void => {
    const travel: TravelInformation = getTravelInformation();
    travel.departure = departure;
    localStorage.setItem(key, JSON.stringify(travel));
  },
  get: (): DepartureInformation => {
    const travel: TravelInformation = getTravelInformation();
    return travel.departure ?? {};
  },
};

/**
 * 旅行情報をlocal storageから取得する
 *
 * @return 旅行情報
 */
const getTravelInformation = (): TravelInformation => {
  const json: string | null = localStorage.getItem(key);
  if (!json) {
    return {};
  }
  return JSON.parse(json) ?? {};
};

/**
 * 旅行情報
 */
export type TravelInformation = {
  basic?: BasicInformation;
  immigration?: ImmigrationInformation;
  departure?: DepartureInformation;
};

/**
 * 基本情報
 */
export type BasicInformation = {
  // 同伴家族人数
  // XXX: 値の型はselect の valueを想定
  familyMembers?: string;
  // 出身地
  // 国名コード ISO 3166(ISO 3166-1 alpha-2)
  barthplace?: string;
  // 滞在開始日
  stayStartDate?: Date;
  // 滞在終了日
  stayEndDate?: Date;
  // 渡航目的
  // XXX: 値の型はselect の valueを想定
  purpose?: string;
};

/**
 * 入国情報
 */
export type ImmigrationInformation = {
  // 入国予定日
  entryDate?: Date;
  // 便名
  aircraftName?: string;
  // 航空機会社名
  aircraftCompany?: string;
  // 座席番号
  seatNumber?: string;
};

/**
 * 出国情報
 */
export type DepartureInformation = {
  // 出国予定日
  departureDate?: Date;
  // 便名
  aircraftName?: string;
  // 航空機会社名
  aircraftCompany?: string;
  // 座席番号
  seatNumber?: string;
};

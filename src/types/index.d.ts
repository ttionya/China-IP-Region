/** 返回值结构 */
export interface IResponse {
  code: STATUS_CODE
  message: STATUS_MESSAGE
  data: string
}

/** 状态码 */
export const enum STATUS_CODE {
  // 成功
  SUCCESS = 0,
  // 非法参数
  INVALID_PARAMS = 10001,
  // 无结果
  EMPTY_RESULT = 10002,
}

/** 状态码对应信息 */
export const enum STATUS_MESSAGE {
  SUCCESS = '请求成功',
  INVALID_PARAMS = '未检测到参数或参数不合法',
  EMPTY_RESULT = '未检索到对应 IP 归属',
}

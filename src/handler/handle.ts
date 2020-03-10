import { Context } from 'koa'
import ip2Region from '../utils/ip2region'
import { IResponse, STATUS_CODE, STATUS_MESSAGE } from '../types'

const query = ip2Region.create('./data/ip2region.db')

const ipv4Reg = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

export default function () {
  return (ctx: Context): void => {
    const { ip = '' } = ctx.query

    // 返回的数据类型
    const responseObj: IResponse = {
      code: STATUS_CODE.SUCCESS,
      message: STATUS_MESSAGE.SUCCESS,
      data: '',
    }

    if (ipv4Reg.test(ip)) {
      const data = query.btreeSearchSync(ip)

      if (data) {
        // 有结果
        const regionArray = data.region
          .split('|')
          .filter((v) => v !== '0')

        responseObj.data = regionArray.join(' - ')
      } else {
        // 无结果
        responseObj.code = STATUS_CODE.EMPTY_RESULT
        responseObj.message = STATUS_MESSAGE.EMPTY_RESULT
      }
    } else {
      // 非法参数
      responseObj.code = STATUS_CODE.INVALID_PARAMS
      responseObj.message = STATUS_MESSAGE.INVALID_PARAMS
    }

    ctx.body = responseObj
  }
}

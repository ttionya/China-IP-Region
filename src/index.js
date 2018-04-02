require('babel-polyfill');

const Koa = require('koa');
const ip2Region = require('./utils/ip2region');

const app = new Koa();
const query = ip2Region.create('../data/ip2region.db');

const ipv4Reg = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;


app
  .use(async(ctx) => {
    let { ip = '' } = ctx.query;

    /**
     * 返回数据类型
     *
     * @type {{code: number, message: string, data: object}}
     */
    let responseObj = {
      code: 0,
      message: '',
      data: null
    };

    if (ipv4Reg.test(ip)) {
      let data = query.btreeSearchSync(ip);

      // 有结果
      if (data) {
        let regionArray = data.region.split('|');
        let dataArray = regionArray.filter(v => v != 0);

        responseObj.data = dataArray.join(' - ');
      }

      // 无结果
      else {
        responseObj.code = 10002;
        responseObj.message = '未检索到对应 IP 归属';
      }
    }
    else {
      responseObj.code = 10001;
      responseObj.message = '未检测到参数或参数不合法';
    }

    ctx.body = responseObj;
  })

  .listen(3000);

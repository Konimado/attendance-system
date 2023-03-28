const Time = () => {
  const now = new Date();
  const year = now.getFullYear(); //年
  const mon = now.getMonth() + 1; //月 １を足す
  const day = now.getDate(); //日
  const hour = now.getHours(); //時間
  const min = now.getMinutes(); //分
  const sec = now.getSeconds(); //秒
  // const Time =year + "/" + mon + "/" + day + "  " + hour + ":" + min + ":" + sec;
  const Time = {
    year,
    mon,
    day,
    hour,
    min,
    sec,
  };
  return Time
};


export default Time

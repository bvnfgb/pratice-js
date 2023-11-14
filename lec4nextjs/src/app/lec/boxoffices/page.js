export default async function BoxofficesPage() {
  //어제날짜 만들기
  //https://ko.javascript.info/date
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  let seldt = yesterday.getFullYear();
  let month = yesterday.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  let day = yesterday.getDate();
  day = day < 10 ? `0${day}` : day;

  seldt = `${seldt}${month}`;
  seldt = `${seldt}${day}`;

  console.log('yesterday =', seldt)

  let url = 'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=';
  url = url + seldt;
  console.log("url=", url);

  const res = await fetch(url,{next:{revalidate:0}}) ;
  const data = await res.json() ;

  const showRange  = data.boxOfficeResult.showRange.split('~')[0];
  const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList ;
  console.log("showRange =", showRange)
  console.log("dailyBoxOfficeList =",dailyBoxOfficeList)
  return (
    <div>
      <div className="text-3xl font-bold">박스오피스 :{showRange}</div>
      {dailyBoxOfficeList.map((item)=>
      <li key={item.movieCd}>{item.rank} : {item.movieNm}</li>
      )}
    </div>
  );
}

/*
位置もしくは天気によってホームページの背景を切り替える関数
function setBackgroundByWeather(weather)は不採用もしくは中身を変更する予定
function setBackgroundByLocation(locationName)はif文の量を増やしたり、デフォルトの背景を追加したい
*/


export function setBackgroundByWeather(weather){
    //天気によってホームページの背景を変える
    const body = document.body;
    if (weather === 'Clear') {
        body.style.backgroundImage = "url('./assets/image/umbrella.png')";
        //body.style.backgroundImage = "url('./assets/image/sunny.png')";
      } else if (weather === 'Rain') {
        body.style.backgroundImage = "url('./assets/image/umbrella.png')";
      } else if (weather === 'Clouds') {
        body.style.backgroundImage = "url('./assets/image/umbrella.png')";
        //body.style.backgroundImage = "url('./assets/image/cloudy.png')"; // 画像があるなら
      } else {
        body.style.backgroundImage = "none"; // デフォルト背景に戻す
      }
}

export function setBackgroundByLocation(locationName){
    //現在地によってホームページの背景を変える
    const body = document.body;
    if(locationName.includes("福島県")){//"福島"だと検知されないので注意
        body.style.backgroundImage = "url('./assets/image/hukusima.jpg')";
    	body.style.backgroundSize = "cover";
    }else{
        body.style.backgroundImage = "none"; // デフォルト背景に戻す
    }
}
/*
緯度経度の情報から現在地を特定できる機能を実装
表示方法を変更するかもしれない
*/

import {geoApiKey} from "./apiKeys.js";//OpenCage のAPIキー
import { setBackgroundByLocation } from "./background.js";//背景を変更関数をimport


export function getLocationName(lat, lon) {
    console.log("Geo API Key:", geoApiKey);
if (!weatherApiKey || !geoApiKey) {
    console.error("API keys are missing in development environment. Check .env file.");
    // UIにエラーメッセージを表示するなどの処理
}
    //緯度経度を OpenCage API に渡して、日本語の住所を取得。
    //lat, lon は緯度経度
    //OpenCage の API を使って、現在の住所（都道府県＋市町村）を取得。
    //res.json() はレスポンスの「本文（ボディ）」を JSON形式のデータ として読み取るメソッド
    //res.json() はレスポンスの中身を文字列として受け取り、それをJavaScriptのオブジェクトに変換
    //res.json() 自体はPromiseを返すので、次の .then() で受け取れる形になっている

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${geoApiKey}&language=ja`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
	    const components = data.results[0].components;//results[0].components:都道府県名や市区町村名などが入っているオブジェクト
	    //都道府県 (state) と市町村 (city, town, village) を連結
	    //どれかが無くてもエラーにならないように || '' で補完。
	    const locationName = `${components.state || ''} ${components.city || components.town || components.village || ''}`;
	    //都道府県 (state) 、市町村 (city, town, village)

        //この下を変更予定
	    document.getElementById('location').textContent = '現在地: ' + locationName;//表示を更新
	    setBackgroundByLocation(locationName)//背景を変更する処理
        })
        .catch(error => {//例外処理
	    document.getElementById('location').textContent = '住所取得エラー';
	    console.error(error);
        });
}

/*
緯度経度の情報から現在地を特定できる機能を実装
表示方法を変更するかもしれない
*/

import {geoApiKey} from "./apiKeys.js";//OpenCage のAPIキー
import { setBackgroundByLocation } from "./background.js";//背景を変更関数をimport


export function getLocationName(lat, lon) {
    
    //緯度経度を OpenCage API に渡して、日本語の住所を取得。
    //lat, lon は緯度経度
    //OpenCage の API を使って、現在の住所（都道府県＋市町村）を取得。
    //res.json() はレスポンスの「本文（ボディ）」を JSON形式のデータ として読み取るメソッド
    //res.json() はレスポンスの中身を文字列として受け取り、それをJavaScriptのオブジェクトに変換
    //res.json() 自体はPromiseを返すので、次の .then() で受け取れる形になっている

    const url='https://api.opencagedata.com/geocode/v1/json';
    const appID = "10dc3853be25422cac6a1ff19341a600";

    //$.ajax()を使うのでhtml側で<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>を先に読み込ませる
    //$.ajax():APIリクエストの際に幾つかの情報をJSのプログラムからAPIを送信する必要がある。送信するにはパラメータにdataプロパティを追加
    $.ajax({
        url:url,//使用するapi.今回は5 Day / 3 Hour Forecast
        data:{
            key: appID,
            q: `${lat},${lon}`,
            lang:'ja',//言語設定
            pretty: 1,
        }
    })
    .done(function(data){
        console.log(data);
        const components = data.results[0].components;
        console.log("都道府県:", components.state);
        console.log("市区町村:", components.city || components.town || components.village);
        
        //都道府県 (state) と市町村 (city, town, village) を連結
        //どれかが無くてもエラーにならないように || '' で補完。
        const locationName = `${components.state || ''} ${components.city || components.town || components.village || ''}`;
        //都道府県 (state) 、市町村 (city, town, village)

        //この下を変更予定
        document.getElementById('location-name').textContent = locationName;//表示を更新
        setBackgroundByLocation(locationName)//背景を変更する処理
    })
    .fail(function(){
        document.getElementById('location-name').textContent = '住所取得エラー';
        console.error(error);
        console.log('$.ajax faild');
    })
}

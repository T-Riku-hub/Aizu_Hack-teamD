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
        

        const components = data.results[0].components;


        console.log(data);
        console.log("都道府県:", components.state);
        console.log("市区町村:", components.city || components.town || components.village);
        console.log("地理的特性:", components.natural_feature || components.water || components.beach || components.park || "特になし");

        
        //どれかが無くてもエラーにならないように || '' で補完。
        const locationName = `${components.state || ''} ${components.city || components.town || components.village || ''}`;
        //都道府県 (state) 、市町村 (city, town, village)
        const feature=`${components.natural_feature || components.water || components.beach || components.park || '特になし'}`;
        //natural_feature : "Mount Fuji"（山など） water:湖や川の名前（例：猪苗代湖） beach:海岸名  park:公園名

        //この下を変更予定

        document.getElementById('location-name').textContent = locationName;//現在地を更新
        document.getElementById('want-to-go').textContent=feature;//キャラクターが行きたいところを更新
        setBackgroundByLocation(locationName)//背景を更新
    })
    .fail(function(){
        document.getElementById('location-name').textContent = '住所取得エラー';
        console.error(error);
        console.log('$.ajax faild');
    })
}

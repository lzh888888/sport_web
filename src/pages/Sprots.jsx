import React, { Component } from 'react';
// import axios from 'axios';
// import {myAMmap } from './myAMmap';
// const AMap = window.AMap;
import { ActionSheet } from 'antd-mobile';
import './Sprots.css';

class Sprots extends Component {
    constructor(props){
        super(props);
        this.state={
            map: "",
            clicked: 'none',
            clicked1: 'none',
            clicked2: 'none',
        }
    }

    dataList = [
        { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
        { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
        { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
        { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
        { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
      ].map(obj => ({
        icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
        title: obj.title,
      }));


    componentDidMount(){
        let self = this;
        // const map = new window.AMap.Map(document.getElementById("map_container1"));
        const mapObj = new window.AMap.Map(document.getElementById("map_container1"));
        mapObj.plugin('AMap.Geolocation', function () {
            let geolocation = self.setPositionInfo(true);
            mapObj.addControl(geolocation);
            geolocation.getCurrentPosition((status,result)=>{});
            window.AMap.event.addListener(geolocation, 'complete', self.geolocationSuccess);//返回定位信息
            window.AMap.event.addListener(geolocation, 'error', ()=>console.log(this));      //返回定位出错信息
        });
        // map.setCity("北京");
         this.setState({
             map: mapObj
         });
    }

    setPositionInfo = (data) => {
       return new window.AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: data,        //显示定位按钮，默认：true
            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new window.AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
    }

    get_weatcher_info = (city) =>{
        window.AMap.plugin('AMap.Weather', function() {
            //创建天气查询实例
            let weather = new window.AMap.Weather();
            //执行实时天气信息查询
            weather.getForecast(city, function(err, data1) {
                console.log(err, data1);
            });
        });
    }

    //获取定位信息成功是的回调函数
    geolocationSuccess = (data) => {
        console.log("////////////////////");
        console.log(data.addressComponent);
        this.get_weatcher_info(data.addressComponent.adcode);
        
    }

    showShareActionSheetMulpitleLine = () => {
        const data = [[...this.dataList, this.dataList[2]], [this.dataList[3], this.dataList[4]]];
        ActionSheet.showShareActionSheetWithOptions({
          options: data,
          message: '应用功能区',
        },
        (buttonIndex, rowIndex) => {
          this.setState({ clicked2: buttonIndex > -1 ? data[rowIndex][buttonIndex].title : 'cancel' });
        });
    }


    render() {
        return (
            <div>
                <div id="map_container1" className="map_container1"></div>
                <div className="btn_start_box"></div>
                <div className="start_btn" onClick={this.showShareActionSheetMulpitleLine}>开始</div>
            </div>
        )
    }
}

export default Sprots;
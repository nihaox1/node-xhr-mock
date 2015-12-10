module.exports = {
    error               : false ,
    "date|1444043199427-14511111111"    : 0 ,   //日期
    hasSign             : false ,               //是否签到
    "time|0-7"          : 3 ,                   //第几次连续签到
    start               : 1444043199427 ,       //用户第一次签到
    coupons             : [                     //优惠券信息
        {
            node    : 1 ,
            money   : 5
        } ,
        {
            node    : 3 ,
            money   : 15
        } ,
        {
            node    : 7 ,
            money   : 25
        }
    ] ,
    "hasCoupon|10-20"    : [ {                  //用户领取奖励列表
        "phone|13000000000-18900000000"           : 1 , //手机号码
        "money|5-20"    : 10                            //金额
    } ] 
}
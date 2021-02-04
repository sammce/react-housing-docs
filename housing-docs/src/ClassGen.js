export default function ClassGen(){
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var classNameArr = [];
    for (var i = 0; i < 6; i++) {
        classNameArr[i] = chars.charAt(Math.floor(Math.random()*62));
    }
    if (isNaN(parseInt(classNameArr[0]))){
        return classNameArr.join("");
    }
    return "_" + classNameArr.join("");
}
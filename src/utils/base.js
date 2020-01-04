export const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor (count / 10000) < 10000) {
    return Math.floor (count/1000)/10 + "万";
  } else  {
    return Math.floor (count / 10000000)/ 10 + "亿";
  }
}
export const filterIndex = rankList => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList [i].tracks.length && !rankList [i + 1].tracks.length) {
      return i + 1;
    }
  }
};
export const getName = list => {
  let str = "";
  list.map ((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

export const getFontSize = () => {
  let fs = document.getElementsByTagName('html')[0].style.cssText.split(':')[1].split('px')[0]
  fs = fs.replace(/^\s+|\s+$/g, '')
  return fs
}



export const translatePxToRem = (num) => {
  let number = num
  let fs = getFontSize()
  if (typeof number !== 'number') {
    number = number.indexOf('px')>= 0 ? number.split('px')[0] : Number(number)
  } 
  return `${Number(number)/fs}rem`
}

// 判断一个对象是否为空
export const isEmptyObject = obj =>{
  return !obj || Object.keys(obj).length === 0
} 
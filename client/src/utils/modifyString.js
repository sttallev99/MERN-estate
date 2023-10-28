export const modifyString = (str) => {
    let modyfiedStr = str.slice(0, 16);
    modyfiedStr = modyfiedStr + '...';
    return modyfiedStr;
} 
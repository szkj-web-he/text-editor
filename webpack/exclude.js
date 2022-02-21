module.exports = /node_modules(\/|\\)(?!@datareachable|@possie-engine)/;
// /**
//  * 剔除不必要的打包文件
//  * node_modules里非公司库的依赖
//  * 本来时用正则  但是担心在mac或者liunx和window上/的通配符不同
//  */
// module.exports = (file) => {
//     if (file.includes("node_modules")) {
//         if (
//             file.includes("@datareachable") ||
//             file.includes("@possie-engine")
//         ) {
//             return false;
//         } else {
//             return true;
//         }
//     } else {
//         return false;
//     }
// };

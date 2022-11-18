// 明細
interface Statement {
  items: Product[];
  tax: number;
  totalAmount: number;
}
// 商品
interface Product {
  name: string;
  qty: number;
  amount: number;
}

// 商品名を出力。(最終行の末尾に改行)
const outputProductNames = (productNames: string[]): string => {
  return productNames.join("\n") + "\n";
};

// 商品名から値段を設定
const getPrice = (product: string): number => {
  switch (product) {
    case "りんご":
      return 198;
    case "みかん":
      return 98;
    case "すいか":
      return 498;
    default:
      return 0;
  }
};

// 商品名に応じて初期値作成
const initProduct = (productName: string): Product => {
  const product: Product = {
    name: productName,
    qty: 1,
    amount: getPrice(productName),
  };
  return product;
};

// 商品ごとの明細を作成
const createProductDetail = (productNames: string[]): Product[] => {
  const products: Product[] = [];

  for (let i = 0; i < productNames.length; i++) {
    const productName: string = productNames[i];
    // 同じ商品を抽出
    const sameProduct: Product | undefined = products.find((product) => product.name === productName);

    // 同じ商品がすでにある場合、数量と合計を加算
    if (sameProduct) {
      sameProduct.qty += 1;
      sameProduct.amount += getPrice(sameProduct.name);
    } else {
      // 同じ商品がない場合、商品の初期値作成
      const product = initProduct(productName);
      products.push(product); // 追加
    }
  }
  return products;
};

// 合計金額を取得
const getTotalAmountExcludingTax = (products: Product[]): number => {
  const total = products.reduce((sum, product) => {
    return sum + product.amount;
  }, 0);
  return total;
};

// 明細作成
const createStatement = (productNames: string[]) => {
  const statement: Statement = {
    items: [], // 商品
    tax: 0, // 消費税
    totalAmount: 0, // 税込みの合計
  };
  // 商品一覧をセット
  statement.items = createProductDetail(productNames);
  // 税抜の合計
  const totalAmountExcludingTax = getTotalAmountExcludingTax(statement.items);
  // 税込みの合計
  statement.totalAmount = Math.floor(totalAmountExcludingTax * 1.08);
  // 消費税
  statement.tax = statement.totalAmount - totalAmountExcludingTax;

  return statement;
};

module.exports = { outputProductNames, createStatement };

// // ▼▼▼▼コマンドライン上で実行出来る▼▼▼▼▼
// const purchasedProducts: string[] = [];
// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// const purchaseFlow = () => {
//   readline.question("商品を入力してください 。入力が終わればOKと入力してください\n", (answer: string) => {
//     if (answer === "OK") {
//       console.warn("【購入された商品一覧】");
//       console.log(outputProductsNames(purchasedProducts));
//       console.log(createStatement(purchasedProducts));
//       readline.close();
//     } else if (!answer) {
//       console.log("入力されていません");
//       purchaseFlow();
//     } else {
//       purchasedProducts.push(answer);
//       console.warn(`【商品一覧】\n${purchasedProducts.join("\n")}`);
//       purchaseFlow();
//     }
//   });
// };
// purchaseFlow(); // 実行

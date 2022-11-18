const shopping = require("./shopping");

test("購入した商品名を改行で連結した文字列。(※入力値最終行の末尾に改行が１つ入る。)", () => {
  const testArr = ["りんご", "みかん", "りんご", "すいか"];
  const result = shopping.outputProductNames(testArr);
  // expect(result).toBe("りんご" + "\n" + "みかん" + "\n" + "りんご" + "\n" + "すいか" + "\n");
  expect(result).toBe(testArr.join("\n") + "\n");
});

test("明細が決められた形式になっている", () => {
  const testArr = ["すいか", "りんご", "りんご", "みかん", "みかん", "すいか", "りんご", "ビニール袋"];
  const result = shopping.createStatement(testArr);
  // 被りなしの配列
  const uniqArr = [...new Set(testArr)];
  // 明細から商品名のリストを抽出
  const resultNames = result.items.map((product) => product.name);
  // 入力順になっているかどうか判定
  expect(resultNames).toEqual(uniqArr);
  // 指定された明細になっているか確認
  expect(result).toStrictEqual({
    items: [
      { name: "すいか", qty: 2, amount: 996 },
      { name: "りんご", qty: 3, amount: 594 },
      { name: "みかん", qty: 2, amount: 196 },
      { name: "ビニール袋", qty: 1, amount: 0 },
    ],
    tax: 142,
    totalAmount: 1928,
  });
});

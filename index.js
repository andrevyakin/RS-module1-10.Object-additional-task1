const groceries = {
    "73Wakv": {
        name: "Orange Juice",
        price: 1.5,
        discount: 10
    },
    "5L3db9": {
        name: "Chocolate",
        price: 2,
        discount: 0
    }
    // more items...
};

const getTotalPriceOfShoppingBag = shoppingBagArray => {

    //Защита от дурака. Если в функцию не передадут ничего.
    shoppingBagArray = shoppingBagArray || [];
    //Кассовый чек
    const cashReceipt = [];
    //Количество купленных товаров
    let amount = 0;
    //Общая сумма покупки
    let totalPrice = 0;

    //Формирование чека.
    shoppingBagArray.forEach(purchase => {
        Object.entries(groceries).forEach(goods => {
            if (purchase.productId === goods[0]) {
                const setAmount = () => goods[1].price * purchase.count * (1 - goods[1].discount / 100);
                cashReceipt.push({
                    name: goods[1].name,
                    count: purchase.count,
                    price: goods[1].price,
                    discount: goods[1].discount,
                    amount: setAmount()
                });
                amount++;
                totalPrice += setAmount();
            }
        });
    });
    cashReceipt.push({amount: amount, totalPrice: totalPrice});

    //Строка для печати чека.
    const strForPrint = () => {
        const str = [" Вы купили:\n"];
        for (let i = 0; i < cashReceipt.length - 1; i++) {
            str.push(`Продукт ${i + 1}: "${cashReceipt[i].name}".`);
            str.push(`Количество: ${cashReceipt[i].count}.`);
            str.push(`Цена: ${cashReceipt[i].price.toFixed(2)}.`);
            str.push(`Стоимость: ${cashReceipt[i].amount.toFixed(2)}`);
            str.push(`c учетом скидки: ${cashReceipt[i].discount}%.`);
            str.push("\n");
        }
        str.push(`Всего товаров: ${cashReceipt[cashReceipt.length - 1].amount}.`);
        str.push(`На общую сумму: ${cashReceipt[cashReceipt.length - 1].totalPrice.toFixed(2)}.`);
        return str.join(',').replaceAll(',', ' ');
    }
    return strForPrint();
}

const shoppingBag = [
    {productId: "73Wakv", count: 3},
    {productId: "5L3db9", count: 23}
];
const totalPrice = getTotalPriceOfShoppingBag(shoppingBag);
console.log(totalPrice);





exports.getPeymentOptions = function (payment) {
    const titles = [
        'Crypto Wallet',
        'Credit Card' ,
        'Debit Card' ,
        'Paypal',
    ];

    const options = titles.map((title, index) => ({
        title: title,
        value: title.split(' ').join('-').toLocaleLowerCase(),
        selected: payment == title.split(' ').join('-').toLocaleLowerCase(),
    }));

    return options;
};
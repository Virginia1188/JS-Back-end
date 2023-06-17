
exports.getCategory = function (option) {
    const titles = ['PC',
        'Nintendo',
        'PS4',
        'PS5',
        'XBOX', 
    ];

    const options = titles.map((title, index) => ({
        title: title,
        value: title,
        selected: title.toLocaleLowerCase() == option.toLocaleLowerCase(),
    }));

    return options;
};

exports.getCategory = function (option) {
    const titles = ['Vehicles',
        'Real Estate',
        'Electronics',
        'Furniture',
        'Other',
        
    ];

    const options = titles.map((title, index) => ({
        title: title,
        value: title.split(' ').join('-').toLocaleLowerCase(),
        selected: title == option,
    }));

    return options;
};
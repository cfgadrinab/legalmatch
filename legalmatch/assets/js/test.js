$(document).ready(function () {
          
    var timer;

    $("#input").jqxInput({ placeHolder: "Enter a Zipcode or City", height: 25, width: 200, 
        source: function (query, response) {
            var dataAdapter = new $.jqx.dataAdapter
            (
                {
                    datatype: "jsonp",
                    datafields:
                    [
                        /*{ name: 'countryName' }, 
                        { name: 'name' },
                        { name: 'population', type: 'float' },
                        { name: 'continentCode' },
                        { name: 'adminName1' }
                        { name: 'countryName' },*/ 
                        { name: 'placename' }
                    ],
                    //url: "http://api.geonames.org/searchJSON",
                    url: "http://api.geonames.org/postalCodeLookupJSON",
                    data:
                    {
                        featureClass: "P",
                        style: "full",
                        maxRows: 12,
                        username: "jqwidgets"
                    }
                },
                {
                    autoBind: true,
                    formatData: function (data) {
                        data.postalcode_startsWith = query;
                        return data;
                    },
                    loadComplete: function (data) {
                        if (data.geonames.length > 0) {
                            response($.map(data.geonames, function (item) {
                                return {
                                    //label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName,
                                    label: item.placename,
                                    value: item.placename
                                }
                            }));
                        }
                    }
                }
            );
        }
    });
});
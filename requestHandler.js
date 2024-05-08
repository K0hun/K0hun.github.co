const fs = require('fs');
const main_view = fs.readFileSync('./index.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');
const tennisMarket_view = fs.readFileSync('./tennisMarket.html', 'utf-8');
const projectLogList_view = fs.readFileSync('./projectLogList.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response) {
    console.log('main');

    mariadb.query('SELECT * FROM product;', function (err, rows) {
        console.log(rows);
    });

    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write(main_view);
    response.end();
}

function tennis(response) {
    fs.readFile('./img/tennisMarket.jpg', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(data);
        response.end();
    })
}

function tennisMarket(response){
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write(tennisMarket_view);
    response.end();
}

function redRacket(response) {
    fs.readFile('./img/redRacket.png', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(data);
        response.end();
    })
}

function blueRacket(response) {
    fs.readFile('./img/blueRacket.png', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(data);
        response.end();
    })
}

function blackRacket(response) {
    fs.readFile('./img/blackRacket.png', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(data);
        response.end();
    })
}

function order(response, productId) {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", '" + new Date().toLocaleDateString() + "');", function (err, rows) {
        console.log(rows);
    });

    response.write('order page');
    response.end();
}

function orderlist(response) {
    console.log('orderlist');

    response.writeHead(200, { 'Content-Type': 'text/html' });

    mariadb.query("SELECT * FROM orderlist;", function (err, rows) {
        response.write(orderlist_view);;

        rows.forEach(element => {
            response.write("<tr>"
                + "<td>" + element.product_id + "</td>"
                + "<td>" + element.order_date + "</td>"
                + "</tr>");
        });

        response.write("</table>")
        response.end();
    })
}

function projectLoglist(response){
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(projectLogList_view);
    response.end();
}

function proejctImg(response){
    fs.readFile('./img/projectLog.jpg', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(data);
        response.end();
    })
}

let handle = {};
handle['/'] = main;
handle['/tennisMarket'] = tennisMarket;
handle['/tennisMarket/order'] = order;
handle['/tennisMarket/orderlist'] = orderlist;
handle['/projectLogList'] = projectLoglist;


handle['/img/tennisMarket.jpg'] = tennis;
handle['/img/projectLog.jpg'] = proejctImg;
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;
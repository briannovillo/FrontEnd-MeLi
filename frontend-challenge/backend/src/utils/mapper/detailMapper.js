const mapCategories = require("./categoriesMapper").mapCategories;
const mapPrice = require("./priceMapper").mapPrice;
const DetailModel = require("../../model/DetailModel").DetailModel;
const ItemModel = require("../../model/ItemModel").ItemModel;

const jsonConfig = require('../../../resources/config.json');

//Función que devuelve la respuesta a devolver al front
async function mapDetail(item, description, res) {
    return new DetailModel(
        jsonConfig.author,
        await mapDetailItem(item, description, res)).toJson()
}

//Función que devuelve el objeto item que se necesita en la respuesta
async function mapDetailItem(item, description, res) {
    let freeShipping = item.shipping ? item.shipping.free_shipping : false;

    //Se usa la primera imágen que viene en el servicio. Si no viene ninguna se muestra el thumbnail
    let picture = (item.pictures && item.pictures.length > 0) ? item.pictures[0].secure_url : item.secure_thumbnail;

    //Aclaración: se agrega categories a la respuesta para poder armar el breadcrumb del ítem en la página de detail
    return new ItemModel(item.id, item.title, await mapPrice(item.price, item.currency_id, res), picture, item.condition, freeShipping,
        null, item.sold_quantity, await mapCategories(item.category_id), description.plain_text).toJson();

}

module.exports = {
  mapDetail,
  mapDetailItem
};
const mapCategories = require("./categoriesMapper").mapCategories;
const mapPrice = require("./priceMapper").mapPrice;
const DetailModel = require("../../model/DetailModel").DetailModel;
const ItemModel = require("../../model/ItemModel").ItemModel;

async function mapDetail(item, description, res, next) {
    return new DetailModel(
        {name: "Franco", lastname: "Mazzoni"},
        await mapDetailItem(item, description, res, next)).toJson()
}

async function mapDetailItem(item, description, res, next) {
    let freeShipping = item.shipping ? item.shipping.free_shipping : false;
    //Aclaración: se agrega categories a la respuesta para poder armar el breadcrumb del ítem en la página de detail
    return new ItemModel(item.id, item.title, await mapPrice(item.price, item.currency_id, res, next), item.thumbnail, item.condition, freeShipping,
        null, item.sold_quantity, await mapCategories(item.category_id), description.plain_text).toJson();

}

module.exports = {
  mapDetail,
  mapDetailItem
};
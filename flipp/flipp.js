
function Search(){
  .get((req, res) =>{
    //connects to db
    client = await dbClient.connect(url);
    const db = client.db(dbName);
    const flyerCol = await db.collection('Flyers');
    const productCol = await db.collection('Product');
    //querys db
    var itemList;
    itemList.Append(await flyerCol.findAll({ req.body }));
    itemList.Append(await productCol.findAll({ req.body }));
    //finds and returns item
    return itemList;
  });
}

function signIn(google,fb){
  var userInfo: {
    userId,
    userName,
    userEmail,
    userPicture
  }
  //third party signIn
  if (google){
    userInfo = signInGoogle();
  }
  else {
    userInfo = signInFB();
  }
  //return
  return userInfo;
}

function shoppingList(){
  redirect('https://flipp.com/shopping_list');
}


function storesInCity (userPostalCode) {
  var city = getCity(userPostalCode);
  //connect to database
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const storeCol = await db.collection('Store');
  //query db
  var storesInCity = await (storeCol.findAll(city)).id;
  return storesInCity;
}

function getCity(postalCode){
  return city.postalCode;
}


function getUserInfo(userInfo){
  //connect to database
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const userCol = await db.collection('User');
  //query database
  var user = await userCol.findOne(userInfo.userEmail);
  if (user == null){
    user = await user.insertOne(userInfo)
  }
  return user;
}

function couponCount (userPostalCode) {
  var storeIds = storesInCity(userPostalCode);
  //connect to database
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const couponCol = await db.collection('Coupons');
  var coupons = await couponCol.findAll(storeIds);
  //return
  return coupons.size;
}

function couponCountCategory(userPostalCode, category){
  var storeIds = storesInCity(userPostalCode);
  var categoryId = joinCol(category);
  var ids = getJoinType('Coupon', categoryId);
  //connect to database
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const couponCol = await db.collection('Coupons');
  //query db
  var couponsCategory = await couponCol.findAll(ids, storeIds);
  //return
  return couponsCategory.size;
}

function coupon (userPostalCode) {
  var storeIds = storesInCity(userPostalCode);
  //connect to database
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const couponCol = await db.collection('Coupons');
  var coupons = await couponCol.findAll(storeIds);
  //return
  return coupons;
}

function couponCategory(userPostalCode, category){
  var storeIds = storesInCity(userPostalCode);
  var categoryId = joinCol(category);
  var ids = getJoinType('Coupon', categoryId);
  //connect to database
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const couponCol = await db.collection('Coupons');
  //query db
  var couponsCategory = await couponCol.findAll(ids, storeIds);
  //return
  return couponsCategory;
}

function flyerCount (userPostalCode) {
  var storeIds = storesInCity(userPostalCode);
  //connect to db
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const flyerCol = await db.collection('Flyer');
  //query db
  var flyers = await flyerCol.findAll(storeIds);
  return flyers.size;
}

function flyerCountCategory (userPostalCode, category) {
  var storeIds = storesInCity(userPostalCode);
  var categoryId = joinCol(category);
  var ids = getJoinType('Flyer', categoryId);
  //connect to db
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const flyerCol = await db.collection('Flyer');
  //query db
  var categoryFlyers = await flyerCol.findAll(ids, storeIds);
  return categoryFlyers.size;
}

function getCity(postalCode){
  return city.postalCode;
}

userDB:
{
  _id: user id,
  name: user name,
  email: user email,
  picture: user picture,
  clppings: [user clipping 1 id, user clipping 2 id, ...],
  item: [user saved item 1, user saved item 2, ...]
}



function flyer (selectedTab, userPostalCode, user){
  var storeIds = storesInCity(userPostalCode);
  //connect to db
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const flyerCol = await db.collection('Flyers');

  flyerRouter.route('/flyer')
    .get((req, res) => {
      if(selectedTab == 'Featured'){
        var flyers = await flyerCol.findAll(storeIds, featured = true);
      }
      else if(selectedTab == 'Latest'){
        var flyers = await flyerCol.findAll(storeIds);
        flyers.sort(byDate);
      }
      else{
        var flyers = await flyerCol.findAll(storeIds);
        flyers.sort(byName);
      }
      return flyers;
    });
  const favouritedCol = await db.collection('Favourited');
  flyerRouter.route('/favorites')
    .get((req, res) => {
      var flyers = await favouritedCol.findAll(user.id);
      return flyers
    });
}

function flyerCategory (selectedTab, userPostalCode, user, category){
  var storeIds = storesInCity(userPostalCode);
  var categoryId = joinCol(category);
  var ids = getJoinType('Flyer', categoryId);
  //connect to db
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const flyerCol = await db.collection('Flyers');

  flyerRouter.route('/flyer')
    .get((req, res) => {
      if(selectedTab == 'Featured'){
        var flyersCategory = await flyerCol.findAll(ids, storeIds, featured = true);
      }
      else if(selectedTab == 'Latest'){
        var flyersCategory = await flyerCol.findAll(ids, storeIds);
        flyersCategory.sort(byDate);
      }
      else{
        var flyersCategory = await flyerCol.findAll(ids, storeIds);
        flyersCategory.sort(byName);
      }
      return flyers;
    });
}

function calcLocation(location, radius){
  //return a list of postal codes
  //in the users radius
  return locations;
}


function coupons(location, radius){
  locations = calcLocation(location, radius);
  //connect to db
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const couponDB = await db.collection('couponDB');
  flyerRouter.route('/coupons')
    .get((req, res) => {
      var coupons = await couponDB.findAll(locations);
    });
    return coupons;
  }




function storeProducts(flyer){
  //connect to db
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const productCol = await db.collection('Product');
  storeRouter.route(flyer.flippUrl)
    .get((req, res) => {
      //get all
      var products = await productCol.findAll(flyer.id);
      return products;
    });
}

function product(product){
  //connect to db
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const productCol = await db.collection('Product');
  itemRouter.route(product.flippUrl)
    .get((req, res) =>{
      //get all
      var product = await productCol.findOne(product.id);
      return product;
    });
}


Clipping:
{
  id: clipping id,
  productId: product id,
  userId: user id
}

function buyItem(product){
  redirect(product.url);
}

function clipItem(product, user){
  //connect to db
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const clipingCol = await db.collection('Clipping');
  //add item
  await clipingCol.insertOne(product.id, user.id);
}

function unclipItem(product, user){
  //connect to db
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const clipingCol = await db.collection('Clipping');
  //remove one
  clipingCol.deleteOne(product.id, user.id);
}



function getItems(user){
  //connect to db
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const itemCol = await db.collection('Item');
  //query
  var items = await itemCol.findAll(user.id);
  return items;
}

function getClippings(user){
  //connect to db
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const clippingCol = await db.collection('Clipping');
  //query
  var clippings = await clippingCol.findAll(user.id);
  return clippings;
}

Item:
{
  _id:item id,
  userId: users id,
  searchTerm:term searched,
  type: comes from Keyword
}

Keyword:
{
  _id: keyword id,
  type: type of item,
  keyword: keyword to search type
}




function addItem(user, item){
  //connect to db
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const itemCol = await db.collection('Item');
  const keywordCol = await db.collection('Keyword');
  //query db
  var keyword = await keywordCol.findOne(item);
  await itemCol.insertOne(user.id, term, keyword.type);
}

function colaborate(user){
  return colaborateUrl(user);
}

function print(){
  //call a microservice that creates a PDF
}

function deleteItem(user, item){
  //connect to db
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const itemCol = await db.collection('Item');
  itemRouter.route('/')
    .delete((req, res) =>{
      //delete item
      itemCol.deleteOne(item.id, user.id);
    });
}




function deals(keyword, location){
  var storeIds = storesInCity(userPostalCode);
  var keywordId = joinCol(keyword);
  var ids = getJoinType('Product', keywordId);
  //connect to db
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const productCol = await db.collection('Product');
  //const typeCol = await db.collection('Keyword');
  //get the deals
  //var type = await typeCol.findOne(keyword);
  var deals = await productCol.findAll(ids, storeIds);
  return deals;
}

function countDeals(keyword, location){
  deals(keyword, location);
  return deals.size;
}
function showDeals(keyword, location){
  deals(keyword, location);
  return deals;
}

function deal(product){
  redirect (product.flippUrl);
}



function couponCategory(userPostalCode, category){
  var storeIds = storesInCity(userPostalCode);
  var categoryId = joinCol(category);
  var ids = getJoinType('Coupon', categoryId);
  //connect to database
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const couponCol = await db.collection('Coupons');
  //query db
  var couponsCategory = await couponCol.findAll(ids, storeIds);
  //return
  return couponsCategory;
}

function getLoyaltyCard (user) {
  //connect to database
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const loyaltyCardCol = await db.collection('LoyaltyCard');
  //query db
  var allLoyaltyCard = await loyaltyCardCol.findAll(user.id);
  var loyaltyCard = expiredCard(allLoyaltyCard);
  return loyaltyCard;
}

function addLoyaltyCard (user, loyaltyCard) {
  //connect to database
  client = await dbClient.connect(url);
  const db = client.db(dbName);
  const loyaltyCardCol = await db.collection('LoyaltyCard');
  //add to table
  await loyaltyCardCol.insertOne(user.id, loyaltyCard);
}

function deleteLoyaltyCard (user, loyaltyCard) {
  //connect to db (same as above)
  //delete
  await loyaltyCardCol.deleteOne(user.id, loyaltyCard);
}
















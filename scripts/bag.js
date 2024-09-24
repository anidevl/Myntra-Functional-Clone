let bagItemsObjects = [];
const CONVENIENCE_FEES = 99;

onLoad();
function onLoad(){
    itemsToadd(); // insert all items that should be in add to cart section from bagItems array to bagItemsObjects array 
    // console.log(bagItemsObjects);
    displayBagItems();
    displayBagDetails();
    // removeItem();
}
function removeItem(itemId){
  bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  // console.log(bagItems);
  itemsToadd();
  displayBagItems();
  displayBagDetails();
  displayBagIcon();
}
function displayBagDetails(){
    let bagDetails = document.querySelector(".bag-summary");
    let innerHtml = ``;
    let totalMRP =  0, totalDiscount=0, totalAmount=0;
    for(let i=0 ;i<bagItemsObjects.length;i++){
        totalMRP+=bagItemsObjects[i].original_price;
        totalDiscount+=bagItemsObjects[i].original_price - bagItemsObjects[i].current_price;

    }
    totalAmount = (totalMRP - totalDiscount) + CONVENIENCE_FEES;
    innerHtml = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${bagItemsObjects.length} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹${CONVENIENCE_FEES}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹${totalAmount}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
          bagDetails.innerHTML = innerHtml;
}

function itemsToadd(){
    bagItemsObjects = bagItems.map((item)=>{
        for(let i = 0 ; i<items.length;i++){
             if(item==items[i].id){
                return items[i];
           }
        }
    });
}
function displayBagItems(){
    let bagContainer = document.querySelector(".bag-items-container");
    let innerHtml = ``;
    for(let i =0 ; i<bagItemsObjects.length;i++ ){
        innerHtml+= generateBagItemsElement(bagItemsObjects[i]);
    }
   
    bagContainer.innerHTML=innerHtml;
    
}
function generateBagItemsElement(item){
    return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">₹${item.current_price}</span>
                <span class="original-price">₹${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick = "removeItem(${item.id});">X</div>
          </div>`;
}
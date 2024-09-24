let bagItems = JSON.parse(localStorage.getItem('bagItems')) || [] ;
// localStorage.clear();
onLoad();  // Industry standard practice to create onLoad function which contains all those functions which are compulsory to call whenever i open my page
function onLoad(){
  displayItemsOnHomePage();
  displayBagIcon();
}
function addToBag(itemId){
    bagItems.push(itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    displayBagIcon();
}
function displayBagIcon(){
  let bagItemCountElement = document.querySelector('.bag-item-count');
    if(bagItems.length>0){
      bagItemCountElement.style.visibility = "visible";
      bagItemCountElement.innerText = bagItems.length;
    }
    else{
      bagItemCountElement.style.visibility = "hidden";
    }
    
    
}
function displayItemsOnHomePage(){
  const itemsContainerElement = document.querySelector('.items-container');
  if(itemsContainerElement){
  let innerHtml = ``;
  items.forEach((item) => {
    innerHtml += `<div class="item-container">
                <img src="${item.image}" alt="Product" class="item-image">
                <div class="rating">
                    ${item.rating.stars} ⭐ |${item.rating.count} 

                </div>
                <div class="company-name">${item.company}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price">
                <span class="current-price">₹${item.current_price}</span>
                <span class="original-price">₹${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
             </div>
             <button class="button-add-bag" onclick="addToBag(${item.id});">Add to Bag</button>
            </div>`;
  })
  itemsContainerElement.innerHTML = innerHtml;
 }
 else{
  return;
 }
}
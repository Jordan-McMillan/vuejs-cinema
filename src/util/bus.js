
function checkFilter(category, title, checked) {
    var collection = this[category];
    if(checked) {
        collection.push(title);
    }
    else {
        let index = collection.indexOf(title);
        if(index > -1) {
            collection.splice(index);
        }
    }
    console.log(collection);
}

function setDay(day) { 
    this.day = day;
};

export {checkFilter, setDay};
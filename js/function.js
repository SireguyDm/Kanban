//Функция добавления колоны
function AddNewColumn() {
    
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    data['column'].push({id: getRandomInRange(1, 5000), title: 'Новая задача', item: []});
    localStorage.setItem("data", JSON.stringify(data));
};

//Функция удаления колоны
function RemoveColumn(column_id) {
    
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    column_id = parseInt(column_id);
    data['column'] = data['column'].filter(function(item){
        return item['id'] !== column_id;
    });
    localStorage.setItem("data", JSON.stringify(data));
};

//Функция изменения колоны
function editColumnTitle(column_id, column_text){
    
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    var column_index;
    data['column'].some(function(item, index){
        if (item['id'] == column_id){
            column_index = index;
            return item;
        }
    });

    data['column'][column_index]['title'] = column_text;
    localStorage.setItem("data", JSON.stringify(data));
};

//Функция добавления элемента колоны
function addColumnItem(column_id, column_item_id) {
    
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    var column_index;
    data['column'].some(function(item, index){
        if (item['id'] == column_id){
            column_index = index;
            return item;
        }
    });
    
    var currect_date = new Date();
    column_item_id = parseInt(column_item_id);
    
    data['column'][column_index]['item'].push({id: column_item_id, text: 'Новый пункт', data: currect_date.getDate() + '.' + currect_date.getMonth()+1 + '.' + currect_date.getFullYear(), status: 'default', user: 'all'});
    
    localStorage.setItem("data", JSON.stringify(data));
};

//Функция удаления элемента колоны
function deleteColumnItem(column_id, column_item_id) {
    
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    var column_index;
    data['column'].some(function(item, index){
        if (item['id'] == column_id){
            column_index = index;
            return item;
        }
    });
    
    column_item_id = parseInt(column_item_id);
    var item_array = data['column'][column_index]['item'];
    item_array = item_array.filter(function(item){
        return parseInt(item['id']) !== column_item_id;
    });
    
    data['column'][column_index]['item'] = item_array;
    localStorage.setItem("data", JSON.stringify(data));
};

//Функция обновления элемента колоны
function updateColumnItem(column_id, column_item_id, column_item_status, column_item_text, column_item_date, column_item_user) {
    
    var data = localStorage.getItem("data");
    data = JSON.parse(data);
    
    var column_index;
    data['column'].some(function(item, index){
        if (item['id'] == column_id){
            column_index = index;
            return item;
        }
    });
    
    var column_item_index;
    data['column'][column_index]['item'].some(function(item, index){
        if (item['id'] == column_item_id){
            column_item_index = index;
            return item;
        }
    });
    
    data['column'][column_index]['item'][column_item_index]['text'] = column_item_text;
    data['column'][column_index]['item'][column_item_index]['data'] = column_item_date;
    data['column'][column_index]['item'][column_item_index]['status'] = column_item_status;
    data['column'][column_index]['item'][column_item_index]['user'] = column_item_user;
    localStorage.setItem("data", JSON.stringify(data));
};

//Функция рандомизации числа
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

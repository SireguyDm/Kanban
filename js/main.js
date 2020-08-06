$(document).ready(function(){

    //Проверка совместимости
    if (!window.sessionStorage && window.localStorage) {
        alert('Смените браузер, локальное хранилище не поддерживается');
    }
    
    //Загрузка контента
    loadPage();
    
    //Перемещение элементов колонки
    var sortable_array;
    $('.column-list').each(function(e){
        if (!sortable_array){
            sortable_array = '#' + $(this).attr("id");;
        } else {
            sortable_array = sortable_array + ', #' + $(this).attr("id");;
        }
    });
    $(''+ sortable_array +'').sortable({
        connectWith: ''+ sortable_array +'',
        update: function(event, ui) {
            var column_id = $(this).parent('.column').attr('data-id');
            var column_items_array = [];
            
            var data = localStorage.getItem("data");
            data = JSON.parse(data);
            
            var column_index;
            data['column'].some(function(item, index){
                if (item['id'] == column_id){
                    column_index = index;
                    return item;
                }
            });
            
            $(this).children('.list').each(function(){
                let item_id = $(this).attr('data-id');
                let item_status = $(this).attr('data-status');
                let item_text = $(this).children('.list-zag').text();
                let item_date = $(this).children('.list-date').children('p').children('#list-date').text();
                let item_user = $(this).children('.list-user').children('#list-user').text();
                column_items_array.push({
                    id: item_id,
                    text: item_text,
                    data: item_date,
                    status: item_status,
                    user: item_user
                });
            });
            
            data['column'][column_index]['item'] = column_items_array;
            localStorage.setItem("data", JSON.stringify(data));
        }
    });
    
    //Перемещение колонок
    $('#sortContainer').sortable({
        update: function(event, ui) {
            var data = localStorage.getItem("data");
            data = JSON.parse(data);
            
            var columns_array = [];
            $(this).children('.column ').each(function(){
                let column_id = $(this).attr('data-id');
                columns_array.push(column_id);
            });
            
            var new_data = [];
            columns_array.forEach(function(column_val, column_index){
                data['column'].some(function(item, index){
                    if (item['id'] == column_val){
                        new_data.push(item);
                        return item;
                    }
                });
            });
            
            data['column'] = new_data;
            localStorage.setItem("data", JSON.stringify(data));
        }
    });
});

function loadPage() {
    
    if (!localStorage.getItem("data")){
        localStorage.setItem("data", JSON.stringify({ column: []}));
    } else {
        var data = localStorage.getItem("data");
        data = JSON.parse(data);
        
        if (data['column'].length > 0){
            
            data['column'].forEach(function(column){
                var items_html = '';
                column['item'].forEach(function(item){
                    if (!!item['id'] !== false){
                        items_html = items_html +
                            '<div class="list sortable ui-sortable-handle" data-id="'+ item['id'] +'" data-status="'+ item['status'] +'" style="background: '+ StatusData[item['status']] +';">'+
                                '<p class="list-zag">'+ item['text'] +'</p>'+
                                '<div class="list-date">'+
                                    '<img src="pics/stopwatch.png">'+
                                    '<p>До <span id="list-date">'+ item['data'] +'</span></p>'+
                                '</div>'+
                                '<p class="list-user">by <span id="list-user">'+ item['user'] +'</span></p>'+
                                '<button class="list-settings"></button>'+
                            '</div>'
                    }                
                });
                $('.board').append(
                    '<div class="column sortable ui-sortable-handle" data-id="'+ column['id'] +'">'+
                        '<div class="column-header">'+
                            '<p class="cl-hd-p">'+ column['title'] +'</p>'+
                            '<div class="edit">'+
                                '<button class="add"></button>'+
                                '<button class="settings"></button>'+
                            '</div>'+
                        '</div>'+
                        '<div class="column-list ui-sortable" id="'+ column['id'] +'">' + items_html + '</div>'+
                    '</div>'
                )
            });
        }
    }
};
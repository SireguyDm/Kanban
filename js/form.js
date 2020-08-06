$(document).ready(function(){
    
    //Открытие формы редактирования для элемента колоны
    $(document).on('click', '.list-settings', function(){
        var task_name = $(this).parent('.list').children('.list-zag').text();
        var task_status = $(this).parent('.list').attr('data-status');
        var task_date = $(this).parent('.list').children('.list-date').children('p').children('#list-date').text();
        var task_user = $(this).parent('.list').children('.list-user').children('#list-user').text();
        
        $('.black_backg').css('display', 'block');
        
        $(this).parent('.list').append(
            '<form id="change-task" data-formStatus="'+ task_status +'">'+
                '<div class="form-left-panel">'+
                    '<div class="list" style="background-color: '+ StatusData[task_status] +'">'+
                        '<textarea maxlength="60" class="form-zag" id="form-left-panel-text">'+ task_name +'</textarea>'+
                        '<div class="list-date">'+
                            '<img src="pics/stopwatch.png">'+
                            '<p>До <span id="form-left-panel-date">'+ task_date +'</span></p>'+
                        '</div>'+
                        '<p class="form-user">by <span id="form-left-panel-user">'+ task_user +'</span></p>'+
                    '</div>'+
                    '<button id="form-save">Сохранить</button>'+
                '</div>'+
                '<div class="form-right-panel">'+
                    '<div id="form-status" class="right-panel-btn" data-type="status">'+
                        '<img src="pics/charging-circle.png">'+
                        '<span>Изменить метку</span>'+
                    '</div>'+
                '<div id="form-user" class="right-panel-btn" data-type="user">'+
                    '<img src="pics/man-user.png">'+
                    '<span>Изменить участника</span>'+
                '</div>'+
                '<div id="form-date" class="right-panel-btn" data-type="date">'+
                    '<img src="pics/24h.png">'+
                    '<span>Изменить дату</span>'+
                '</div>'+
                '<div id="form-delete" class="right-panel-btn" data-type="delete">'+
                    '<img src="pics/rubbish-bin.png">'+
                    '<span>Удалить</span>'+
                '</div>'+
            '</form>'
        )
    });
    
    //Добавление новой задачи в колону
    $(document).on('click', '.add', function(){
        
        let div = $(this).parent('.edit').parent('.column-header').next('.column-list');
        let currect_date = new Date();
        
        var column_id = $(this).parent('.edit').parent('.column-header').parent('.column').attr('data-id');
        var column_item_id = getRandomInRange(1, 5000);
        addColumnItem(column_id, column_item_id);
        
        div.append(
            '<div class="list sortable ui-sortable-handle" data-id="'+ column_item_id +'" data-status="default">'+
                '<p class="list-zag">Новый пункт</p>'+
                '<div class="list-date">'+
                    '<img src="pics/stopwatch.png">'+
                    '<p>До <span id="list-date">'+ currect_date.getDate() + '.' + currect_date.getMonth()+1 + '.' + currect_date.getFullYear() + '</span></p>'+
                '</div>'+
                '<p class="list-user">by <span id="list-user">All</span></p>'+
                '<button class="list-settings"></button>'+
            '</div>'
        ) 
    });
    
    //Добавление новой колонки
    $(document).on('click', '.new_task', function(){
        AddNewColumn();
        location.reload();
    });
    
    //События при выборе пункта редактирования элемента (задачи) колоны
    $(document).on('click', '.right-panel-btn', function(){
        
        if (!!$('#form-button')){
            $('#form-button').remove();
        }
        
        var btn_type = $(this).attr('data-type');
        var positionY = $(this).position().top;
        var form_html = '';
        var form_zag = '';
        
        if (btn_type == 'status'){
            form_zag = 'Метки';
            form_html = 
                '<div class="form-status-block">'+
                    '<div class="color-btn" id="green-btn" data-status="green"></div>'+
                    '<div class="color-btn" id="yellow-btn" data-status="yellow"></div>'+
                    '<div class="color-btn" id="orange-btn" data-status="orange"></div>'+
                    '<div class="color-btn" id="red-btn" data-status="red"></div>'+
                    '<div class="color-btn" id="default-btn" data-status="default"></div>'+
                '</div>'
        } else if (btn_type == 'user'){
            form_zag = 'Участник';
            let user_name = $('#form-left-panel-user').text();
            form_html =
                '<div class="form-button-users">'+
                    '<img src="pics/user.png">'+
                    '<input type="text" value="'+ user_name +'" id="user-btn" maxlength="24">'+
                '</div>'
        } else if (btn_type == 'delete'){
            form_zag = 'Вы уверены?';
            form_html =
                '<div class="form-button-delete-suc">'+
                    '<div class="form-delete-btn" id="delete-success">Да</div>'+
                    '<div class="form-delete-btn" id="delete-cancel">Нет</div>'+
                '</div>'
        } else if (btn_type == 'date'){
            form_zag = 'Выберите дату';
            let date_val = $('#form-left-panel-date').text();
            form_html = 
                '<div class="form-button-data-select">'+
                    '<img src="pics/stopwatch.png">'+
                    '<input type="text" class="datepicker" value="'+ date_val +'" id="form-data-btn">'+ 
                '</div>'
        }
        $(this).parent('.form-right-panel').append(
            '<div id="form-button">'+
                '<div class="form-button-zag">'+ form_zag +'</div>'+
                form_html +
                '<button id="form-button-close"></button>'+
            '</div>'
        )
        $('#form-button').css('top', positionY + 35); 
    });
    
    //Закрытие формы редактирования
    $(document).on('click', '#form-button-close, #delete-cancel', function(){
        $('#form-button').remove();
        return false;
    });
    
    //Удаление элемента колоны
    $(document).on('click', '#delete-success', function(){
        
        var column_id = $('#change-task').parent('.list').parent('.column-list').parent('.column').attr('data-id');
        var column_item_id = $('#change-task').parent('.list').attr('data-id');
        
        deleteColumnItem(column_id, column_item_id);
        
        $('#change-task').parent('.list').remove();
        $('.black_backg').css('display', 'none');
    });
    
    //Выбор статуса (цвета) для элоемента
    $(document).on('click', '.color-btn', function(){
        var status_color = $(this).attr('data-status');
        $("#change-task").attr('data-formStatus', status_color)
        $('.form-left-panel').children('.list').css('background-color', StatusData[status_color]);
        
    });
    
    //Изменение текста элемента
    $(document).on('keyup', '#user-btn', function(){
        
        var user_name = $(this).val();
        $('#form-left-panel-user').text(user_name);
    });
    
    //Вызов виджета календаря
    $('body').on('focus',".datepicker", function(){
        $(this).datepicker({
            constrainInput: true,
            minDate: "0",
            dateFormat: "dd.mm.yy"
        });
        return false;
    });
    
    //Изменение даты
    $('body').on('change',".datepicker", function(){
        
        var date_val = $(this).val();
        $('#form-left-panel-date').text(date_val);
    });
    
    //Вызов формы редактирования колоны
    $(document).on('click', '.settings', function(){
        
        $('.black_backg').css('display', 'block');
        var column = $(this).parent('.edit').parent('.column-header').parent('.column');
        column.css('z-index', '11');
        column.append(
            '<div id="column-form-settings">'+
                '<div id="c-f-date" class="c-f-btn" data-type="name">'+
                    '<img src="pics/24h.png">'+
                    '<span>Изменить название</span>'+
                '</div>'+
                '<div id="c-f-delete" class="c-f-btn" data-type="delete">'+
                    '<img src="pics/rubbish-bin.png">'+
                    '<span>Удалить</span>'+
                '</div>'+
            '</div>'
        )
    });
    
    //События при выборе пункта формы редактирования колоны 
    $(document).on('click', '.c-f-btn', function(){
        
        var btn_type = $(this).attr('data-type');
        var positionY = $(this).position().top;
        var form_html = '';
        var form_zag = '';
        
        if (btn_type == 'name'){
            let column_text = $('#column-form-settings').parent('.column').children('.column-header').children('.cl-hd-p').text();
            form_zag = 'Введите название';
            form_html = 
                '<div class="column-btn-form-name">'+
                    '<textarea maxlength="48" id="column-user-btn">'+ column_text +'</textarea>' +
                '</div>';
            
        } else if (btn_type == 'delete'){
            form_zag = 'Вы уверены?';
            form_html =
                '<div class="column-btn-form-delete-suc">'+
                    '<div class="form-delete-btn" id="column-delete-success">Да</div>'+
                    '<div class="form-delete-btn" id="column-delete-cancel">Нет</div>'+
                '</div>';
        }
        $(this).parent('#column-form-settings').append(
            '<div id="column-btn-form">'+
                '<div class="column-btn-form-zag">'+ form_zag +'</div>'+
                form_html +
                '<button id="column-btn-form-close"></button>'+
            '</div>'
        )
        $('#column-btn-form').css('top', positionY + 35); 
    });
    
    //Закрытие формы редактирования колоны
    $(document).on('click', '#column-btn-form-close, #column-delete-cancel', function(){
        $('#column-btn-form').remove();
        return false;
    });
    
    //Изменение текста колоны
    $(document).on('keyup', '#column-user-btn', function(){
        
        var user_name = $(this).val();
        $('#column-form-settings').parent('.column').children('.column-header').children('.cl-hd-p').text(user_name);
        
    });
    $(document).on('change', '#column-user-btn', function(){
        
        var column_test = $('#column-form-settings').parent('.column').children('.column-header').children('.cl-hd-p').text();
        var column_id = $('#column-form-settings').parent('.column').attr('data-id')
        
        editColumnTitle(column_id, column_test);
    });
    
    //Удаление колоны
    $(document).on('click', '#column-delete-success', function(){
        var column_id = $('#column-form-settings').parent('.column').attr('data-id');
        $('#column-form-settings').parent('.column').remove();
        $('.black_backg').css('display', 'none');
        
        RemoveColumn(column_id);
    });
    
    //Сохранение изменений для элемента колоны
    $(document).on('click', '#form-save', function(){
        
        var column_id = $('#change-task').parent('.list').parent('.column-list').parent('.column').attr('data-id');
        var column_item_id = $('#change-task').parent('.list').attr('data-id');
        var column_item_status = $('#change-task').attr('data-formstatus');
        var column_item_text = $('#form-left-panel-text').val();
        var column_item_date = $('#form-left-panel-date').text();
        var column_item_user = $('#form-left-panel-user').text();
        
        updateColumnItem(column_id, column_item_id, column_item_status, column_item_text, column_item_date, column_item_user)
        
        $('#change-task').parent('.list').css('background', StatusData[column_item_status]);
        $('#change-task').parent('.list').attr('data-status', column_item_status);
        $('#change-task').parent('.list').children('.list-zag').text(column_item_text);
        $('#change-task').parent('.list').children('.list-date').children('p').children('#list-date').text(column_item_date);
        $('#change-task').parent('.list').children('.list-user').children('#list-user').text(column_item_user);
        
        $('#change-task').remove();
        $('.black_backg').css('display', 'none');  
    });

    //Клик вне форм редактирований
    $(document).mouseup(function (e) {
        if ($('#change-task').length > 0){
            var div = $('#change-task');
            var second_div = $('#ui-datepicker-div');
            if (!div.is(e.target) && !second_div.is(e.target) &&
                div.has(e.target).length === 0 && second_div.has(e.target).length === 0) {
                $('#change-task').remove();
                $('.black_backg').css('display', 'none');
            }
        } else {
            var div = $('#column-form-settings');
            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('#column-form-settings').parent('.column').css('z-index', 'inherit');
                $('#column-form-settings').remove();
                $('.black_backg').css('display', 'none');
            }
        }
    }); 
});
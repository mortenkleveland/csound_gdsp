
$(function() {
    $('.sortable').sortable();
    $('.handles').sortable({
        handle: 'span'
    });
    $('.connected').sortable({
        connectWith: '.connected'
    });
    $('.exclude').sortable({
        items: ':not(.disabled)'
    });
});
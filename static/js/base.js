
$(function () {

    $('.nav-toggle').click(function () {
        $('body').toggleClass('nav-open');
    });

    $('.index6 li').each(function () {
        $(this).hover(function () {
            $(this).find('.links').fadeIn();
        }, function () {
            $(this).find('.links').fadeOut();
        })
    })

    $('.aside li:nth-of-type(2)').click(function (e) {
        $("body,html").animate({ scrollTop: 0 }, 300);
    })

    $('.db-topr li:last-child').hover(function () {
        $(this).find('.ewb-dw-drop').fadeIn();
    }, function () {
        $(this).find('.ewb-dw-drop').fadeOut();
    })
    $('.navbar-soso').click(function () {
        if ($('.ip-top-search ').css('display') == 'none') {
            $('.ip-top-search ').slideDown()
        } else {
            $('.ip-top-search ').hide()
        }
    });
// ���α༭Ϊ������
if('���α༭��'==$('.ffxar2-1 em').html()) $('.ffxar2-1 em').css('display','none');    

})
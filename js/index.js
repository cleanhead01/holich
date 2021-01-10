(function($){


    var deviceSize = 1023;

    function scrollOX(status) {
        $('html').css({
            overflowY:status
        })
        var htmlWidth = $('html').width()
        return htmlWidth
    }

    var swh = scrollOX('hidden');
    var sws = scrollOX('scroll');
    var swd = swh - sws;

    if (swd > 0) {
        deviceSize = deviceSize - swd
    }




    init()

    function init() {
        var ww = $(window).width()
        if ( ww > deviceSize && !$('html').hasClass('pc') ) {
            $('html').addClass('pc').removeClass('mobile')
            $('.header_box .nav').show()
            $('.header_box .open_ham, .header_box .close_ham, .nav_mobile').hide()
        } else if ( ww <= deviceSize && !$('html').hasClass('mobile') ) {
            $('html').addClass('mobile').removeClass('pc')
            $('.header_box .open_ham').show()
            $('.header_box .nav').hide()       
        }
    }

    
    $(window).on('resize', function(){
        init()
    });


    // 마우스 휠로 구역 이동 했을 때 메뉴에 색 변경
    var sct;
    window.onmousewheel = function (e) {
        console.log("$(window).scroll(function(){")
        var sct = $(this).scrollTop();
        var art1 = $('.article1').offset().top;
        var art2 = $('.article2').offset().top;
        var art3 = $('.article3').offset().top;
        var art4 = $('.article4').offset().top;
        var art5 = $('.article5').offset().top;

        if (sct < art2) {
            $('.depth1 li').siblings().removeClass('on')
            $('.depth1 li').eq(0).addClass('on')
        } else if (sct > art1 && sct >= art2 && sct < art3) {
            $('.depth1 li').siblings().removeClass('on')
            $('.depth1 li').eq(1).addClass('on')
        } else if (sct > art2 && sct >= art3 && sct < art4) {
            $('.depth1 li').siblings().removeClass('on')
            $('.depth1 li').eq(2).addClass('on')
        } else if (sct > art3 && sct >= art4 && sct < art5) {
            $('.depth1 li').siblings().removeClass('on')
            $('.depth1 li').eq(3).addClass('on')
        } else if (sct > art4 && sct >= art5) {
            $('.depth1 li').siblings().removeClass('on')
            $('.depth1 li').eq(4).addClass('on')
        }
    }


    // 햄버거 메뉴 작동
    $('.open_ham').on('click', function(){
        $('.nav_mobile').slideDown(100)
        $(this).hide()
        $('.close_ham').show(0)
    });

    $('.close_ham').on('click', function(){
        $('.nav_mobile').slideUp(100)
        $(this).hide()
        $('.open_ham').show(0)
    });


    // 메뉴를 클릭하면 해당 구역으로 이동하면서 해당 메뉴에 불들어오기
    $('.depth1 li').on('click', function(e){
        e.preventDefault();

        var navIndex = $(this).index();
        var articleTop = $('#section > article').eq(navIndex).offset().top;
        $('html, body').animate({
            scrollTop : articleTop
        }, 500);

        $(this).addClass('on').siblings().removeClass('on')
    })


    // 메인페이지 아티클1의 touch 이미지를 누르면 contact페이지로 스르륵 이동
    $('.article1 .touch').on('click', function(){
        
        var art5 = $('.article5').offset().top;

        $('html, body').animate({
            scrollTop : art5
        }, 500);

    });


    // 미미채널 연결(불러오기)
    $('.article3 .article3_doorlock a').on('click', function(e){
        e.preventDefault();
        $('#mainContainerBox').css({
            display : 'none'
        })
        $('#subContainerBox').load('../mememi.html #container', function(){
            $('html, body').animate({
                scrollTop : '0'
            })
            $('.depth1 li').removeClass('on')
            return false;
        });

    })

    // 딜리버리채널 연결(불러오기)
    $('.article3 .article3_access a').on('click', function(e){
        e.preventDefault();
        $('#mainContainerBox').css({
            display : 'none'
        })
        $('#subContainerBox').load('../delivery.html #container', function(){
            $('html, body').animate({
                scrollTop : '0'
            })
            $('.depth1 li').removeClass('on')
            return false;
        });

    })

    // 홀리채널 연결(불러오기)
    $('.article4 .article4_chanel a').on('click', function(e){
        e.preventDefault();
        $('#mainContainerBox').css({
            display : 'none'
        })
        $('#subContainerBox').load('../holychannel.html #container', function(){
            $('html, body').animate({
                scrollTop : '0'
            })
            $('.depth1 li').removeClass('on')
            return false;
        });

    })

    // 디스펜서채널 연결(불러오기)
    $('.article4 .article4_dispenser a').on('click', function(e){
        e.preventDefault();
        $('#mainContainerBox').css({
            display : 'none'
        })

        $('#subContainerBox').load('../dispenser.html #container', function(){
            $('#mainContainerBox').css({
                display : 'none'
            })
            $('html, body').animate({
                scrollTop : '0'
            }, 800)
            $('.depth1 li').removeClass('on')
        });

        return false;

    });

    





    // 폼태그 안에 라벨을 누르면 파일타입 인풋으로 체인지
    $('.file_button #file').on('change', function(){
        
        if (window.FileReader) {
            var fileName = $(this)[0].files[0].name;
        } else {
            var fileName = $(this).val().split('/').pop().split('\\').pop();
        }

        $('.file_input input').val(fileName);
    })



    // contact페이지 전송 누르면 정보 보내기
    $('#send_holich').on('click', function() {


        if (document.getElementById('name').value === '') {
            alert('name is empty');
            return;
        } else if (document.getElementById('mail').value === '') {
            alert('mail is empty');
            return;
        } else if (document.getElementById('text_area').value === '') {
            alert('text is empty');
            return;
        }


        var loading = '<div class="loading"><img src="images/loading.svg" alt="loading"></div>'
        var language = $('nav').find('ul').find('.pc').find('a').text();

        $.ajax({

            url: 'mail',
            type: 'post',
            data: $("#form").serialize(),
            beforeSend: function() {
                $('body').prepend(loading);
            },
            error: function(request, status, error) {
                console.log(request)
                console.log(status)
                console.log(error)

                $('.loading').fadeOut(function(){
                    $(this).remove()
                });
                if(language == 'KOR'){
                    alert('오류가 발생했습니다. 새로고침 후 다시 시도해 주세요!')
                } else {
                    alert('error!')
                }

            },
            success: function(data) {

                $('.loading').fadeOut(function(){
                    $(this).remove()
                });

                $('#form')[0].reset()

                if(language == 'KOR'){
                    alert('메일 전송에 성공했습니다.')
                } else {
                    alert(data);
                }

            }

        });


    });




})(jQuery);
function openMenu () {
  let x = document.getElementById("navbar");
  // x.style.display = 'block'
  x.style.top = '-1px'
  x.style.transition = '.3s'
}

function  closeMenu () {
  let x = document.getElementById("navbar");
  // x.style.display = 'none'
  x.style.top = '-590px'
  x.style.transition = '.3s'
}
//slideshow style interval
var autoSwap = setInterval( swap,3000);

//pause slideshow and reinstantiate on mouseout
$('.carousel, .slider').hover(
  function () {
    clearInterval(autoSwap);
}, 
  function () {
   autoSwap = setInterval( swap,3000);
});

//global variables
var items = [];
var startItem = 1;
var position = 0;
var itemCount = $('.carousel>li').length;
var leftpos = itemCount;
var resetCount = itemCount;

//swap images function
function swap(action) {
    var direction = action;

    //moving carousel backwards
    if (direction == 'counter-clockwise') {
        var leftitem = $('.left-pos').attr('id') - 1;
        if (leftitem == 0) {
            leftitem = itemCount;
        }

        $('.main-pos').removeClass('main-pos').addClass('right-pos');
        $('.left-pos').removeClass('left-pos').addClass('main-pos');
        $('#' + leftitem + '').removeClass('right-pos').addClass('left-pos');

        startItem--;
        if (startItem < 1) {
            startItem = itemCount;
        }
    }

    //moving carousel forward
    if (direction == 'clockwise' || direction == '' || direction == null) {
        function pos(positionvalue) {
            if (positionvalue != 'leftposition') {
                //increment image list id
                position++;

                //if final result is greater than image count, reset position.
                if ((startItem + position) > resetCount) {
                    position = 1 - startItem;
                }
            }

            //setting the left positioned item
            if (positionvalue == 'leftposition') {
                //left positioned image should always be one left than main positioned image.
                position = startItem - 1;

                //reset last image in list to left position if first image is in main position
                if (position < 1) {
                    position = itemCount;
                }
            }

            return position;
        }
        $('#' + startItem + '').removeClass('main-pos').addClass('left-pos');
        $('#' + (startItem + pos()) + '').removeClass('right-pos').addClass('main-pos');
        $('#' + (startItem + pos()) + '').removeClass('left-pos').addClass('right-pos');


        startItem++;
        position = 0;
        if (startItem > itemCount) {
            startItem = 1;
        }
    }
}

//if any visible items are clicked
$('.items').click(function () {
    if ($(this).hasClass('left-pos')) {
        swap('counter-clockwise');
    }
    if ($(this).hasClass('right-pos')) {
        swap('clockwise');
    }
    // REMOVE ACTIVE
    let IdBtnClcik = $(this).attr('id');
    $('.btn_click').each(function () {
        $(this).removeClass('active');
        console.log();
        if($(this).attr('class').indexOf(IdBtnClcik) !== -1){
            $(this).addClass('active');
        }
    })

});

//if any visible items are clicked
$('.btn_click').click(function () {
    let btnClick = $(this).attr('class').split(' ')[1];
    
    $('.btn_click').each(function () {
        if ($(this).attr('onClick') == undefined) {
            $(this).removeClass('active')
        }
    })
    $(this).addClass('active')
    if ($(this).attr('class').split(' ')[1] == '1') {
        swap('counter-clockwise');
    } else {
        swap('clockwise');
    }
});

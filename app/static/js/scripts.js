
$(document).on('change', '#browsebutton :file', function() {
    var input = $(this);
    getFileName(input);
});

function getFileName(input){
    numFiles = input.get(0).files ? input.get(0).files.length : 1;
    filename = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, filename]);
}

$(document).ready( function() {    
    $('#cropForm').submit(($e) => {
        console.log('submitted');
        $e.preventDefault();
        cropImage();
        var overlay = $("#overlay-container");
        cleanPopup(overlay);
        refreshPopup(overlay);
        });
    
    $('#browsebutton :file').on('fileselect', function(event, numFiles, filename) {
        /* Setting the path truncated file name into "test_input" text box */
        var input = $(this).parents('.input-group.active').find('.text'),
        fileName = numFiles > 1 ? numFiles + ' files selected' : filename;
        console.log("Getting filename 1");
        console.log(fileName);
        if( input.length ) {
            } else {
                if( fileName ) {
                    console.log("Getting filename 2");
                    console.log(fileName);
                    document.getElementById("image_name").value = fileName;
                }
        }
        $(".popup-overlay").addClass("active");
        var reader = new FileReader();
        var jcrop_api;
        reader.onload = function () {
            console.log('loaded the reader');
            var dataURL = reader.result;
            var output = document.getElementById('output_image');
            console.log("output 1");
            console.log(output.width);
            var imageSrc = document.getElementById('imageSrc');
            output.src = dataURL;
            console.log("output 2");
            console.log(output.width);             
            imageSrc.src = dataURL;
            $('#imageSrc').val(dataURL);
                
            $('#output_image').Jcrop({
                aspectRatio: 4/5,
                onChange:   showCoords,
                onSelect:   showCoords,
                onRelease:  clearCoords
            },function(){jcrop_api = this;}
            );
            
            $('#coords').on('change','input',function(){                
                var x1 = $('#outX1').val(),
                    x2 = $('#outX2').val(),
                    y1 = $('#outY1').val(),
                    y2 = $('#outY2').val();
                jcrop_api.setSelect([x1,y1,x2,y2]);
            });
            
            function showCoords(c){                
                $('#outX1').val(c.x);                
                $('#outY1').val(c.y);
                $('#outX2').val(c.x2);
                $('#outY2').val(c.y2);
                $('#outW').val(c.w);
                $('#outH').val(c.h);
                
                $('#inX1').val(c.x);
                $('#inX2').val(c.x2);
                $('#inY1').val(c.y);
                $('#inY2').val(c.y2);
                $('#inW').val(c.w);
                $('#inH').val(c.h);
            }
            
            function clearCoords(){
                $('#coords input').val('');
            }
        };
        reader.readAsDataURL($(this)[0].files[0]);
    });
    
    $("#cropbtn").on("click", function() {
        cropImage();
        var overlay = $("#overlay-container");
        cleanPopup(overlay);
        refreshPopup(overlay);
    });
    
    /* Functions */    
    function cropImage(){
        console.log('Cropped');
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var imageSrc = document.getElementById('imageSrc');
        console.log(imageSrc);
        var dX1 = document.getElementById("outX1").value;
        var dY1 = document.getElementById("outY1").value;
        var dWidth = document.getElementById("outW").value;
        var dHeight = document.getElementById("outH").value;
        var hRatio = canvas.width / dWidth;
        var vRatio = canvas.height / dHeight;
        var ratio  = Math.min ( hRatio, vRatio );
        context.drawImage(imageSrc, dX1, dY1, dWidth, dHeight, 0, 0, dWidth*ratio, dHeight*ratio);
    }
    
    function cleanPopup(overlay){
        $(".popup-overlay").removeClass("active");        
        overlay.empty();
    }
    
    function refreshPopup(overlay){
        overlay.append('<div><input class="btn btn-primary" id="cropbtn" name="crop" type="submit" value="Click to Crop!"></div>');
        overlay.append('<div id="image-holder"> <img id="output_image"/></div>');
    }
    
});





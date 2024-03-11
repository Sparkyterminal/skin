$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.image-upload').hide();
                var img = document.createElement("img");
                img.src = e.target.result;
                img.alt = "Uploaded Skin Image";
                $('.title-div').empty().append(img);
                img.setAttribute("height", "250px");
                $('.title-div').hide();
                $('.title-div').fadeIn(650);
                // $('form').remove();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        document.querySelector(".title-div").style.padding = 0;
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();
        let resElem = document.createElement("span");
        resElem.classList.add("diagnosis");

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                let spanElem = document.createElement("span");
                spanElem.textContent = "Diagnosis: ";
                spanElem.classList.add("diagnosis");
                let str = data;
                var words = str.split(" ");
                for (var i = 1; i < words.length; i++) {
                    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
                }
                str = words.join(" ");
                resElem.textContent = str;
                resElem.style.textAlign = "center";
                resElem.style.color = "#5f4895";
                $('form').remove();
                // $('.title-div').append(resElem);
                let retryBtn = document.createElement("a");
                retryBtn.setAttribute("href", "/");
                retryBtn.innerHTML = "UPLOAD AGAIN";
                retryBtn.classList.add("upload-again");
                let allResults = document.querySelector(".all-results");
                allResults.appendChild(spanElem);
                allResults.appendChild(resElem);
                allResults.insertAdjacentElement("afterend", retryBtn);
                console.log('Success!');
            },
        });
    });
});

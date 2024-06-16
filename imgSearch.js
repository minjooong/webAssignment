$(document).ready(function () {
    $("#imageSearchButton").click(function () {
        var formData = new FormData();
        var fileInput = $("#imageUpload")[0];
        if (fileInput.files.length === 0) {
            alert("이미지를 업로드해주세요.");
            return;
        }
        formData.append("file", fileInput.files[0]);

        $.ajax({
	    url: "http://52.79.155.26:9999/predict",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                $("#results").html("<h2>예측 결과: " + data.prediction + "</h2>");
            },
            error: function (xhr, status, error) {
        	console.error("AJAX 오류 발생:", status, error);
        	alert("AJAX 오류 발생: " + status);},
        });
    });
});

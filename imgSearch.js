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
                var prediction = data.prediction;
                $("#results").html("<h2>예측 결과: " + prediction + "</h2>");
                showPageLink(prediction);
            },
            error: function (xhr, status, error) {
                console.error("AJAX 오류 발생:", status, error);
                alert("AJAX 오류 발생: " + status);
            },
        });
    });

    const pages = [
        { url: "bread.html", title: "빵" },
        { url: "burger.html", title: "햄버거" },
        { url: "porkCutlet.html", title: "돈카츠" },
        { url: "pizza.html", title: "화덕피자" },
        { url: "gukbap.html", title: "순대국밥" },
    ];

    function showPageLink(prediction) {
        var page = pages.find((page) => page.title.includes(prediction));
        if (page) {
            $("#results").append("<p><a href='" + page.url + "'>" + page.title + "</a></p>");
        } else {
            $("#results").append("<p>해당 예측 결과에 대한 페이지가 없습니다.</p>");
        }
    }
});
